import { useLocation } from "react-router-dom";
import Card from "../ui/card";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const locales = { es, en, fr, de };

// Asignación de iconos según el número del servicio


export default function Services() {
    const location = useLocation();
    const lang = location.pathname.split("/")[1] || "es";

    const t = locales[lang].services;

    // Convertir dinámicamente service_1 ... service_9 a una lista
    const servicesArray = Object.entries(t)
        .filter(([key]) => key.startsWith("service_"))
        .map(([key, value]) => ({ key, ...value }));

    return (
     <section className="w-full py-16 bg-gray-50" id="all-services">
        <div className="container-main">

            <h2 className="text-3xl md:text-4xl font-bold text-center">{t.title}</h2>
            <p className="text-center mt-2 text-gray-600 max-w-2xl mx-auto">{t.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

            {servicesArray.map((service) => {
                

                return (

                   <Card service={service} 
                        key={service.key} 
                        lang={lang}

                   />

                );
            })}

            </div>

  </div>
</section>

    );
}
