import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const locales = { es, en, fr, de };

const AutoSlider = ({ interval = 10000 }) => {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const slider = locales[lang].slider;

  const slides = [slider.slide_1, slider.slide_2, slider.slide_3];

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
        h-[70vh] md:h-[75vh] lg:h-[85vh]
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
            src={`/slider/${i + 1}.jpg`}
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute inset-0 bg-black/50" />

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
              <div className="max-w-[320px] sm:max-w-xl md:max-w-2xl">
                <h1
                  className="
                    font-bold leading-tight drop-shadow
                    text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                  "
                >
                  {slide.title}
                </h1>

                <p
                  className="
                    mt-3 sm:mt-4
                    text-xs sm:text-sm md:text-base lg:text-lg
                  "
                >
                  {slide.description}
                </p>

                <div
                  className="
                    mt-5 sm:mt-6
                    flex flex-col sm:flex-row gap-3 sm:gap-4
                    justify-center sm:justify-start
                  "
                >
                  <button
                    className="
                      bg-brand text-black font-medium
                      px-4 sm:px-5 py-2
                      text-xs sm:text-sm md:text-base
                      rounded-lg border-0 cursor-pointer
                    "
                  >
                    {slider.button}
                  </button>

                  <button
                    className="
                      bg-transparent text-white border border-white
                      px-4 sm:px-5 py-2
                      text-xs sm:text-sm md:text-base
                      rounded-lg hover:bg-black hover:text-white transition cursor-pointer
                    "
                  >
                    {slider.button_2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Flechas centradas en la parte baja */}
      <div
        className="
          absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2
          flex items-center gap-6
        "
      >
        <button
          onClick={prev}
          className="bg-black/60 text-white p-2 sm:p-3 rounded-full"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={next}
          className="bg-black/60 text-white p-2 sm:p-3 rounded-full"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AutoSlider;
