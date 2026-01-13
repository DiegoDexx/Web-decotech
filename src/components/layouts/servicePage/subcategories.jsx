import es from "../../../locales/es.json";
import en from "../../../locales/en.json";
import fr from "../../../locales/fr.json";
import de from "../../../locales/de.json";
import { useState } from "react";
import Modal from "../../layouts/modal";
import ModalContactForm from "../../ui/modalForm";

const translationsByLang = { es, en, fr, de };

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

function CheckBadge() {
  return (
    <div className="bg-brand w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1">
      <span className="text-black font-bold leading-none">✓</span>
    </div>
  );
}

const Subcategories = ({ category, lang }) => {
  const t = translationsByLang[lang] || translationsByLang.es;
    const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeSubservice, setActiveSubservice] = useState(null);

  const serviceKey = slugToServiceKey[category];
  const serviceData = t?.services_subservices?.[serviceKey];
  if (!serviceKey || !serviceData) return null;

  const subservicesArray = Object.entries(serviceData.subservicios || {}).map(([id, data]) => ({
    id,
    ...data,
  }));

  // ✅ Guardar servicio activo
  const serviceActive = t?.services_subservices?.[serviceKey]?.title || "";


  // ✅ Abrir modal
  function handleOpenSubserviceModal(subservice) {
    setActiveSubservice(subservice);
    setIsModalOpen(true);
  }

  // ✅ Cerrar modal
  function handleCloseSubserviceModal() {
    setIsModalOpen(false);
    setActiveSubservice(null);
  }

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formServiceSlug, setFormServiceSlug] = useState("");
  const [formSubSlug, setFormSubSlug] = useState("");

  function handleRequestFromModal(subservice, serviceSlug) {
    setFormServiceSlug(serviceSlug);        // p.ej. "reformas_de_baños"
    setFormSubSlug(subservice.slug);       // slug del subservicio
    setIsFormOpen(true);
    setIsModalOpen(false);
  }


  return (
    <>
      <section className="w-full bg-white py-16 md:py-20 px-4">
        <div className="container-main">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-black">
            ¿Qué Ofrecemos?
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subservicesArray.map((s) => (
              <div
                key={s.id}
                className="
                  relative bg-white rounded-2xl shadow-md
                  px-6 py-6 flex flex-col gap-4
                  transition-all duration-300
                  hover:shadow-lg hover:-translate-y-1
                  active:scale-[0.99]
                "
              >
                {/* Tick + título */}
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

                {/* ✅ Botón Más info */}
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => handleOpenSubserviceModal(s)}
                    className="
                      w-full bg-brand text-black font-medium text-sm
                      py-2 rounded-lg border-0
                      transition-all duration-200
                      hover:brightness-110 hover:scale-[1.01]
                      active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-black/20
                      cursor-pointer
                    "
                  >
                    Más Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseSubserviceModal}
        service={serviceActive}
        subservice={activeSubservice}
        subservicesArray={subservicesArray}
        lang={lang}
        onRequest={(sub) => handleRequestFromModal(sub, category)} // category = slug
      />

      {/* ✅ Modal Form */}
      <ModalContactForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        serviceSlug={formServiceSlug}
        subserviceSlug={formSubSlug}
        lang={lang}
      />
    </>
  );
};

export default Subcategories;
