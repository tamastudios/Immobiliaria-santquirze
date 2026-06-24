"use client";
import { useState } from "react";

export function ContactForm({
  source = "contacto", propertyRef, compact = false,
}: { source?: string; propertyRef?: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Modo demo (GitHub Pages, sin servidor): simula el envío.
    if (process.env.NEXT_PUBLIC_STATIC_DEMO === "1") {
      setTimeout(() => setStatus("ok"), 600);
      return;
    }
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, propertyRef }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-6 text-center">
        <p className="font-display text-lg font-semibold text-primary">¡Gracias! Hemos recibido tu mensaje.</p>
        <p className="mt-1 text-sm text-ink/60">Te contactaremos lo antes posible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {!compact && (
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-ink/60">Trato preferido</span>
          <select name="trato" className="field"><option>Trato preferido</option><option>Email</option><option>Teléfono</option><option>WhatsApp</option></select>
        </label>
      )}
      <input name="nombre" required placeholder="Nombre" className="field" />
      <input name="telefono" required placeholder="Teléfono" className="field" />
      <input name="email" type="email" required placeholder="Email" className="field" />
      {!compact && (
        <textarea name="mensaje" rows={4} placeholder="Mensaje" className="field" />
      )}
      <button disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">No se pudo enviar. Inténtalo de nuevo.</p>}
      <p className="text-[11px] leading-relaxed text-ink/45">
        Al enviar aceptas nuestra política de privacidad. Tus datos se usan solo para responderte.
      </p>
    </form>
  );
}
