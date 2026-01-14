import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const locales = { es, en, fr, de };

const AutoSlider = ({ interval = 20000 }) => {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const slider = locales[lang].slider;

  const slides = [slider.slide_1, slider.slide_2, slider.slide_3, slider.slide_4, slider.slide_5, slider.slide_6, slider.slide_7, slider.slide_8, slider.slide_9, slider.slide_10].filter(Boolean);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div
      className="
        relative w-full 
        h-[75vh] md:h-[90vh] lg:h-[90vh]
        overflow-hidden
      "
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`
            absolute inset-0 transition-opacity duration-700 ease-in-out
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
        >
          {/* Fondo */}
          <img
            src={`/slider/${i + 1}.webp`}
            className="w-full h-full object-cover"
            alt=""
            loading="lazy"
          />

          {/* Overlay un poco más oscuro para mejor contraste */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Contenido: móvil centrado, resto a la izquierda dentro del container */}
          <div
            className="
              absolute inset-0
              flex flex-col justify-center
              text-white
            "
          >
            <div
              className="
                container-main
                flex flex-col
                items-center sm:items-start
                text-center sm:text-left
              "
            >
              <div className="max-w-xs sm:max-w-xl md:max-w-2xl">
                <h1
                  className="
                    font-extrabold leading-snug md:leading-tight drop-shadow
                     xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
                  "
                >
                  {slide.title}
                </h1>

                <p
                  className="
                    mt-4 md:mt-5
                    font-normal
                    text-[11px] sm:text-xs md:text-sm lg:text-base
                    leading-relaxed
                  "
                >
                  {slide.description}
                </p>

                <div
                  className="
                    mt-6 md:mt-7
                    flex flex-col sm:flex-row gap-4 sm:gap-5
                    justify-center sm:justify-start
                  "
                >
                  <button
                    className="
                      bg-brand text-black font-medium
                      px-5 sm:px-6 py-3
                      text-xs sm:text-sm md:text-base
                      rounded-lg border-0 cursor-pointer
                      shadow-md
                      transition
                      hover:shadow-lg hover:scale-[1.02]
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                    "
                    onClick ={() => { document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" }); } }
                  >
                    {slider.button}
                  </button>

                  <button
                    className="
                      bg-transparent text-white border border-white
                      px-5 sm:px-6 py-3
                      text-xs sm:text-sm md:text-base
                      rounded-lg
                      transition
                      hover:bg-white/10 hover:shadow-lg hover:scale-[1.02]
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                    "
                    onClick ={() => { document.getElementById("gallery-grid").scrollIntoView({ behavior: "smooth" }); } }
                  >
                    {slider.button_2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Flechas centradas en la parte baja, con mejor zona táctil */}
      <div
        className="
          absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2
          flex items-center gap-7
        "
      >
        <button
          onClick={prev}
          className="
            bg-black/60 text-white
            p-3 sm:p-4
            rounded-full
            transition
            hover:bg-black/80 hover:scale-[1.05]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
          "
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={next}
          className="
            bg-black/60 text-white
            p-3 sm:p-4
            rounded-full
            transition
            hover:bg-black/80 hover:scale-[1.05]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
          "
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AutoSlider;
