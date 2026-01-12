import React, { useState } from "react";
import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

export default function ServiceProcess({ lang = "es" }) {
  const t = translationsByLang[lang] || translationsByLang.es;
  const process = t?.service_process;

  const [hovered, setHovered] = useState(null);

  if (!process) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24 px-4">
      <div className="container-main">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            {process.title}
          </h2>
          {process.description && (
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              {process.description}
            </p>
          )}
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start mb-10">
          {process.steps?.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center"
            >
              {/* Número circular */}
              <div className="w-16 h-16 rounded-full border-4 border-yellow-400 bg-white flex items-center justify-center shadow-md z-10">
                <span className="text-lg font-bold text-black">{step.number}</span>
              </div>

              {/* Card */}
              <article
                onMouseEnter={() => setHovered(step.id)}
                onMouseLeave={() => setHovered(null)}
                className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden mt- -mt-6" /* placeholder -mt removed below with proper spacing */
              >
                {/* Para evitar problemas con -mt en algunos linters, lo hacemos así: */}
                <div className="mt-[-24px] w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="w-full h-44 sm:h-48 overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${hovered === step.id ? "scale-105" : "scale-100"}`}
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-md md:text-lg font-semibold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-md hover:brightness-95 transition-all flex items-center gap-3"
          >
            <span>{process.cta_button}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}