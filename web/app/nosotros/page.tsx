import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { HeartHandshake, ShieldCheck, MapPinned } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Conoce a Immobiliària Sant Quirze: una inmobiliaria local con años de experiencia y un trato cercano y transparente.",
  alternates: { canonical: "/nosotros" },
};

const VALUES = [
  { icon: HeartHandshake, t: "Cercanía", d: "Te tratamos como nos gustaría que nos trataran a nosotros." },
  { icon: ShieldCheck, t: "Transparencia", d: "Información clara y honesta en cada paso del proceso." },
  { icon: MapPinned, t: "Mercado local", d: "Conocemos Sant Quirze del Vallès al detalle." },
];

const TIMELINE = [
  { y: "2009", t: "Nacemos en Sant Quirze", d: "Abrimos nuestra oficina con una idea: un trato diferente." },
  { y: "2015", t: "Referentes locales", d: "Nos consolidamos como inmobiliaria de confianza del municipio." },
  { y: "2021", t: "Servicio integral", d: "Ampliamos servicios: valoración, alquiler y asesoramiento." },
  { y: "2026", t: "Experiencia digital", d: "Damos el salto a una plataforma moderna para nuestros clientes." },
];

export default function NosotrosPage() {
  return (
    <>
      <InnerHero eyebrow="Sobre nosotros" title="Conocemos Sant Quirze porque trabajamos aquí cada día" />

      <section className="container-x grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
            <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=70" alt="Equipo" fill className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl font-semibold text-primary">Nuestra historia</h2>
          <p className="mt-4 leading-relaxed text-ink/65">
            Somos una inmobiliaria local con años de experiencia en el mercado de Sant Quirze del Vallès.
            Nacimos con el compromiso de ofrecer un servicio cercano, transparente y profesional, y desde
            entonces hemos ayudado a cientos de familias a comprar, vender y alquilar su vivienda.
          </p>
          <p className="mt-4 leading-relaxed text-ink/65">
            Nuestro mayor valor es la confianza que depositan en nosotros nuestros clientes, muchos de los
            cuales nos recomiendan a familiares y amigos.
          </p>
        </Reveal>
      </section>

      <section className="bg-cream py-20">
        <div className="container-x">
          <h2 className="text-center font-display text-3xl font-semibold text-primary">Nuestros valores</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="rounded-xl bg-white p-7 text-center shadow-card">
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-cream text-secondary"><v.icon className="h-6 w-6" /></div>
                  <h3 className="font-display text-lg font-semibold text-primary">{v.t}</h3>
                  <p className="mt-2 text-sm text-ink/60">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="text-center font-display text-3xl font-semibold text-primary">Nuestra trayectoria</h2>
        <div className="mx-auto mt-10 max-w-2xl">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.y} delay={i * 0.05}>
              <div className="flex gap-5 border-l-2 border-accent/30 pb-8 pl-6 last:pb-0">
                <div className="-ml-[33px] mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-accent text-[10px] font-bold text-primary">●</div>
                <div>
                  <p className="font-display text-xl font-semibold text-primary">{item.y} · {item.t}</p>
                  <p className="mt-1 text-sm text-ink/60">{item.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
