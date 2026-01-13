// modalForm.jsx
import { useMemo, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

export default function ModalContactForm({
  id,
  open,
  onClose,
  initialServiceSlug,
  initialSubserviceSlug,
}) {
  const [state, handleSubmit] = useForm("mzdznppv");

  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;

  const formText = t.contact.form_text;
  const services = t.services;
  const servicesSub = t.services_subservices;

  // Estado inicial viene del modal (servicio y subservicio seleccionados)
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(
    () => initialServiceSlug || ""
  );
  const [selectedSubSlug, setSelectedSubSlug] = useState(
    () => initialSubserviceSlug || ""
  );

  const servicesList = useMemo(() => {
    return Object.entries(services || {})
      .filter(([k]) => k.startsWith("service_"))
      .map(([, v]) => v)
      .filter((v) => v?.slug && v?.title);
  }, [services]);

  const slugToServiceKey = useMemo(
    () => ({
      reformas_de_baños: "baños",
      albañileria: "albañileria",
      reformas_integrales: "reformas_integrales",
      antenas: "antenas",
      fontaneria: "fontaneria",
      reformas_de_cocina: "reformas_cocina",
      pintura: "pintura",
      electricidad: "electricidad",
      limpieza: "limpieza",
    }),
    []
  );

  const selectedServiceKey = selectedServiceSlug
    ? slugToServiceKey[selectedServiceSlug]
    : null;

  const subservicesList = useMemo(() => {
    if (!selectedServiceKey) return [];
    const obj = servicesSub?.[selectedServiceKey]?.subservicios || {};
    return Object.values(obj).filter((v) => v?.slug && v?.title);
  }, [servicesSub, selectedServiceKey]);

  // Si el formulario se ha enviado
  if (state.succeeded) {
    return (
      open && (
        <div
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-md max-w-md w-full relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold">
              ✅ {formText?.fields?.success}
            </h3>
          </div>
        </div>
      )
    );
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-2xl p-4 md:p-8 w-full max-w-2xl relative">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/10 text-black flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl md:text-2xl font-light text-black-600">
          {formText?.title}
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" id={id}>
          {/* 2 columnas en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-black-900 mb-2 ">
                {formText?.fields?.name}
                <span className="text-red-500">*</span>
              </label>

              <input
                name="fullName"
                type="text"
                required
                placeholder={formText?.fields?.name}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none border-0 focus:ring-2 focus:ring-blue-300"
              />

              <ValidationError
                prefix={formText?.fields?.name}
                field="fullName"
                errors={state.errors}
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-black-900 mb-2">
                {formText?.fields?.phone}
              </label>

              <input
                name="phone"
                type="tel"
                placeholder={formText?.fields?.phone}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none border-0 focus:ring-2 focus:ring-blue-300"
              />

              <ValidationError
                prefix={formText?.fields?.phone}
                field="phone"
                errors={state.errors}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              {formText?.fields?.email} <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none border-0 focus:ring-2 focus:ring-blue-300"
            />

            <ValidationError
              prefix={formText?.fields?.email}
              field="email"
              errors={state.errors}
            />
          </div>

          {/* Servicio */}
          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              {formText?.fields?.proyect} <span className="text-red-500">*</span>
            </label>

            <select
              name="project"
              required
              value={selectedServiceSlug}
              onChange={(e) => {
                setSelectedServiceSlug(e.target.value);
                setSelectedSubSlug(""); // reset subservicio al cambiar servicio
              }}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none border-0 focus:ring-2 focus:ring-black-300"
            >
              <option value="" disabled>
                {formText?.fields?.proyect}
              </option>

              {servicesList.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>

            <ValidationError
              prefix={formText?.fields?.proyect}
              field="project"
              errors={state.errors}
            />
          </div>

          {/* Subservicio */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              {formText?.fields?.subcategory}
            </label>

            <select
              name="subcategory"
              disabled={!selectedServiceKey}
              value={selectedSubSlug}
              onChange={(e) => setSelectedSubSlug(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none border-0 focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
            >
              <option value="" disabled>
                {formText?.fields?.subcategory}
              </option>

              {subservicesList.map((sub) => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.title}
                </option>
              ))}
            </select>

            <ValidationError
              prefix={formText?.fields?.subcategory}
              field="subcategory"
              errors={state.errors}
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              {formText?.fields?.message}
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={formText?.fields?.message}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none border-0 resize-none focus:ring-2 focus:ring-blue-300"
            />

            <ValidationError
              prefix={formText?.fields?.message}
              field="message"
              errors={state.errors}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-brand text-black font-medium py-3 border-0 cursor-pointer 
              hover:brightness-110 transition disabled:opacity-60"
          >
            {formText?.fields?.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
