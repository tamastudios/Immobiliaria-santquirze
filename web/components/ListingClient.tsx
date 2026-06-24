"use client";
import { useSearchParams } from "next/navigation";
import { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { SearchBar } from "./SearchBar";
import { Reveal } from "./ui/Reveal";

// Listado con filtrado en el navegador (compatible con export estático / GitHub Pages).
export function ListingClient({
  properties, operation, title,
}: { properties: Property[]; operation: "venta" | "alquiler"; title: string }) {
  const sp = useSearchParams();
  const type = sp.get("type") ?? "";
  const zone = sp.get("zone") ?? "";
  const maxPrice = sp.get("maxPrice") ? Number(sp.get("maxPrice")) : 0;

  const filtered = properties.filter((p) => {
    if (type && p.type !== type) return false;
    if (zone && !p.location.toLowerCase().includes(zone.toLowerCase())) return false;
    if (maxPrice && p.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="bg-cream pb-20 pt-28">
      <div className="container-x">
        <p className="eyebrow mb-2">Inicio · {operation === "alquiler" ? "Alquiler" : "Comprar"}</p>
        <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h1>

        <div className="mt-6"><SearchBar variant="page" /></div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="mb-5 text-sm text-ink/60">{filtered.length} propiedades encontradas</p>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-black/5 bg-white p-10 text-center text-ink/60">
                No hay propiedades con esos filtros. Prueba a ampliar la búsqueda.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.05}><PropertyCard property={p} /></Reveal>
                ))}
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 h-[600px] overflow-hidden rounded-xl border border-black/5 bg-white shadow-card">
              <div className="relative h-full w-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center">
                <div className="absolute inset-0 bg-primary/10" />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 p-3 text-center text-xs text-ink/60">
                  Mapa interactivo (Google Maps) — se activa en la versión con servidor.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
