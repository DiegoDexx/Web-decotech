import React, { useState } from "react";
import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";

import { useVTNavigate } from "../../../hooks/useVTNavigate";
const translationsByLang = { es, en, fr, de };

// Mapea etiquetas de tag a clases de color (ajusta si necesitas otros nombres)
// Mapea etiquetas de tag a clases de color (ajusta si necesitas otros nombres)
const tagColorClass = (tag = "") => {
  const key = String(tag).toLowerCase();
  if (key.includes("presup") || key.includes("pay") || key.includes("pagos")) {
    return "bg-green-50 text-green-600";
  }
  if (key.includes("garant") || key.includes("warrant")) {
    return "bg-yellow-50 text-yellow-600";
  }
  // por defecto General
  return "bg-blue-50 text-blue-600";
};

export function FAQLayout({ lang = "es" }) {
  const t = translationsByLang[lang] || translationsByLang.es;
  const faq = t?.faq || {};
  const questions = Array.isArray(faq.questions) ? faq.questions.slice(0, 10) : [];
  const navigate = useVTNavigate();

  const alternative = faq.alternative_Cards || {};
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // fallback si no hay preguntas
  const fallback = [
    {
      q: "¿Qué áreas geográficas cubrís?",
      a: "Consulta cobertura por código postal.",
      tag: "General",
    },
  ];

  const items = questions.length ? questions : fallback;
    return (


<section className="w-full">
      <div className="container-main py-4 md:py-6">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-gray-600 mb-3 pointer border-0 bg-transparent"
          onClick={() => navigate(`/${lang}`)}
        >
          <span className="text-lg">←</span>
          <span>{t.services.backLabel || "Volver Atrás "}</span>
        </button>
      </div>
      {/* Fragmento de texto superior */}
      <div className="w-full bg-yellow-400">
        <div className="container-main py-12 text-center">
          <div className="flex justify-center">
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md -mt-7">
              <span className="text-2xl">?</span>
            </div>
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-black">
            {faq.title || "Preguntas Frecuentes"}
          </h2>

          {faq.subtitle && (
            <p className="mt-3 text-black/80 max-w-2xl mx-auto">
              {faq.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Lista de tarjetas - diseño fiel */}
      <div className="container-main py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm border border-gray-200 rounded overflow-hidden"
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                  className="w-full flex  items-center justify-between bg-white p-5 gap-2 text-left  hover:bg-gray-50 transition border-0 cursor-pointer"
                >
                  <div className="flex flex-col items-start gap-2   ">
                    {/* Tag - pequeña pastilla */}
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full mt-1 ${tagColorClass(
                        item.tag
                      )}`}
                    >
                      {item.tag || "General"}
                    </span>

                    {/* Pregunta en negrita */}
                    <span className="text-base md:text-lg font-semibold text-gray-900">
                      {item.q}
                    </span>
                  </div>

                  {/* Chevron derecho (amarillo) */}
                  <svg
                    className={`w-6 h-6 text-yellow-500 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Respuesta (oculta hasta hacer click) */}
                <div
                  className={`px-5 pb-5 transition-all duration-250 ${
                    isOpen ? "max-h-96" : "max-h-0 overflow-hidden"
                  }`}
                >
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tarjetas alternativas (si existen) — mantengo diseño simple aquí */}
      <div className="container-main py-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-black">
            ¿No encuentras tu respuesta?
          </h3>
          <p className="mt-2 text-gray-600">Nuestro equipo está aquí para ayudarte</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {alternative.call && (
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 text-center shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl shadow-md">
                  <span>{alternative.call.icon || "📞"}</span>
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-1">{alternative.call.title}</h4>
              <p className="text-sm text-blue-700 mb-4">{alternative.call.subtitle}</p>
              <a
                href={alternative.call.href || "#"}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:brightness-90 transition"
              >
                {alternative.call.button_label || "Llamar"}
              </a>
            </div>
          )}

          {alternative.email && (
            <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-8 text-center shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl shadow-md">
                  <span>{alternative.email.icon || "✉️"}</span>
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-1">{alternative.email.title}</h4>
              <p className="text-sm text-purple-700 mb-4">{alternative.email.subtitle}</p>
              <a
                href={alternative.email.href || "#"}
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:brightness-95 transition"
              >
                {alternative.email.button_label || "Escribir"}
              </a>
            </div>
          )}

          {alternative.whatsapp && (
            <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-8 text-center shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl shadow-md">
                  <span>{alternative.whatsapp.icon || "💬"}</span>
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-1">{alternative.whatsapp.title}</h4>
              <p className="text-sm text-green-700 mb-4">{alternative.whatsapp.subtitle}</p>
              <a
                href={alternative.whatsapp.href || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:brightness-95 transition"
              >
                {alternative.whatsapp.button_label || "Chatear"}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
    );
}