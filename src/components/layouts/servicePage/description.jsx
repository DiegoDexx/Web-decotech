import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";

const translationsByLang = { es, en, fr, de };

const Description = ({ category, lang }) => {
    const t = translationsByLang[lang] || translationsByLang.es;

    // Mapea el slug de la URL a la clave del JSON
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
    
      <div className="container-main bottom-0 left-0  w-full h-25 bg-gradient-to-t from-white/90 to-transparent " >

             { serviceData?.description && (
              <div className=" flex flex-col items-center justify-center py-8 px-5 md:px-0">
                <p className="text-gray-800 text-sm md:text-base max-w-[900px] mx-auto">
                  {serviceData.description}
                </p>
              </div>
    
            )}
        </div>
        );
}
 
    
export default Description;