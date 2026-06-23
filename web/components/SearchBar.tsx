"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const router = useRouter();
  const [operation, setOperation] = useState("");
  const [type, setType] = useState("");
  const [zone, setZone] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (zone) params.set("zone", zone);
    if (maxPrice) params.set("maxPrice", maxPrice);
    const base = operation === "alquiler" ? "/alquilar" : "/comprar";
    router.push(`${base}?${params.toString()}`);
  }

  const box = variant === "hero"
    ? "bg-white/95 backdrop-blur shadow-soft"
    : "bg-white border border-black/5 shadow-card";

  return (
    <form onSubmit={submit} className={`grid grid-cols-2 gap-3 rounded-xl p-4 md:grid-cols-5 ${box}`}>
      <Field label="Ubicación">
        <select className="field" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="">Sant Quirze del Vallès</option>
          <option>Centre</option><option>Les Fonts</option><option>Can Pallàs</option>
          <option>Sant Quirze Parc</option><option>La Betzuca</option>
        </select>
      </Field>
      <Field label="Operación">
        <select className="field" value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="">Comprar</option>
          <option value="venta">Comprar</option>
          <option value="alquiler">Alquilar</option>
        </select>
      </Field>
      <Field label="Tipo de inmueble">
        <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Todos</option>
          <option value="piso">Piso</option><option value="casa">Casa</option>
          <option value="chalet">Chalet</option><option value="duplex">Dúplex</option>
          <option value="local">Local</option><option value="terreno">Terreno</option>
        </select>
      </Field>
      <Field label="Precio máx.">
        <select className="field" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Sin límite</option>
          <option value="200000">200.000 €</option><option value="400000">400.000 €</option>
          <option value="600000">600.000 €</option><option value="800000">800.000 €</option>
        </select>
      </Field>
      <div className="col-span-2 flex items-end md:col-span-1">
        <button className="btn-primary w-full"><Search className="h-4 w-4" /> Buscar</button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink/50">{label}</span>
      {children}
    </label>
  );
}
