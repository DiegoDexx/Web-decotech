import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";

const translationsByLang = { es, en, fr, de };

// Tu mapping (lo uso tal cual). Ideal: que estos slugs sean ASCII.
const slugToServiceKey = {
  "reformas_de_baños": "baños",
  "albañileria": "albañileria",
  "reformas_integrales": "reformas_integrales",
  "antenas": "antenas",
  "fontaneria": "fontaneria",
  "reformas_de_cocina": "reformas_cocina",
  "pintura": "pintura",
  "electricidad": "electricidad",
  "limpieza": "limpieza",
};

// Mini componente “check”
function CheckBadge() {
  return (
    <div className="bg-brand w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-3">
      <span className="text-black font-bold leading-none">✓</span>
    </div>
  );
}

const Subcategories = ({ category, lang }) => {
  const t = translationsByLang[lang] || translationsByLang.es;

  const serviceKey = slugToServiceKey[category];
  const serviceData = t?.services_subservices?.[serviceKey];

  if (!serviceKey || !serviceData) return null;

  const subservicesArray = Object.entries(serviceData.subservicios || {}).map(
    ([id, data]) => ({
      id, // key estable (reformas_integrales_banos, etc.)
      ...data, // { title, description, slug }
    })
  );

  return (
    <>


      {/* SECCIÓN "¿QUÉ OFRECEMOS?" (como en la imagen) */}
      <section className="w-full bg-white-50 py-16 md:py-20 px-4 ">
        <div className="container-main ">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-black">
            ¿Qué Ofrecemos?
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
            {subservicesArray.map((s) => (
       <div
            key={s.id}
            className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
            {/* Tick + título alineados */}
            <div className="flex items-start gap-3">
                <CheckBadge />
                <h3 className="text-sm md:text-base font-medium text-gray-900 leading-snug">
                {s.title}
                </h3>
            </div>

            {/* Descripción */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {s.description}
            </p>
            </div>

   
            ))}
          </div>
        </div>
        </section>



    </>
  );
};

export default Subcategories;
