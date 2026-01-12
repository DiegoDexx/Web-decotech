import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/LogoDECOTECH_Transparente.png";
import SelectIdiom from "../ui/selectIdiom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translations = { es, en, fr, de };

export default function Navbar({ language }) {
  const [open, setOpen] = useState(false);
  const t = translations[language]?.navbar || { links: {}, contact: "Contacto", back: "Volver" };

  // Helper used in mobile menu items so the overlay closes and (if needed) the navigation proceeds.
  const handleMobileClick = (event, hrefCallback) => {
    // Close the mobile menu immediately
    setOpen(false);

    // If the element wants to perform custom navigation (passed as callback), call it after closing
    if (typeof hrefCallback === "function") {
      // give the DOM time to update (optional), but since we close immediately it's fine to call right away
      hrefCallback(event);
    }
  };

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-black/10 z-50 shadow-sm py-1">
      {/* FILA ESPECIAL SOLO PARA MÓVIL */}
      <div className="container-main flex items-center justify-between px-4 md:hidden">
        {/* LEFT: SelectIdiom */}
        <div>
          <SelectIdiom />
        </div>

        {/* CENTER: LOGO */}
        <div className="flex-grow flex justify-center mx-auto" id="landing">
          <img src={logo} alt="Decotech Logo" className="h-20 w-auto" />
        </div>

        {/* RIGHT: MENU BURGER */}
        <button
          className="md:hidden cursor-pointer border-0 bg-white"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {open && (
          // MENÚ MÓVIL (OVERLAY)
          <div
            className="
              fixed inset-0 bg-white z-50
              flex flex-col p-6 gap-8
              animate-fadeIn
            "
            role="dialog"
            aria-modal="true"
          >
            {/* BOTÓN CERRAR (FLECHA ATRÁS) */}
            <button
              className="button-arrow-back flex items-center gap-2 bg-black text-white w-25 rounded-lg md:text-lg font-medium inline-flex px-3 py-2"
              onClick={() => setOpen(false)}
              aria-label="Volver"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t.back || "Volver"}</span>
            </button>

            {/* OPCIONES DEL MENÚ */}
            <nav className="flex flex-col gap-6 text-xl font-medium mt-6">
              {/* These anchor links keep the same behavior but also close the mobile menu */}
              <a
                href="#landing"
                onClick={(e) => handleMobileClick(e)}
                className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black"
              >
                {t.links?.home || "Inicio"}
              </a>

              <a
                href="#all-services"
                onClick={(e) => handleMobileClick(e)}
                className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black"
              >
                {t.links?.services || "Servicios"}
              </a>

              <a
                href="#gallery-grid"
                onClick={(e) => handleMobileClick(e)}
                className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black"
              >
                {t.links?.projects || "Proyectos"}
              </a>

              <a
                href="#about-us"
                onClick={(e) => handleMobileClick(e)}
                className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black"
              >
                {t.links?.about || "Sobre nosotros"}
              </a>

              {/* FAQ: use react-router Link so we navigate to the language root + hash.
                  We also close the mobile menu on click so the underlying page/section is visible. */}
              <Link
                to={`/${language}/faq`}
                onClick={(e) => handleMobileClick(e, () => {})}
                className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black"
              >
                {t.links?.faq || "FAQ"}
              </Link>

              <a
                href="#contact-section"
                onClick={(e) => handleMobileClick(e)}
                className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black"
              >
                {t.contact || "Contacto"}
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* FILA PARA ESCRITORIO */}
      <div className="container-main md:flex hidden justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Decotech Logo" className="h-20 w-auto" />
        </div>

        {/* MENÚ */}
        <div className="flex items-center gap-10">
          <a href="#landing" className="text-sm text-black no-underline visited:text-black hover:text-black">
            {t.links?.home || "Inicio"}
          </a>

          <a href="#all-services" className="text-sm text-black no-underline visited:text-black hover:text-black">
            {t.links?.services || "Servicios"}
          </a>

          <a href="#about-us" className="text-sm text-black no-underline visited:text-black hover:text-black">
            {t.links?.about || "Sobre nosotros"}
          </a>

          {/* FAQ desktop: Link so it navigates to language root + hash */}
          <Link to={`/${language}/faq`} className="text-sm text-black no-underline visited:text-black hover:text-black">
            {t.links?.faq || "FAQ"}
          </Link>

          <button className="bg-brand btn-outline text-sm">
            {t.contact || "Contacto"}
          </button>

          {/* SELECTOR IDIOMA (SOLO ESCRITORIO) */}
          <SelectIdiom />
        </div>
      </div>
    </nav>
  );
}