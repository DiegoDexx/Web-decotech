import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

import logo from "../../assets/img/renovy.png";

const translationsByLang = { es, en, fr, de };


export default function AboutUs() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;
  
  const about = t.about;
  
  const bulletsArray = Object.values(about.bullets);

  return (
    <section className="w-full bg-white py-12 md:py-18 lg:py-20" id="about-us">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* TEXTO */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-[1.9rem] lg:text-[2.1rem] font-semibold text-black leading-snug">
              {about.title}
            </h2>

            <p className="mt-4 md:mt-5 text-xs sm:text-sm md:text-[0.95rem] text-gray-600 leading-relaxed max-w-xl">
              {about.description}
            </p>

            {/* BULLETS */}
            <div className="mt-7 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {bulletsArray.map((bullet, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-brand w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1.5">
                    <span className="text-black font-bold text-xs leading-none">✓</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-[0.95rem] text-gray-700 leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* LOGO */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[520px] bg-brand rounded-2xl shadow-xl p-5 md:p-8">
              <div className="bg-white/20 rounded-xl p-5 md:p-7 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Decotech Reformas Integrales"
                  className="w-full max-w-[380px] h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

