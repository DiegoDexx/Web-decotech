import React, { useEffect, useRef, useState } from "react";
import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

/**
 * ServiceProcess.jsx
 *
 * - Roadmap / timeline layout (responsive)
 * - Subtle SVG pattern background to avoid flat look
 * - Wider cards, closer to central rail to reduce empty space
 * - Small metadata row per card (icon + example duration)
 * - IntersectionObserver reveals each card and keeps it visible permanently
 * - Progress bar (simple) showing scroll progress within the timeline container
 *
 * Notes:
 * - step.image should be a public-rooted path like "/subservices/..."
 * - The component reads content from `t.service_process` in your locale files
 */
export default function ServiceProcess({ lang = "es" }) {
  const t = translationsByLang[lang] || translationsByLang.es;
  const process = t?.service_process || null;

  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // indices of items that have been revealed (persist)
  const [visibleItems, setVisibleItems] = useState([]);
  // progress percent for the progress bar (0 - 100)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".sp-item");

    // disconnect previous observer if any
    if (observerRef.current) observerRef.current.disconnect();

    const io = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const set = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (entry.isIntersecting) set.add(idx);
          });
          return Array.from(set).sort((a, b) => a - b);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px", // trigger slightly before fully in view
        threshold: 0.12,
      }
    );

    items.forEach((it) => io.observe(it));
    observerRef.current = io;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, process?.steps?.length]);

  // Progress: percentage of scroll inside the timeline container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const visibleHeight = window.innerHeight;

      const total = Math.max(rect.height - visibleHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const pct = Math.round((scrolled / total) * 100);
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef.current, process?.steps?.length]);

  if (!process) return null;

  return (
    <section className="w-full bg-yellow-50 py-10 md:py-16 px-4 relative overflow-hidden">
      {/* Subtle SVG dot pattern to add texture */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dotPattern" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#f7d54d" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>

      <div className="max-w-6xl mx-auto relative" ref={containerRef}>
        {/* Heading / intro */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-black tracking-tight">
            {process.title}
          </h2>
          {process.description && (
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{process.description}</p>
          )}
        </div>

        {/* Central vertical line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-24 bottom-36 w-0.5 bg-yellow-300 transform -translate-x-1/2" />

        {/* Mobile left rail */}
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-yellow-200 rounded" />

        <ul className="relative flex flex-col gap-8">
          {process.steps?.map((step, idx) => {
            const shown = visibleItems.includes(idx);
            const isEven = idx % 2 === 0;
            return (
              <li
                key={step.id}
                data-idx={idx}
                className={`sp-item relative md:py-6 transition-all duration-700 ${
                  shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Bubble / dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-2 md:top-12 z-20">
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-yellow-400 shadow flex items-center justify-center">
                    <span className="text-sm font-bold text-black">{step.number}</span>
                  </div>
                </div>

                {/* Card wrapper - wider and closer to center */}
                <div
                  className={`mt-6 md:w-6/12 md:relative ${isEven ? "md:ml-auto md:pr-6" : "md:mr-auto md:pl-6"}`}
                  style={{ willChange: "transform, opacity" }}
                >
                  <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Image */}
                    {step.image && (
                      <div className="w-full h-48 md:h-56 overflow-hidden rounded-t-2xl">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover transform transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* meta row: icon + duration */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-sm">
                            {step.icon || "🔧"}
                          </div>
                          {/* optional small subtitle */}
                          {step.subtitle && <span className="text-xs text-gray-500">{step.subtitle}</span>}
                        </div>

                        {/* example duration badge; you can replace with step.duration from your JSON */}
                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">7–14 días</span>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

                      {/* optional bullets if present in JSON */}
                      {Array.isArray(step.bullets) && step.bullets.length > 0 && (
                        <ul className="mt-3 text-sm text-gray-600 space-y-1 list-inside">
                          {step.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-yellow-400 mr-2">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </div>

                {/* Decorative triangle/arrow for desktop that points to the center line */}
                <div
                  className={`hidden md:block absolute top-20 ${
                    isEven ? "right-1/2 translate-x-6" : "left-1/2 -translate-x-6"
                  }`}
                >
                  <div
                    className={`w-0 h-0 ${
                      isEven
                        ? "border-l-[12px] border-l-white border-y-[8px] border-y-transparent"
                        : "border-r-[12px] border-r-white border-y-[8px] border-y-transparent"
                    }`}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {/* Simple progress bar under the roadmap */}
        <div className="mt-8">
          <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className="h-2 bg-yellow-400"
              style={{ width: `${progress}%`, transition: "width 250ms linear" }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="inline-flex items-center gap-3 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full border-0 shadow-md hover:brightness-95 transition"
          >
            <span>{process.cta_button}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}