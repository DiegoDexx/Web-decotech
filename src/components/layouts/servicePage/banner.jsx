// components/layouts/servicePage/banner.jsx
import { servicesImages } from "../../../utils/variables";
import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";

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

const Banner = ({ category, lang }) => {
  const translationsByLang = { es, en, fr, de }; // luego añadirás en, fr, de
  const t = translationsByLang[lang] || translationsByLang.es; 

  //COMPROBACIONES
  console.log("Banner - category:", category);
  console.log("Banner - lang:", lang);



  const serviceKey = slugToServiceKey[category];
  const serviceData = t.services_subservices[serviceKey];
  console.log(t.services_subservices)
  console.log("serviceKey:", serviceKey);
  

  const imageSrc = servicesImages[category];
  const subtitle = serviceData?.subtitle;
 

  return (
    <section className="relative w-full h-[80vh] md:h-[60vh] overflow-hidden">
      {/* Imagen de fondo */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={subtitle || serviceKey}
          className="w-full h-full object-cover object-center"
        />
      )}

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido de texto */}
      <div className="container-main">
        <div className="absolute left-2 md:left-30 top-1/2 -translate-y-1/2 max-w-xl text-white">
          <div className="max-w-2xl space-y-3">
            {/* h2: subtitle en negrita, grande */}
            {subtitle && (
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                {subtitle}
              </h2>
            )}

            {/* h3: short_description, algo más pequeña */}
            {serviceData?.short_description && (
              <h3 className="text-base md:text-lg text-gray-100 font-normal ">
                {serviceData.short_description}
              </h3>
            )} 
          </div>

        </div>

      </div>


          
        

          



    </section>
  );
};

export default Banner;
