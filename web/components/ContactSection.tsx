import { Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./ui/Reveal";

export function ContactSection() {
  return (
    <section id="contacto" className="container-x py-20 sm:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-3">Contacto</p>
          <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">¿Hablamos?</h2>
          <p className="mt-4 max-w-md text-base text-ink/65">
            Déjanos tus datos y te contactaremos lo antes posible. Estaremos encantados de ayudarte.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-secondary"><Phone className="h-5 w-5" /></span> {SITE.phone}</li>
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-secondary"><Mail className="h-5 w-5" /></span> {SITE.email}</li>
            <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-secondary"><MapPin className="h-5 w-5" /></span> {SITE.addressFull}</li>
          </ul>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-card sm:p-8">
            <ContactForm source="home" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
