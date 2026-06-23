"use client";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/utils";

export function MortgageCalculator({ defaultPrice = 300000 }: { defaultPrice?: number }) {
  const [price, setPrice] = useState(defaultPrice);
  const [down, setDown] = useState(Math.round(defaultPrice * 0.2));
  const [rate, setRate] = useState(3.2);
  const [years, setYears] = useState(30);

  const monthly = useMemo(() => {
    const principal = Math.max(price - down, 0);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }, [price, down, rate, years]);

  return (
    <div className="rounded-xl border border-black/5 bg-white p-6 shadow-card">
      <h3 className="font-display text-xl font-semibold text-primary">Calculadora hipotecaria</h3>
      <p className="mt-1 text-sm text-ink/55">Una estimación orientativa de tu cuota mensual.</p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Num label="Precio vivienda (€)" value={price} onChange={setPrice} step={5000} />
        <Num label="Entrada (€)" value={down} onChange={setDown} step={5000} />
        <Num label="Interés (%)" value={rate} onChange={setRate} step={0.1} />
        <Num label="Años" value={years} onChange={setYears} step={1} />
      </div>

      <div className="mt-6 rounded-lg bg-primary p-5 text-center text-white">
        <p className="text-xs uppercase tracking-wide text-white/60">Cuota mensual estimada</p>
        <p className="mt-1 font-display text-3xl font-semibold text-accent">
          {formatPrice(Math.round(monthly))}<span className="text-base text-white/70">/mes</span>
        </p>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink/45">
        Cálculo orientativo, no constituye una oferta financiera. Consulta condiciones con tu entidad.
      </p>
    </div>
  );
}

function Num({ label, value, onChange, step }: { label: string; value: number; onChange: (v: number) => void; step: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-ink/50">{label}</span>
      <input type="number" step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="field" />
    </label>
  );
}
