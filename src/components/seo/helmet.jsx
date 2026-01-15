import { Head } from "@unhead/react";


const localeMap = {
  es: "es_ES",
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE"
};

const HelmetSEO = ({
  title,
  description,
  url,
  image = "https://reformas-integrales.com/og-default.jpg",
  lang = "es",
  alternates = {}
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Reformas Integrales" />
      <meta property="og:locale" content={localeMap[lang]} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Hreflang dinámico */}
      {Object.entries(alternates).map(([lng, href]) => (
        <link
          key={lng}
          rel="alternate"
          hreflang={lng}
          href={href}
        />
      ))}

      {/* Idioma HTML */}
      <html lang={lang} />
    </Head>
  );
};

export default HelmetSEO;
