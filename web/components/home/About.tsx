import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";

export function About() {
  return (
    <section id="nosotros" className="container-x grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 sm:py-24">
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=70"
            alt="Oficina de Immobiliària Sant Quirze" fill className="object-cover" />
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="eyebrow mb-3">Sobre nosotros</p>
        <h2 className="font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
          Conocemos Sant Quirze porque trabajamos aquí cada día
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink/65">
          Somos una inmobiliaria local con años de experiencia en el mercado. Nuestro compromiso es ofrecer
          un servicio cercano, transparente y profesional para que tomes siempre la mejor decisión.
        </p>
        <Link href="/nosotros" className="btn-accent mt-7">Conócenos mejor</Link>
      </Reveal>
    </section>
  );
}
