import { Home, Handshake, KeyRound, FileCheck2, Compass } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";

const SERVICES = [
  { icon: Home, title: "Comprar vivienda", text: "Te ayudamos a encontrar la casa perfecta para ti." },
  { icon: Handshake, title: "Venta de inmuebles", text: "Maximizamos el valor de tu vivienda y te acompañamos en todo el proceso." },
  { icon: KeyRound, title: "Alquileres", text: "Gestionamos el alquiler de tu propiedad con total seguridad." },
  { icon: FileCheck2, title: "Valoración gratuita", text: "Valoramos tu vivienda sin compromiso y de forma profesional." },
  { icon: Compass, title: "Asesoramiento", text: "Te asesoramos en cada paso, con cercanía y transparencia." },
];

export function Services() {
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHeading eyebrow="Qué hacemos" title="Servicios pensados para ti" center />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-black/5 bg-white p-6 text-center transition hover:shadow-card">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-cream text-secondary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
