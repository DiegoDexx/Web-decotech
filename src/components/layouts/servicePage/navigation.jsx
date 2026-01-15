// components/layouts/servicePage/navigation.jsx
import { Link, useParams, useNavigate } from "react-router-dom";

import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";

const translations = { es, en, fr, de };

export default function ServiceNavigation() {
  const { lang = "es", category } = useParams();
  const t = translations[lang]?.services || translations.es.services;
  const navigate = useNavigate();

  // Pasamos de service_1, service_2... a un array
  const servicesArray = Object.values(t).filter(
    (item) => item && item.slug // filtra title/description que no son objetos
  );

  return (
    <section className="w-full bg-white">
      <div className="container-main py-4 md:py-6">
        {/* Volver */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-gray-600 mb-3 pointer border-0 bg-transparent"
          onClick={() => navigate(`/${lang}`)}
        >
          <span className="text-lg">←</span>
          <span>{t.backLabel || "Volver a servicios"}</span>
        </button>

        {/* Wrapper gris claro */}
        <div className="w-full bg-gray-100 rounded-2xl py-3 px-2 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {servicesArray.map((service) => {
              const isActive = category === service.slug;

              return (
                <Link
                  key={service.slug}
                  to={`/${lang}/service/${service.slug}`}
                  className={`btn text-sm whitespace-nowrap border border-gray-200 rounded-full no-decoration  ${
                    isActive
                      ? "bg-brand font-semibold shadow-sm"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {service.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
