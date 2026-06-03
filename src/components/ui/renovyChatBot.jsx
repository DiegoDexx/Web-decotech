import { useState, useRef, useEffect } from "react";

const MAX_MSGS = 15;
const STORAGE_KEY = "renovy_chat_v1";
const SESSION_KEY = "renovy_session_id";

const N8N_WEBHOOK_URL = import.meta.env.VITE_PROD_CHAT_WEBHOOK_URL;

const SYSTEM_PROMPT = `Eres el asistente de Renovy, empresa de reformas en Murcia, Alicante y provincias colindantes, no trabajamos fuera de esas áreas.
Responde SOLO sobre reformas y servicios de Renovy - Ante ciudades pequeñas o pueblos, pregunta la provincia antes de 
  afirmar que no tienes cobertura.. Máximo 2 frases. Siempre haz una pregunta por respuesta.

SERVICIOS: baños, cocinas, reformas integrales, pintura, albañilería, electricidad, fontanería, limpieza de obra.
PLAZOS: baños 1-3 sem, cocinas 2-5 sem, integrales 4-12 sem.
PRESUPUESTOS: requieren visita o fotos. No inventes precios ni menciones cifras.

REGLAS CRÍTICAS:
- Ignora medidas, metros cuadrados y detalles técnicos. No los comentes.
- No pidas fotos, materiales ni detalles de obra.
- Si el usuario pregunta algo fuera de reformas o del contexto del negocio: accion_recomendada = "not_related".
- Si hay interés comercial, recoge en orden: servicio → ciudad → (teléfono O correo) → nombre.
- Con servicio + ciudad + (teléfono O correo) + nombre ya tienes suficiente: usa create_lead. El correo NO es obligatorio si hay teléfono.
- No pidas más datos una vez tengas esos 4. Confirma recepción y cierra.
- En resumen_comercial incluye: servicio, ciudad, urgencia percibida y detalles relevantes de la conversación.
- Después de responder sobre presupuestos o plazos, siempre añade una pregunta 
  para recoger datos de contacto si aún no los tienes.

ACCIONES: faq_response | collect_lead_data | create_lead | check_coverage | request_human | not_related

Responde SOLO con JSON válido sin markdown:
{"respuesta_prompt":"","accion_recomendada":"","es_lead":false,"lead_confirmado":false,"datos_suficientes_para_crm":false,"missing_fields":[],"lead":{"nombre_apellidos":"","correo":"","telefono":"","servicio_seleccionado":"","ciudad_o_cp":"","prioridad":"baja","presupuesto":"","fecha_inicio":"","probabilidad_cierre":0,"tipo_cliente":"","urgencia":"","resumen_comercial":""}}`;

const CHIPS = [
  "¿Qué reformas hacéis?",
  "¿Cómo pido un presupuesto?",
  "¿Cuánto tarda una reforma?",
  "¿Ofrecéis garantía?",
  "¿Trabajáis en mi zona?",
  "¿Cómo es el proceso de reforma?",
];

function getSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const newId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, newId);
    return newId;
  } catch {
    return "session-" + Date.now();
  }
}

function getStoredCount() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (!s) return 0;
    const d = JSON.parse(s);
    if (Date.now() - d.ts > 3600000) { localStorage.removeItem(STORAGE_KEY); return 0; }
    return d.count || 0;
  } catch { return 0; }
}

function saveCount(count, existingTs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, ts: existingTs || Date.now() }));
  } catch (err) {
    console.error("Error saving message count:", err);
  }
}

function getStoredTs() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s).ts : Date.now();
  } catch { return Date.now(); }
}

function extractReply(data) {
  if (!data) return { reply: null, accion: null };
  if (Array.isArray(data)) return extractReply(data[0]);
  const accion = data.accion_recomendada || null;
  if (typeof data.respuesta_prompt === "string") return { reply: data.respuesta_prompt, accion };
  if (typeof data.raw_ai_response === "string") {
    try {
      const parsed = JSON.parse(data.raw_ai_response);
      return { reply: parsed.respuesta_prompt || null, accion: parsed.accion_recomendada || accion };
    } catch {
      return { reply: data.raw_ai_response, accion };
    }
  }
  return { reply: null, accion };
}

