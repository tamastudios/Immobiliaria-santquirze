import type { Metadata } from "next";
import { InnerHero } from "@/components/InnerHero";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con Immobiliària Sant Quirze. Teléfono 93 721 63 00, info@immosq.com, Avgda. Pau Casals 4, Sant Quirze del Vallès.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <InnerHero eyebrow="Contacto" title="Estamos aquí para ayudarte"
        subtitle="Llámanos, escríbenos o ven a vernos. Te atenderemos encantados." />
      <ContactSection />
    </>
  );
}
