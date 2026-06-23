import type { Metadata } from "next";
import { InnerHero } from "@/components/InnerHero";
import { ValuationForm } from "@/components/ValuationForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Valoración gratuita de tu vivienda",
  description: "Solicita una valoración gratuita y profesional de tu vivienda en Sant Quirze del Vallès. Sin compromiso.",
  alternates: { canonical: "/valoracion" },
};

export default function ValoracionPage() {
  return (
    <>
      <InnerHero eyebrow="Sin compromiso" title="Valoración gratuita de tu vivienda"
        subtitle="Conoce el valor real de tu propiedad en el mercado actual de Sant Quirze del Vallès." />
      <section className="container-x py-16">
        <Reveal className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-card sm:p-8">
            <ValuationForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
