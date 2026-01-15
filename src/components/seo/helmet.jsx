import { useHead } from "@unhead/react";

const localeMap = {
  es: "es_ES",
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
};

export default function HelmetSEO({
  title,
  description,
  url,
  image = "https://reformas-integrales.com/og-default.jpg",
  lang = "es",
  alternates = {},
}) {
  useHead({
    title,
    htmlAttrs: { lang },

    meta: [
      { name: "description", content: description },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Reformas Integrales" },
      { property: "og:locale", content: localeMap[lang] || "es_ES" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },

      // Robots
      { name: "robots", content: "index, follow" },
    ],

    link: [
      { rel: "canonical", href: url },

      // hreflang alternates
      ...Object.entries(alternates).map(([lng, href]) => ({
        rel: "alternate",
        hreflang: lng,
        href,
      })),
    ],
  });

  return null;
}
