import { useState } from "react";
import logo from "../../assets/img/LogoDECOTECH_Transparente.png";
import SelectIdiom from "../ui/selectIdiom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translations = { es, en, fr, de };

export default function Navbar({ language }) {
  const [open, setOpen] = useState(false);
  const t = translations[language].navbar;

  return (
    <nav className="sticky top-0 w-full  bg-white  border-b border-black/10 z-100 shadow-sm py-1  ">

      {/* FILA ESPECIAL SOLO PARA MÓVIL */}
      <div className="container-main flex items-center justify-between px-4 md:hidden ">

        {/* LEFT: SelectIdiom */}
        <div>
          <SelectIdiom />
        </div>

        {/* CENTER: LOGO */}
        <div className="flex-grow flex justify-center mx-auto" id="landing">
          <img src={logo} alt="Decotech Logo" className="h-20 w-auto " />
        </div>

        {/* RIGHT: MENU BURGER */}
        <button className="md:hidden cursor-pointer border-0 bg-white" onClick={() => setOpen(true)}>
          <svg
            className="w-7 h-7 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

            { open && (
      
      /* MENÚ MÓVIL (OVERLAY) */
      <div className="
          fixed inset-0 bg-white z-50 
          flex flex-col p-6 gap-8
          animate-fadeIn
        ">
          
          {/* BOTÓN CERRAR (FLECHA ATRÁS) */}
          <button
            className="button-arrow-back flex items-center gap-2 bg-black text-white w-25 rounded-lg md:text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>{t.back || "Volver"}</span>
          </button>

          {/* OPCIONES DEL MENÚ */}
          <nav className="flex flex-col gap-6 text-xl font-medium mt-6">

            <a href="#landing" className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black pointer">{t.links.home}</a>
            <a href="#all-services" className="no-underline visited:no-underline text-sm text-black pointer">{t.links.services}</a>
            <a href="#gallery-grid" className="no-underline visited:no-underline text-sm text-black pointer">{t.links.projects}</a>
            <a href="#about-us" className="no-underline visited:no-underline text-sm text-black pointer">{t.links.about}</a>
            <a href="#contact-section" className="no-underline visited:no-underline text-sm text-black pointer">{t.contact}</a>

          </nav>

        </div>
      )}
      </div>

      {/* ⭐ FILA PARA ESCRITORIO (SE MANTIENE IGUAL) */}
      <div className="container-main  md:flex hidden justify-between items-center">


        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Decotech Logo" className="h-20 w-auto" />
        </div>

        {/* MENÚ */}
        <div className="flex items-center gap-10">

          <a href="#landing" className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black pointer">{t.links.home}</a>
          <a href="#all-services" className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black pointer">{t.links.services}</a>
          <a href="#gallery-grid" className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black pointer">{t.links.projects}</a>
          <a href="#about-us" className="text-sm text-black no-underline visited:text-black hover:text-black active:text-black focus:text-black pointer">{t.links.about}</a>

          <button className="bg-brand btn-outline text-sm">
            {t.contact}
          </button>

          {/* SELECTOR IDIOMA (SOLO ESCRITORIO) */}
          <SelectIdiom />
        </div>
      </div>


    </nav>
  );
}