import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";

const translationsByLang = { es, en, fr, de };

const Description = ({ category, lang }) => {
    const t = translationsByLang[lang] || translationsByLang.es;

    const slugToServiceKey = {
        "reformas_de_baños": "baños",
        "albañileria": "albañileria",
        "reformas_integrales": "reformas_integrales",
        "antenas": "antenas",
        "fontaneria": "fontaneria",
        "reformas_de_cocina": "reformas_cocina",
        "pintura": "pintura",
        "electricidad": "electricidad",
        "limpieza": "limpieza"
    };

    const serviceKey = slugToServiceKey[category];
    const serviceData = t.services_subservices[serviceKey];

    return (
        <div className="w-full py-6 md:py-8 lg:py-10 bg-yellow-50 to-transparent">
            <div className="container-main flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px]">
                
                {/* Separador decorativo */}
                <div className="w-20 h-1 bg-brand rounded-full mb-4 md:mb-5" />
                
                {/* Contenido centrado */}
                {serviceData?.description && (
                    <div className="text-center px-4 sm:px-6">
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                            {serviceData.description}
                        </p>
                    </div>
                )}
                
                {/* Separador inferior */}
                <div className="w-16 h-px bg-brand/50 mt-5 md:mt-6" />
            </div>
        </div>
    );
};

export default Description;