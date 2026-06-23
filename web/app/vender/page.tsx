import type { Metadata } from "next";
import { InnerHero } from "@/components/InnerHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Vender tu vivienda en Sant Quirze del Vallès",
  description: "Vende tu vivienda con un proceso claro: valoración, reportaje, publicación, visitas, negociación y venta. Acompañamiento experto y local.",
  alternates: { canonical: "/vender" },
};

const STEPS = [
  { n: "1", t: "Valoración", d: "Estudiamos tu vivienda y el mercado para fijar el mejor precio." },
  { n: "2", t: "Reportaje fotográfico", d: "Fotografía profesional que realza tu propiedad." },
  { n: "3", t: "Publicación", d: "Difusión en los principales portales y nuestra red." },
  { n: "4", t: "Visitas", d: "Gestionamos y filtramos las visitas por ti." },
  { n: "5", t: "Negociación", d: "Negociamos para conseguir las mejores condiciones." },
  { n: "6", t: "Venta", d: "Te acompañamos hasta la firma con total seguridad." },
];

export default function VenderPage() {
  return (
    <>
      <InnerHero eyebrow="Propietarios" title="¿Quieres vender tu vivienda?"
        subtitle="Te acompañamos en cada paso para vender al mejor precio, sin complicaciones." />

      <section className="container-x py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-black/5 bg-white p-7 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-xl font-semibold text-accent">{s.n}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-x grid grid-cols-1 gap-12 py-20 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">Empieza hoy</p>
            <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Cuéntanos sobre tu vivienda</h2>
            <p className="mt-4 max-w-md text-ink/65">Te haremos una valoración gratuita y sin compromiso. Recibirás una respuesta en menos de 24 h.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-card sm:p-8">
              <ContactForm source="vender" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