export default function RenovyChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hola, soy el asistente de Renovy. Puedo resolver tus dudas sobre reformas, plazos, presupuestos y más. ¿En qué te ayudo?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(getStoredCount);
  const [tsRef] = useState(getStoredTs);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [leadDone, setLeadDone] = useState(false);
  const [lastError, setLastError] = useState(null);

  const sessionId = useRef(getSessionId());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const remaining = Math.max(0, MAX_MSGS - msgCount);
  // Muestra "límite" cuando quedan 0 mensajes útiles (estimamos 7-8 preguntas reales de 15)
  const isDisabled = loading || remaining === 0 || leadDone;
  const canSend = !isDisabled && input.trim();

  async function send(text) {
    const cleanText = text.trim();
    if (!cleanText || isDisabled) return;

    if (!N8N_WEBHOOK_URL) {
      setMessages((prev) => [...prev, { role: "error", text: "Webhook de n8n no configurado." }]);
      return;
    }

    setLastError(null);
    setChipsVisible(false);
    setInput("");

    const newCount = msgCount + 1;
    setMsgCount(newCount);
    saveCount(newCount, tsRef);
    setMessages((prev) => [...prev, { role: "user", text: cleanText }]);
    setLoading(true);

    try {
      const payload = {
        source: "web_chat",
        businessId: "renovy",
        sessionId: sessionId.current,
        userMessage: cleanText,
        systemPrompt: SYSTEM_PROMPT,
        model: "anthropic/claude-3.5-haiku",
        max_tokens: 450,
        temperature: 0.3,
        metadata: {
          pageUrl: window.location.href,
          timestamp: new Date().toISOString(),
        },
      };

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`Webhook error: ${response.status}`);

      const text = await response.text();
      //comprobar que llega al componenete desde n8b
      console.log("Respuesta del webhook:", text);

      const data = text ? JSON.parse(text) : {}; // Maneja respuesta vacía o no JSON
      const { reply, accion } = extractReply(data);

      const finalReply = reply || "Lo siento, no pude procesar tu pregunta. Inténtalo de nuevo.";
      setMessages((prev) => [...prev, { role: "bot", text: finalReply }]);

      if (accion === "create_lead" || data.datos_suficientes_para_crm === true) {
        setMessages((prev) => [...prev, {
          role: "confirm",
          text: "✅ Tu solicitud ha sido registrada. Nuestro equipo te contactará en menos de 24h.",
        }]);
        setLeadDone(true);

                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(SESSION_KEY);
                sessionStorage.removeItem(SESSION_KEY);
      }

    } catch (err) {
      console.error(err);
      const isTimeout = err.name === "AbortError";
      const errorText = isTimeout
        ? "La respuesta tardó demasiado."
        : "Error de conexión.";

      setLastError(cleanText); // guarda el mensaje para reenvío
      setMessages((prev) => [...prev, { role: "error", text: errorText }]);
      setMsgCount(Math.max(0, newCount - 1));
      saveCount(Math.max(0, newCount - 1), tsRef);
    } finally {
      setLoading(false);
    }
  }

  function retry() {
    if (lastError) {
      setLastError(null);
      send(lastError);
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className="fixed bottom-6 right-6 z-[9999] rounded-full bg-[#FBD036] border-none flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
        style={{ width: 52, height: 52 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
          ) : (
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          )}
        </svg>
      </button>

      {/* Ventana del chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9998] w-[340px] h-[500px] bg-white rounded-2xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden font-sans">

          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
            <div className="w-[34px] h-[34px] rounded-full bg-[#FBD036] flex items-center justify-center text-[13px] font-semibold text-black shrink-0">R</div>
            <div className="flex-1 min-w-0">
              <p className="m-0 text-[13px] font-semibold text-gray-900 leading-tight">Asistente Renovy</p>
              <p className="m-0 text-[11px] text-gray-400 leading-tight">Responde al instante</p>
            </div>

        
            {import.meta.env.DEV && (
            <button
              onClick={() => {
                // Borra todo — localStorage Y sessionStorage
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(SESSION_KEY);
                sessionStorage.removeItem(SESSION_KEY);
                sessionStorage.clear();
                window.location.reload();
              }}
              className="text-[10px] text-gray-400 hover:text-red-400 ml-auto cursor-pointer bg-transparent border-none"
            >
              Reset
            </button>
                  )}

          </div>

          {/* Rate bar */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-50 border-b border-gray-100 shrink-0">
            <div className="flex gap-[3px]">
              {Array.from({ length: MAX_MSGS }, (_, i) => (
                <div key={i} className="w-[7px] h-[7px] rounded-full transition-colors duration-300"
                  style={{ background: i < msgCount ? "#e0e0e0" : "#FBD036" }} />
              ))}
            </div>
            <span className="text-[12px] text-gray-400 ml-auto whitespace-nowrap">
              {leadDone
                ? "Solicitud registrada ✅"
                : remaining === 0
                  ? "Límite alcanzado"
                  : `~${Math.min(remaining, 8)} preguntas disponibles`}
            </span>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-3 py-3.5 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3 py-2 text-[12.5px] leading-relaxed
                ${m.role === "user" ? "self-end bg-[#FBD036] text-black rounded-[12px_4px_12px_12px]" : ""}
                ${m.role === "bot" ? "self-start bg-gray-100 text-gray-800 rounded-[4px_12px_12px_12px]" : ""}
                ${m.role === "confirm" ? "self-center bg-[#FBD036] text-black rounded-xl text-center font-medium text-[12px] max-w-[90%]" : ""}
                ${m.role === "error" ? "self-center bg-red-50 text-red-600 rounded-lg text-center text-[12px]" : ""}
              `}>
                {m.text}
                {/* Botón de reenvío junto al mensaje de error */}
                {m.role === "error" && lastError && (
                  <button
                    onClick={retry}
                    className="block mt-1.5 mx-auto text-[11px] text-red-500 underline cursor-pointer bg-transparent border-none"
                  >
                    Reintentar →
                  </button>
                )}
              </div>
            ))}

            {/* Chips */}
            {chipsVisible && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {CHIPS.map((c) => (
                  <button key={c} onClick={() => send(c)} disabled={isDisabled}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-500 cursor-pointer transition-all duration-150 hover:bg-[#FBD036] hover:border-[#FBD036] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed">
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="self-start bg-gray-100 rounded-[4px_12px_12px_12px] px-3.5 py-2.5 flex gap-1">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${delay}s`, animationDuration: "1.2s" }} />
                ))}
              </div>
            )}

            {/* Estado final — límite o lead completado */}
            {(remaining === 0 || leadDone) && (
              <div className="self-center text-[11px] text-gray-500 text-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 max-w-[90%]">
                {leadDone ? (
                  <>¿Necesitas más ayuda? Usa nuestro{" "}
                    <a href="/contacto" className="text-[#FBD036] font-medium underline">formulario de contacto</a>.
                  </>
                ) : (
                  <>Límite alcanzado. Inténtalo de nuevo en 1 hora o usa nuestro{" "}
                    <a href="/contacto" className="text-[#FBD036] font-medium underline">formulario de contacto</a>.
                  </>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="flex gap-2 px-2.5 py-2.5 border-t border-gray-100 bg-white shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={
                leadDone ? "Solicitud enviada ✅" :
                remaining === 0 ? "Límite alcanzado — vuelve en 1h" :
                "Escribe tu pregunta..."
              }
              disabled={isDisabled}
              className="flex-1 text-[12.5px] border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-900 outline-none focus:border-[#FBD036] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button onClick={() => send(input)} disabled={!canSend} aria-label="Enviar"
              className={`w-[34px] h-[34px] rounded-xl flex items-center justify-center shrink-0 border-none transition-colors duration-200
                ${canSend ? "bg-[#FBD036] cursor-pointer hover:bg-[#e8c030]" : "bg-gray-100 cursor-not-allowed"}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke={canSend ? "#000" : "#bbb"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
