import { MapPinned, HeartHandshake, ShieldCheck, Route } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const REASONS = [
  { icon: MapPinned, title: "Especialistas en Sant Quirze", text: "Conocemos el mercado local como nadie." },
  { icon: HeartHandshake, title: "Trato cercano", text: "Nos implicamos en cada operación como si fuera nuestra." },
  { icon: ShieldCheck, title: "Propiedades verificadas", text: "Solo trabajamos con inmuebles de calidad." },
  { icon: Route, title: "Acompañamiento de principio a fin", text: "Te guiamos en todo el proceso, sin preocupaciones." },
];

export function WhyUs() {
  return (
    <section className="bg-primary">
      <div className="container-x py-20 sm:py-24">
        <Reveal>
          <p className="eyebrow mb-3">Por qué elegirnos</p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            La diferencia de trabajar con un equipo local
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="text-white">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-full border border-accent/40 text-accent">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
