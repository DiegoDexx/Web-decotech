import es from "../locales/es.json";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";

const locales = { es, en, fr, de };
const BASE_URL = "https://reformas-integrales.com";


// Función para obtener los alternates para una categoría dada
export function getAlternates(category) {
  const alternates = {};

  Object.entries(locales).forEach(([lang, data]) => {
    const slug = data?.seo?.services?.[category]?.slug;
    if (slug) {
      alternates[lang] = BASE_URL + slug;
    }
  });

  // obligatorio
  if (alternates.es) {
    alternates["x-default"] = alternates.es;
  }

  return alternates;
}

export { BASE_URL };
