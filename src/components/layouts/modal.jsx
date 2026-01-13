import { useEffect, useState } from "react";
import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

export default function Modal({ open, onClose, subservice, onRequest, subservicesArray, lang }) {
  const t = translationsByLang[lang] || translationsByLang.es;
  
  // 🔄 Estado para el índice actual del subservicio
  const [currentIndex, setCurrentIndex] = useState(0);

    // ◀️ Navegar al anterior
  const handlePrevious = () => {
    if (!subservicesArray || subservicesArray.length === 0) return;
    const newIndex = (currentIndex - 1 + subservicesArray.length) % subservicesArray.length;
    setCurrentIndex(newIndex);
  };

    // ▶️ Navegar al siguiente
  const handleNext = () => {
    if (!subservicesArray || subservicesArray.length === 0) return;
    const newIndex = (currentIndex + 1) % subservicesArray.length;
    setCurrentIndex(newIndex);
  };

  // 📍 Actualizar índice cuando cambia el subservicio activo
  useEffect(() => {
    if (subservice && subservicesArray) {
      const index = subservicesArray.findIndex((s) => s.id === subservice.id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [subservice, subservicesArray]);

  // ⌨️ Controles del teclado
  useEffect(() => {
    if (!open || !subservicesArray || subservicesArray.length === 0) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?. ();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document. removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, currentIndex, subservicesArray]);




  if (!open || !subservice || !subservicesArray || subservicesArray.length === 0) {
    return null;
  }

  const currentSubservice = subservicesArray[currentIndex];
  const hasNavigation = subservicesArray.length > 1;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Imagen superior */}
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] bg-gray-200">
          <img
            src={currentSubservice.image}
            alt={currentSubservice.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Botón cerrar sobre la imagen */}
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Cerrar"
            className="
              absolute top-3 right-3
              w-9 h-9 rounded-full
              bg-black/20 text-white
              hover:bg-black/80
              flex items-center justify-center
              transition
              cursor-pointer
              z-10
            "
          >
            ✕
          </button>

          {/* 🔄 Indicador de posición */}
          {hasNavigation && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {subservicesArray.length}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-8">
          <h3 className="text-xl md: text-2xl font-semibold text-black">
            {currentSubservice.title}
          </h3>

          <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
            {currentSubservice.long_description || currentSubservice.description}
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onRequest?.(currentSubservice)}
              className="
                bg-brand text-black font-medium
                px-6 py-2 rounded-lg
                hover:brightness-110
                transition
                border-0 cursor-pointer
              "
            >
              {t?.slider?.button || "Solicitar Presupuesto"}
            </button>
          </div>
        </div>
        {/* 🔘 Flechas de navegación lateral */}
        {hasNavigation && (
          <>
            {/* Flecha izquierda */}
            <button
              type="button"
              onClick={handlePrevious}
              className="
                absolute left-5 top-[38%]
                z-20 bg-black/60 hover:bg-black/80
                text-white rounded-full w-10 h-10
                flex items-center justify-center
                transform
                transition-all duration-200
                hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-white/50
                md:left-2 md:top-[38%]
                cursor-pointer
              "
              aria-label="Anterior"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Flecha derecha */}
            <button
              type="button"
              onClick={handleNext}
              className="
                absolute right-5 top-[38%]
                z-20 bg-black/60 hover:bg-black/80
                text-white rounded-full w-10 h-10
                flex items-center justify-center
                transform
                transition-all duration-200
                hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-white/50
                md:right-2 md:top-[38%]
                cursor-pointer
              "
              aria-label="Siguiente"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

      

      </div>
    </div>
  );
}