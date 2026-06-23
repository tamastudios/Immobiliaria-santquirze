import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "@/lib/api";
import { PropertyCard } from "../PropertyCard";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties();
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Selección" title="Propiedades destacadas"
          desc="Una selección de viviendas exclusivas en Sant Quirze del Vallès y alrededores." />
        <Link href="/comprar" className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-accent-deep sm:flex">
          Ver todas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {properties.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <PropertyCard property={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
