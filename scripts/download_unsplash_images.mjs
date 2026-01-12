import fs from "node:fs";
import path from "node:path";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("❌ Falta UNSPLASH_ACCESS_KEY. Ejemplo:\nUNSPLASH_ACCESS_KEY=TU_KEY node scripts/download_unsplash_images.mjs");
  process.exit(1);
}

const OUT_DIR = path.resolve(process.cwd(), "public", "subservices");

// 54 imágenes (9 servicios * 6 subservicios)
const IMAGES = [
  // BAÑOS
  { file: "bathrooms/reformas-integrales-banos.jpg", q: "modern bathroom renovation" },
  { file: "bathrooms/reemplazo-instalaciones.jpg", q: "plumbing pipes bathroom" },
  { file: "bathrooms/cambio-banera-ducha.jpg", q: "walk in shower bathroom" },
  { file: "bathrooms/reemplazo-sanitarios.jpg", q: "modern bathroom sink toilet" },
  { file: "bathrooms/reemplazo-griferia.jpg", q: "bathroom faucet closeup" },
  { file: "bathrooms/azulejos-pavimentos.jpg", q: "bathroom tiles wall floor" },

  // ALBAÑILERÍA
  { file: "masonry/reformas-integrales.jpg", q: "home renovation construction interior" },
  { file: "masonry/tabiquerias-suelos-techos.jpg", q: "drywall interior construction" },
  { file: "masonry/rehabilitaciones.jpg", q: "building renovation restoration" },
  { file: "masonry/tratamiento-humedades.jpg", q: "damp wall repair" },
  { file: "masonry/impermeabilizaciones.jpg", q: "roof waterproofing membrane" },
  { file: "masonry/derrumbes-desescombros.jpg", q: "demolition construction debris" },

  // REFORMAS INTEGRALES
  { file: "integral/diseno-personalizado.jpg", q: "interior design planning moodboard" },
  { file: "integral/gestion-permisos.jpg", q: "construction documents clipboard" },
  { file: "integral/coordinacion-oficios.jpg", q: "construction team meeting site" },
  { file: "integral/acabados-calidad.jpg", q: "finishing renovation craftsmanship detail" },
  { file: "integral/cumplimiento-plazos.jpg", q: "construction schedule planning" },
  { file: "integral/presupuesto-detallado.jpg", q: "budget estimate paperwork" },

  // ANTENAS
  { file: "antennas/instalacion-antenas.jpg", q: "tv antenna rooftop installation" },
  { file: "antennas/reparacion-antenas.jpg", q: "technician repairing antenna" },
  { file: "antennas/antenas-particulares.jpg", q: "house rooftop tv antenna" },
  { file: "antennas/antenas-comunitarias.jpg", q: "apartment building rooftop antennas" },
  { file: "antennas/antenas-parabolicas.jpg", q: "satellite dish on roof" },
  { file: "antennas/mantenimiento-antenas.jpg", q: "satellite dish maintenance technician" },

  // FONTANERÍA
  { file: "plumbing/revision-reparacion.jpg", q: "plumber fixing leak" },
  { file: "plumbing/mantenimiento-preventivo.jpg", q: "plumber inspection pipes" },
  { file: "plumbing/instalacion-tuberias.jpg", q: "plumbing pipe installation" },
  { file: "plumbing/urgencias.jpg", q: "water leak emergency repair" },
  { file: "plumbing/reemplazo-sanitarios.jpg", q: "toilet installation plumber" },
  { file: "plumbing/reemplazo-griferia.jpg", q: "faucet installation sink" },

  // COCINA
  { file: "kitchens/reformas-integrales-cocina.jpg", q: "modern kitchen renovation" },
  { file: "kitchens/instalacion-mobiliario.jpg", q: "kitchen cabinet installation" },
  { file: "kitchens/reemplazo-encimeras.jpg", q: "kitchen countertop installation" },
  { file: "kitchens/instalacion-electrodomesticos.jpg", q: "kitchen appliance installation" },
  { file: "kitchens/reemplazo-griferia-cocina.jpg", q: "kitchen faucet sink" },
  { file: "kitchens/azulejos-pavimentos-cocina.jpg", q: "kitchen backsplash tiles" },

  // PINTURA
  { file: "painting/pintura-interior-exterior.jpg", q: "painter roller wall" },
  { file: "painting/microcemento.jpg", q: "microcement floor modern" },
  { file: "painting/comunidades-fachadas.jpg", q: "building facade painting" },
  { file: "painting/tratamiento-humedades-pintura.jpg", q: "moisture wall repair" },
  { file: "painting/retirada-gotele.jpg", q: "wall sanding smoothing" },
  { file: "painting/impermeabilizaciones-pintura.jpg", q: "waterproof coating exterior wall" },

  // ELECTRICIDAD
  { file: "electricity/urgencias-24h.jpg", q: "electrician emergency repair" },
  { file: "electricity/boletines-electricos.jpg", q: "electrical inspection certificate" },
  { file: "electricity/instalaciones-electricas-reparaciones.jpg", q: "electrician electrical panel" },
  { file: "electricity/aumentos-potencia.jpg", q: "electrical panel upgrade" },
  { file: "electricity/particulares-comunidades.jpg", q: "apartment building maintenance lights" },
  { file: "electricity/administradores-fincas.jpg", q: "building maintenance technician" },

  // LIMPIEZA
  { file: "cleaning/limpieza-viviendas.jpg", q: "home cleaning service" },
  { file: "cleaning/limpieza-por-horas.jpg", q: "cleaning supplies" },
  { file: "cleaning/limpieza-obras.jpg", q: "post construction cleaning" },
  { file: "cleaning/limpieza-comunidades.jpg", q: "apartment hallway cleaning" },
  { file: "cleaning/limpieza-parcelas.jpg", q: "yard outdoor cleaning" },
  { file: "cleaning/limpieza-locales.jpg", q: "office cleaning service" },
];

