import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";

export function SellBlock() {
  return (
    <section className="bg-cream">
      <div className="container-x grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 sm:py-24">
        <Reveal>
          <p className="eyebrow mb-3">Propietarios</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
            ¿Quieres vender o alquilar tu propiedad?
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
            Te ayudamos a valorar tu vivienda, preparar la publicación, encontrar compradores solventes
            y acompañarte en todo el proceso, con la tranquilidad de un equipo experto y local.
          </p>
          <Link href="/valoracion" className="btn-accent mt-7">Solicitar valoración gratuita</Link>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=70"
              alt="Interior de vivienda" fill className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
