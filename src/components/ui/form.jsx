import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

const N8N_WEBHOOK_URL =
  import.meta.env.VITE_PROD_FORM_N8N_WEBHOOK_URL;

export default function ContactForm({ id }) {
  const location = useLocation();

  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;

  const formText = t.contact.form_text;
  const services = t.services;
  const servicesSub = t.services_subservices;

  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialProject = searchParams.get("project") || "";
  const initialSubcategory = searchParams.get("subcategory") || "";

  const [selectedServiceSlug, setSelectedServiceSlug] = useState(
    () => initialProject
  );

  const [selectedSubSlug, setSelectedSubSlug] = useState(
    () => initialSubcategory
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

    const obj =
      servicesSub?.[selectedServiceKey]?.subservicios || {};

    return Object.values(obj).filter(
      (v) => v?.slug && v?.title
    );
  }, [servicesSub, selectedServiceKey]);

  const selectedServiceTitle =
    servicesList.find(
      (service) => service.slug === selectedServiceSlug
    )?.title || "";

  const selectedSubTitle =
    subservicesList.find(
      (sub) => sub.slug === selectedSubSlug
    )?.title || "";

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      project: formData.get("project"),
      projectTitle: selectedServiceTitle,
      subcategory: formData.get("subcategory"),
      subcategoryTitle: selectedSubTitle,
      startDate: formData.get("startDate"),
      message: formData.get("message"),

      source: "web-decotech",
      language: lang,
      pageUrl: window.location.href,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      setSucceeded(true);

      event.currentTarget.reset();

      setSelectedServiceSlug("");
      setSelectedSubSlug("");
    } catch (err) {
      console.error(err);

      setError(
        "No se ha podido enviar el formulario."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (succeeded) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <h3 className="text-xl font-semibold">
          ✅ {formText?.fields?.success}
        </h3>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="bg-white rounded-2xl p-4 md:p-8">
        <h2 className="text-2xl md:text-2xl font-light text-black-600">
          {formText?.title}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          id={id}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black-900 mb-2">
                {formText?.fields?.name}
              </label>

              <input
                name="fullName"
                type="text"
                required
                className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black-900 mb-2">
                {formText?.fields?.phone}
              </label>

              <input
                name="phone"
                type="tel"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              {formText?.fields?.email}
            </label>

            <input
              name="email"
              type="email"
              required
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              Servicio
            </label>

            <select
              name="project"
              required
              value={selectedServiceSlug}
              onChange={(e) => {
                setSelectedServiceSlug(e.target.value);
                setSelectedSubSlug("");
              }}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
            >
              <option value="">
                Selecciona un servicio
              </option>

              {servicesList.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              Subservicio
            </label>

            <select
              name="subcategory"
              disabled={!selectedServiceKey}
              value={selectedSubSlug}
              onChange={(e) => setSelectedSubSlug(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none disabled:opacity-60"
            >
              <option value="">
                Selecciona una opción
              </option>

              {subservicesList.map((sub) => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              Fecha estimada de inicio
            </label>

            <input
              name="startDate"
              type="date"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black-900 mb-2">
              {formText?.fields?.message}
            </label>

            <textarea
              name="message"
              rows={5}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 rounded-xl p-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand text-black font-medium py-3 border-0 cursor-pointer hover:brightness-110 transition disabled:opacity-60"
          >
            {submitting ? "Enviando..." : formText?.fields?.submit}
          </button>
        </form>
      </div>
    </section>
  );
}