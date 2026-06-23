import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { Property, PropertyTag } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const TAG_STYLES: Record<PropertyTag, string> = {
  nuevo: "bg-secondary text-white",
  rebajado: "bg-accent text-primary",
  exclusiva: "bg-primary text-white",
  vendido: "bg-ink/80 text-white",
  reservado: "bg-secondary/90 text-white",
};
const TAG_LABEL: Record<PropertyTag, string> = {
  nuevo: "Nuevo", rebajado: "Rebajado", exclusiva: "Exclusiva", vendido: "Vendido", reservado: "Reservado",
};

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/propiedad/${property.slug}`}
      className="group block overflow-hidden rounded-xl border border-black/5 bg-white shadow-card transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        {property.tag && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${TAG_STYLES[property.tag]}`}>
            {TAG_LABEL[property.tag]}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-primary">
          {property.operation === "alquiler" ? "En alquiler" : "En venta"}
        </span>
      </div>

      <div className="p-5">
        <p className="font-display text-xl font-semibold text-primary">
          {formatPrice(property.price, property.operation)}
        </p>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink/60">
          <MapPin className="h-3.5 w-3.5 text-accent-deep" /> {property.location}, {property.city}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-4 text-sm text-ink/70">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-secondary" /> {property.bedrooms}</span>
          )}
          <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-secondary" /> {property.bathrooms}</span>
          <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-secondary" /> {property.area} m²</span>
        </div>

        <span className="mt-4 block w-full rounded-md border border-accent py-2 text-center text-sm font-semibold text-primary transition group-hover:bg-accent">
          Ver propiedad
        </span>
      </div>
    </Link>
  );
}
