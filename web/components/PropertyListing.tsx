import { getProperties, PropertyFilters } from "@/lib/api";
import { PropertyType } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { SearchBar } from "./SearchBar";
import { Reveal } from "./ui/Reveal";

export async function PropertyListing({
  operation, title, searchParams,
}: {
  operation: "venta" | "alquiler";
  title: string;
  searchParams: Record<string, string | undefined>;
}) {
  const filters: PropertyFilters = {
    operation,
    type: (searchParams.type as PropertyType) || undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    zone: searchParams.zone || undefined,
  };
  const properties = await getProperties(filters);

  return (
    <div className="bg-cream pb-20 pt-28">
      <div className="container-x">
        <p className="eyebrow mb-2">Inicio · {operation === "alquiler" ? "Alquiler" : "Comprar"}</p>
        <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h1>

        <div className="mt-6"><SearchBar variant="page" /></div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="mb-5 text-sm text-ink/60">{properties.length} propiedades encontradas</p>
            {properties.length === 0 ? (
              <div className="rounded-xl border border-black/5 bg-white p-10 text-center text-ink/60">
                No hay propiedades con esos filtros. Prueba a ampliar la búsqueda.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {properties.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.05}><PropertyCard property={p} /></Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Mapa (placeholder elegante; se conecta Google Maps API en producción) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 h-[600px] overflow-hidden rounded-xl border border-black/5 bg-white shadow-card">
              <div className="relative h-full w-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center">
                <div className="absolute inset-0 bg-primary/10" />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/95 p-3 text-center text-xs text-ink/60">
                  Mapa interactivo (Google Maps API) — se activa al conectar la clave en producción.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
