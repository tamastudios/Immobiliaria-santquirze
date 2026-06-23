// Capa de acceso a datos.
// Si STRAPI_URL está configurado y responde, usa Strapi (datos reales).
// Si no (backend apagado, sin configurar o vacío), usa los datos de ejemplo.
// Así la web NUNCA se queda en blanco, ni en una demo ni en desarrollo.
import { PROPERTIES, TESTIMONIALS } from "./properties";
import type { Operation, Property, PropertyType } from "./types";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export interface PropertyFilters {
  operation?: Operation;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  zone?: string;
  q?: string;
}

// ---- Strapi (v5) ----
function mapStrapiProperty(item: any): Property {
  const images: string[] = (item.images ?? [])
    .map((im: any) => (im?.url?.startsWith("http") ? im.url : `${STRAPI_URL}${im?.url ?? ""}`))
    .filter(Boolean);
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    operation: item.operation,
    type: item.propertyType,
    status: item.status,
    tag: item.tag ?? undefined,
    price: item.price,
    location: item.location ?? "",
    city: item.city ?? "Sant Quirze del Vallès",
    bedrooms: item.bedrooms ?? 0,
    bathrooms: item.bathrooms ?? 0,
    area: item.area ?? 0,
    reference: item.reference ?? "",
    description: item.description ?? "",
    features: Array.isArray(item.features) ? item.features : [],
    equipment: Array.isArray(item.equipment) ? item.equipment : [],
    energyCertificate: item.energyCertificate ?? "en trámite",
    lat: item.lat ?? 41.535,
    lng: item.lng ?? 2.081,
    images: images.length ? images : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=70"],
    featured: !!item.featured,
  };
}

let cache: { at: number; data: Property[] } | null = null;

async function loadProperties(): Promise<Property[]> {
  if (!STRAPI_URL) return PROPERTIES;
  if (cache && Date.now() - cache.at < 30_000) return cache.data;
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/properties?populate=images&pagination[pageSize]=100&sort=createdAt:desc`,
      {
        headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json = await res.json();
    const list: Property[] = (json.data ?? []).map(mapStrapiProperty);
    if (list.length === 0) return PROPERTIES; // sin propiedades aún → demo
    cache = { at: Date.now(), data: list };
    return list;
  } catch {
    return PROPERTIES; // backend caído → no romper la web
  }
}

function applyFilters(list: Property[], f: PropertyFilters): Property[] {
  let r = [...list];
  if (f.operation) r = r.filter((p) => p.operation === f.operation);
  if (f.type) r = r.filter((p) => p.type === f.type);
  if (f.minPrice) r = r.filter((p) => p.price >= f.minPrice!);
  if (f.maxPrice) r = r.filter((p) => p.price <= f.maxPrice!);
  if (f.bedrooms) r = r.filter((p) => p.bedrooms >= f.bedrooms!);
  if (f.bathrooms) r = r.filter((p) => p.bathrooms >= f.bathrooms!);
  if (f.minArea) r = r.filter((p) => p.area >= f.minArea!);
  if (f.zone) r = r.filter((p) => p.location.toLowerCase().includes(f.zone!.toLowerCase()));
  if (f.q) {
    const q = f.q.toLowerCase();
    r = r.filter((p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
  }
  return r;
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  return applyFilters(await loadProperties(), filters);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const list = await loadProperties();
  const featured = list.filter((p) => p.featured);
  return (featured.length ? featured : list).slice(0, 4);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return (await loadProperties()).find((p) => p.slug === slug) ?? null;
}

export async function getSimilarProperties(slug: string): Promise<Property[]> {
  const list = await loadProperties();
  const current = list.find((p) => p.slug === slug);
  if (!current) return [];
  return list.filter((p) => p.slug !== slug && p.operation === current.operation).slice(0, 3);
}

export async function getAllSlugs(): Promise<string[]> {
  return (await loadProperties()).map((p) => p.slug);
}

export function getTestimonials() {
  return TESTIMONIALS;
}
