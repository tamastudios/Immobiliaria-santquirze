import Link from "next/link";
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="container-x grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="[&_*]:!text-white [&_span.border-accent]:!text-accent">
            <Logo light />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Tu inmobiliaria de confianza en {SITE.city}. Cercanía, transparencia y experiencia local.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base text-white">Servicios</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/comprar" className="hover:text-accent">Comprar vivienda</Link></li>
            <li><Link href="/vender" className="hover:text-accent">Vender vivienda</Link></li>
            <li><Link href="/alquilar" className="hover:text-accent">Alquilar</Link></li>
            <li><Link href="/valoracion" className="hover:text-accent">Valoración gratuita</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base text-white">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/legal/aviso-legal" className="hover:text-accent">Aviso legal</Link></li>
            <li><Link href="/legal/privacidad" className="hover:text-accent">Política de privacidad</Link></li>
            <li><Link href="/legal/cookies" className="hover:text-accent">Política de cookies</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base text-white">Contacto</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> {SITE.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> {SITE.email}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> {SITE.addressFull}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={SITE.social.facebook} aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-primary"><Facebook className="h-4 w-4" /></a>
            <a href={SITE.social.instagram} aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href={SITE.social.linkedin} aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-primary"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
