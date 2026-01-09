import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

export default function Gallery() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;

  const gallery = t.gallery;

  // items: [{ id, title, category, image, button }]
  const items = useMemo(() => gallery.items || [], [gallery.items]);

  const filters = useMemo(() => gallery.filters || [], [gallery.filters]);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((it) => it.category === activeFilter);
  }, [items, activeFilter]);

  return (
    <section className="w-full bg-white py-14 md:py-16">
      <div className="container-main">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-black">
          {gallery.title}
        </h2>

        <p className="mt-3 text-center text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          {gallery.description}
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {filters.map((f) => {
            const isActive = f.value === activeFilter;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={[
                  "px-5 py-2 rounded-xl text-sm md:text-base border transition cursor-pointer",
                  isActive
                    ? "bg-brand text-black border-transparent shadow-sm"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover:scale-100 cursor-pointer" id="gallery-grid">
          {filteredItems.map((card) => (
            <article
              key={card.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="w-full h-[220px]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg md:text-xl font-medium text-black">
                  {card.title}
                </h3>

                <button className="mt-4 bg-brand btn-outline hover:brightness-110 transition">
                  {card.button}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button className="bg-brand btn-outline hover:brightness-110 transition ">
            {gallery.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
