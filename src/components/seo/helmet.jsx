import { Helmet } from 'react-helmet-async';

const HelmetSEO = ({ 
  title = "DECOTECH | Reformas Integrales de Calidad",
  description = "Especialistas en reformas de baños, cocinas y obras integrales. Materiales premium y presupuestos sin compromiso.",
  image = "/og-decotech.jpg",
  keywords = "reformas integrales, baños, cocinas, albañilería, fontanería, DECOTECH",
  lang = "es"
}) => {
  return (
    <Helmet>
      {/* Título principal (60 chars máx) */}
      <title>{title}</title>
      <meta name="title" content={title} />
      
      {/* Meta descripción (155 chars máx - CRUCIAL) */}
      <meta name="description" content={description} />
      
      {/* Open Graph - Redes Sociales */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="DECOTECH Reformas" />
      <meta property="og:locale" content={lang === "es" ? "es_ES" : "en_US"} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Keywords y otros */}
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={lang} />
      <meta name="author" content="DECOTECH Reformas Integrales" />
      
      {/* Canonical */}
      <link rel="canonical" href={window.location.href} />
      
      {/* Favicon y Apple Touch */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Idioma HTML */}
      <html lang={lang} />
    </Helmet>
  );
};

export default HelmetSEO;