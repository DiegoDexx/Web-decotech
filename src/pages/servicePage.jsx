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

import HelmetSEO from "../components/seo/helmet";

import es from "../locales/es.json";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";

import { getAlternates, BASE_URL } from "../utils/config";

const locales = { es, en, fr, de };

export default function ServicePage() {
  const { lang, category } = useParams(); // lang = es | en | fr | de
  const language = lang || "es";

  // SEO del servicio según idioma
  const seo =
    locales?.[language]?.seo?.services?.[category] ||
    locales?.es?.seo?.services?.[category];

  // Si no existe SEO para esa categoría, evita romper Helmet
  const title = seo?.title || "Servicios | Reformas Integrales";
  const description =
    seo?.description ||
    "Servicios profesionales de reformas y multiservicio en Murcia y Alicante. Solicita tu presupuesto.";
  const slug = seo?.slug || `/${language}/service/${category}`;

  const url = `${BASE_URL}${slug}`;

  // Alternates automáticos (hreflang)
  const alternates = getAlternates(category);

  return (
    <>
      {/* Helmet lo ideal es ponerlo arriba para que quede claro, pero funciona igual */}
      <HelmetSEO
        title={title}
        description={description}
        url={url}
        lang={language}
        alternates={alternates}
      />

      <Navbar language={language} />
      <ServiceNavigation />
      <Banner category={category} lang={language} />
      <Description category={category} lang={language} />
      <Subcategories category={category} lang={language} />
      <Contact id="contact-section-servicepage" />
      <Footer language={language} />
    </>
  );
}
