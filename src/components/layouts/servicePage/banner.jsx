// components/layouts/servicePage/banner.jsx
import { servicesImages } from "../../../utils/variables";
import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";

// Mapea el slug de la URL a la clave del JSON
const slugToServiceKey = {
  "reformas_de_baños": "baños",
  "albanileria": "albanileria",
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
  // console.log("Banner - category:", category);
  // console.log("Banner - lang:", lang);



  const serviceKey = slugToServiceKey[category];
  const serviceData = t.services_subservices[serviceKey];
  // console.log(t.services_subservices)
  // console.log("serviceKey:", serviceKey);
  

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
          loading="lazy"
        />
      )}

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido de texto */}
      <div className="container-main absolute inset-0 flex items-center justify-center">
        <div className=" container-main    flex flex-col   items-center sm:items-start   text-center sm:text-left">
          <div className="max-w-2xl space-y-2">
            {/* h2: subtitle en negrita, grande */}
            {subtitle && (
              <h2 className="font-extrabold leading-snug md:leading-tight drop-shadow text-white  text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {subtitle}
              </h2>
            )}
            {/* p: descripción */}
            {serviceData?.short_description && (
              <p className="text-white/90  text-sm xs:text-base md:text-lg lg:text-xl">
                {serviceData.short_description}
              </p>
            )}

         
          </div>

        </div>

      </div>


          
        

          



    </section>
  );
};

export default Banner;
