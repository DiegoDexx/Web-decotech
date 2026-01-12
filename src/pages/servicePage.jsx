// servicePage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layouts/navbar";
import ServiceNavigation from "../components/layouts/servicePage/navigation";
import Banner from "../components/layouts/servicePage/banner";
import Subcategories from "../components/layouts/servicePage/subcategories";
import Footer from "../components/layouts/footer";
import Contact from "../components/layouts/contact";
import Description from "../components/layouts/servicePage/description";

export default function ServicePage() {
  const { lang, category } = useParams();   // lang = es | en | fr | de

  const language = lang || "es";            // idioma por defecto

  return (
    <>
      <Navbar language={language} />
      <ServiceNavigation />
      <Banner category={category} lang={lang} />
      <Description category={category} lang={lang} />
      <Subcategories category={category} lang={lang} />
      <Contact id="contact-section-servicepage" />


      {/* aquí ya puedes usar category e idioma */}
      <Footer language={language} />  
    
     
    </>
  );
}