async function searchUnsplash(query) {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "10");
  url.searchParams.set("orientation", "landscape");

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });

  if (!res.ok) throw new Error(`Unsplash API error ${res.status}`);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`No results for: ${query}`);
  }

  // Selecciona una de las primeras (para variedad, puedes randomizar)
  const photo = data.results[0];
  return photo;
}

// Recomendado por la guía: cuando se “descarga”, disparar download_location :contentReference[oaicite:3]{index=3}
async function triggerDownload(downloadLocation) {
  try {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });
  } catch {
    // si falla, no bloqueamos el flujo
  }
}

async function downloadFile(fileUrl, outPath) {
  const res = await fetch(fileUrl);
  if (!res.ok) throw new Error(`Download error ${res.status} for ${fileUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());

  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  await fs.promises.writeFile(outPath, buf);
}

async function main() {
  console.log(`📁 Output: ${OUT_DIR}`);

  const manifest = [];

  for (let i = 0; i < IMAGES.length; i++) {
    const item = IMAGES[i];
    const outPath = path.join(OUT_DIR, item.file);

    console.log(`(${i + 1}/${IMAGES.length}) 🔎 ${item.q}`);

    try {
      const photo = await searchUnsplash(item.q);

      // URL de descarga (raw permite tamaño, pero “full” está bien)
      const downloadUrl = photo.urls?.full || photo.urls?.regular;
      if (!downloadUrl) throw new Error("No download URL");

      // Trigger download endpoint si está disponible
      if (photo.links?.download_location) {
        await triggerDownload(photo.links.download_location);
      }

      await downloadFile(downloadUrl, outPath);

      console.log(`   ✅ Saved -> /subservices/${item.file}`);
      manifest.push({
        local: `/subservices/${item.file.replace(/\\/g, "/")}`,
        query: item.q,
        unsplash_id: photo.id,
        photographer: photo.user?.name || null,
        source_page: photo.links?.html || null,
      });
    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}`);
    }
  }

  const manifestPath = path.resolve(process.cwd(), "public", "subservices", "manifest.json");
  await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`\n📄 Manifest generado: /subservices/manifest.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
