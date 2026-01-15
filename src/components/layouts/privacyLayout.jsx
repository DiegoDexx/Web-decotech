import React from "react";
import { useLocation } from "react-router-dom";
import { useVTNavigate } from "../../hooks/useVTNavigate";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

function interpolate(str, vars) {
  if (typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => (vars[key] ?? `{${key}}`));
}

export default function PrivacyLayout() {
  const navigate = useVTNavigate();
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;

  const privacy = t.privacy;

  // ✅ Config del sitio (pon tus datos)
  const SITE = {
    companyName: "REFORMAS INTEGRALES SL",
    email: "",
  };

  return (
    <div className="w-full bg-white">
      {/* Top bar */}
      <div className="w-full bg-white border-b border-black/10">
        <div className="container-main py-3">
          <button
          type="button"
          className="flex items-center gap-2 text-sm text-gray-600 mb-3 pointer border-0 bg-transparent"
          onClick={() => navigate(`/${lang}`)}
        >
          <span className="text-lg">←</span>
          <span>{t.backLabel || "Volver a servicios"}</span>
        </button>
        </div>
      </div>

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-black via-slate-900 to-slate-800 py-14 md:py-20">
        <div className="container-main text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {privacy.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/80">
            {privacy.updatedAt}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-12 md:py-16">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            {privacy.sections.map((sec, idx) => (
              <div key={idx} className="mb-10 md:mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-black">
                  {sec.h}
                </h2>

                {sec.p?.map((p, i) => (
                  <p key={i} className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
                    {interpolate(p, SITE)}
                  </p>
                ))}

                {sec.list?.length ? (
                  <ul className="mt-4 ml-5 list-disc text-sm md:text-base text-gray-700 space-y-2">
                    {sec.list.map((li, i) => (
                      <li key={i} className="leading-relaxed">
                        {interpolate(li, SITE)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
