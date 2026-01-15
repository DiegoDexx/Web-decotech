import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import ContactForm from "../ui/form";
import GoogleMapCard from "../ui/googleMaps";

const translationsByLang = { es, en, fr, de };

export default function Contact() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;

  const formText = t.contact;
  const whatsapp_text= formText?.whatsApp_text || "¡Consúltanos por mensaje directo!";

  // 🔁 Pega aquí tu URL de Google Maps Embed
  // Cómo obtenerla: Google Maps -> Compartir -> Insertar un mapa -> Copiar HTML -> extraer el src=""
  const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50309.96221378969!2d-1.1806670985247998!3d37.991767809159285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6381f8d5928c7f%3A0xd627129b38c4ab9a!2sMurcia!5e0!3m2!1ses!2ses!4v1768473232730!5m2!1ses!2ses"; // <-- reemplaza por la tuya

  // WhatsApp (cambia a tu número, formato internacional sin +)
  const WHATSAPP_NUMBER = "34600000000";
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, me gustaría solicitar un presupuesto."
  )}`;

  return (
<section className="w-full bg-gray-100 py-12" id="contact-section">
  <div className="container-main">
    <h2 className="text-2xl md:text-4xl font-semibold text-center text-black mb-6">
      {formText.contact_title}
    </h2>

    <p className="mt-3 text-center text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
      {formText.contact_description}
    </p>

    {/* Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-10 w-full">
      
      {/* IZQUIERDA: FORM */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md w-full">
        <ContactForm id="contact-form" />
      </div>

      {/* DERECHA: MAP + WHATSAPP */}
      <div className="flex flex-col gap-6 w-full">
        
        {/* MAPA full width */}
        <div className="w-full">
          <GoogleMapCard embedUrl={MAP_EMBED_URL} title="Ubicación" />
        </div>

        {/* WHATSAPP full width */}
        <div className="rounded-2xl bg-green-500 p-6 md:p-8 shadow-md text-white w-full">
          <h3 className="text-lg md:text-xl font-semibold">
            {whatsapp_text.whatsapp_title || "¡Consúltanos por mensaje directo!"}
          </h3>

          <p className="mt-2 text-sm md:text-base text-white/90">
            {formText?.whatsapp_description ||
              "Solicita nuestros servicios a través de WhatsApp"}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex no-underline items-center gap-2 mt-5 bg-white text-black font-medium px-5 py-2 rounded-lg hover:brightness-95 transition"
          >
            <span className="text-lg"><FaWhatsapp /></span>
            <span>{formText?.whatsapp_button || "Iniciar conversación"}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
