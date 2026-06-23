"use client";
import { Phone, MessageCircle, Calculator } from "lucide-react";
import Link from "next/link";
import { SITE, waLink } from "@/lib/site";

// Botones flotantes globales. En móvil aparecen abajo (bottom bar premium);
// en escritorio, el WhatsApp flota a la derecha.
export function FloatingButtons() {
  return (
    <>
      {/* WhatsApp flotante (todas las pantallas) */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 md:bottom-6"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Barra inferior móvil */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-black/5 bg-white/95 backdrop-blur md:hidden">
        <a href={waLink()} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-primary">
          <MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp
        </a>
        <a href={`tel:${SITE.phoneRaw}`} className="flex flex-col items-center gap-0.5 border-x border-black/5 py-2.5 text-[11px] font-medium text-primary">
          <Phone className="h-5 w-5 text-secondary" /> Llamar
        </a>
        <Link href="/valoracion" className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-primary">
          <Calculator className="h-5 w-5 text-accent-deep" /> Valoración
        </Link>
      </div>
    </>
  );
}
