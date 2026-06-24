// =============================================================
// Importador masivo de propiedades a Strapi.
// Lee un JSON con propiedades, sube las fotos (desde URL) y crea cada
// propiedad en el panel. Pensado para cargar de golpe muchos inmuebles
// (p. ej. el feed de Inmovilla, una vez convertido a este formato).
//
// USO:
//   1) En el panel de Strapi: Settings > API Tokens > Create new API Token
//      - Name: import ; Token type: Full access ; Duration: 90 days
//      - Copia el token.
//   2) Ejecuta (en esta carpeta tools/):
//      STRAPI_URL=https://immosq-backend.onrender.com \
//      STRAPI_TOKEN=el_token \
//      node import-properties.mjs properties.json
//
//   (En Windows PowerShell:
//      $env:STRAPI_URL="https://immosq-backend.onrender.com"
//      $env:STRAPI_TOKEN="el_token"
//      node import-properties.mjs properties.json )
//
// Requiere Node 18+ (usa fetch/FormData/Blob nativos). Sin dependencias.
// =============================================================
import { readFileSync } from "node:fs";

const STRAPI_URL = process.env.STRAPI_URL;
const TOKEN = process.env.STRAPI_TOKEN;
const FILE = process.argv[2] || "properties.json";

if (!STRAPI_URL || !TOKEN) {
  console.error("Falta STRAPI_URL o STRAPI_TOKEN en el entorno. Ver instrucciones arriba.");
  process.exit(1);
}

const auth = { Authorization: `Bearer ${TOKEN}` };
const slugify = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Descarga una imagen por URL y la sube a Strapi. Devuelve su id (o null).
async function uploadImageFromUrl(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`descarga ${res.status}`);
    const blob = await res.blob();
    const form = new FormData();
    const name = url.split("/").pop()?.split("?")[0] || "foto.jpg";
    form.append("files", blob, name);
    const up = await fetch(`${STRAPI_URL}/api/upload`, { method: "POST", headers: auth, body: form });
    if (!up.ok) throw new Error(`upload ${up.status}`);
    const data = await up.json();
    return data?.[0]?.id ?? null;
  } catch (e) {
    console.warn(`   ⚠ Foto no subida (${url}): ${e.message}`);
    return null;
  }
}

async function createProperty(p, i) {
  // Subir fotos (si hay URLs en imageUrls)
  const imageIds = [];
  for (const url of p.imageUrls ?? []) {
    const id = await uploadImageFromUrl(url);
    if (id) imageIds.push(id);
  }

  const data = {
    title: p.title,
    slug: p.slug || `${slugify(p.title)}-${p.reference || i}`,
    operation: p.operation || "venta",
    propertyType: p.propertyType || "piso",
    status: p.status || "disponible",
    tag: p.tag,
    price: p.price ?? 0,
    location: p.location || "",
    city: p.city || "Sant Quirze del Vallès",
    bedrooms: p.bedrooms ?? 0,
    bathrooms: p.bathrooms ?? 0,
    area: p.area ?? 0,
    reference: p.reference || "",
    description: p.description || "",
    features: p.features || [],
    equipment: p.equipment || [],
    energyCertificate: p.energyCertificate || "en trámite",
    lat: p.lat ?? 41.535,
    lng: p.lng ?? 2.081,
    featured: !!p.featured,
    ...(imageIds.length ? { images: imageIds } : {}),
  };

  const res = await fetch(`${STRAPI_URL}/api/properties`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`crear ${res.status}: ${txt.slice(0, 200)}`);
  }
}

async function main() {
  const list = JSON.parse(readFileSync(FILE, "utf8"));
  console.log(`Importando ${list.length} propiedades a ${STRAPI_URL} …\n`);
  let ok = 0, fail = 0;
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    process.stdout.write(`[${i + 1}/${list.length}] ${p.title} … `);
    try {
      await createProperty(p, i);
      console.log("✓");
      ok++;
    } catch (e) {
      console.log("✗ " + e.message);
      fail++;
    }
  }
  console.log(`\nHecho. Creadas: ${ok}  ·  Fallidas: ${fail}`);
  console.log("Recuerda: en el panel, selecciona todas y pulsa 'Publish' para que se vean en la web.");
}

main();
