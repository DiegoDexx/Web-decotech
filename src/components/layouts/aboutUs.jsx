import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

import logoAmarillo from "../../../public/logos/LogoDECOTECH_amarillo.jpeg";

const translationsByLang = { es, en, fr, de };

export default function AboutUs() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;

  const about = t.about;

  const bulletsArray = Object.values(about.bullets);

  return (
    <section className="w-full bg-white py-14 md:py-20" id="about-us">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* TEXTO */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              {about.title}
            </h2>

            <p className="mt-6 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
              {about.description}
            </p>

            {/* BULLETS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bulletsArray.map((bullet, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-brand w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-4">
                    <span className="text-black font-bold text-sm leading-none">✓</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-700">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* LOGO */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[560px] bg-brand rounded-2xl shadow-xl p-6 md:p-10">
              <div className="bg-white/15 rounded-xl p-6 md:p-8 flex items-center justify-center">
                <img
                  src={logoAmarillo}
                  alt="Decotech Reformas Integrales"
                  className="w-full max-w-[420px] h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
