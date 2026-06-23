"use client";
import { useState } from "react";

export function ValuationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "valoracion" }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok"); e.currentTarget.reset();
    } catch { setStatus("error"); }
  }

  if (status === "ok") {
    return (
      <div className="py-6 text-center">
        <p className="font-display text-2xl font-semibold text-primary">¡Solicitud recibida! 🎉</p>
        <p className="mt-2 text-ink/60">Un asesor te contactará en menos de 24 horas con la valoración de tu vivienda.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input name="nombre" required placeholder="Nombre*" className="field" />
        <input name="telefono" required placeholder="Teléfono*" className="field" />
      </div>
      <input name="email" type="email" required placeholder="Email*" className="field" />
      <input name="direccion" required placeholder="Dirección de la vivienda*" className="field" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select name="tipo" className="field" defaultValue="">
          <option value="" disabled>Tipo de inmueble*</option>
          <option>Piso</option><option>Casa</option><option>Chalet</option>
          <option>Dúplex</option><option>Local</option><option>Terreno</option>
        </select>
        <input name="metros" type="number" placeholder="Metros cuadrados" className="field" />
      </div>
      <textarea name="mensaje" rows={3} placeholder="Comentarios (estado, reformas, extras…)" className="field" />
      <label className="block">
        <span className="mb-1 block text-xs font-semibold text-ink/60">Fotos (opcional)</span>
        <input
          name="fotos" type="file" multiple accept="image/*"
          className="block w-full rounded-md border border-black/10 bg-white p-2 text-xs text-ink/70
                     file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2
                     file:text-xs file:font-semibold file:text-white"
        />
      </label>
      <button disabled={status === "sending"} className="btn-accent w-full">
        {status === "sending" ? "Enviando…" : "Solicitar valoración gratuita"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">No se pudo enviar. Inténtalo de nuevo.</p>}
      <p className="text-[11px] leading-relaxed text-ink/45">
        Las fotos se procesarán al conectar el almacenamiento (Cloudinary) en producción. Tus datos solo se usan para la valoración.
      </p>
    </form>
  );
}
