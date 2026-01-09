import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layouts/navbar";
import TermsLayout from "../components/layouts/TermsLayout";
import Footer from "../components/layouts/footer";

export default function TermsAndConditions() {
  const { lang, category } = useParams();   // lang = es | en | fr | de

  const language = lang || "es";            // idioma por defecto

  return (
    <div className="w-full bg-white">
      <Navbar language={language} />
   
      <TermsLayout lang={language} category={category} />
      <Footer language={language} />
    </div>
  );
}