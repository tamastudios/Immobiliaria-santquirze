"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// NOTA: cifras de ejemplo — confírmame las reales de la inmobiliaria y las cambio.
const STATS = [
  { value: 15, suffix: "+", label: "Años de experiencia" },
  { value: 500, suffix: "+", label: "Operaciones cerradas" },
  { value: 98, suffix: "%", label: "Clientes satisfechos" },
  { value: 4.9, suffix: "★", label: "Valoración media", decimals: 1 },
];

function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{n.toFixed(decimals)}</span>;
}

export function Stats() {
  return (
    <section className="bg-primary">
      <div className="container-x grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl font-semibold text-accent sm:text-5xl">
              <CountUp value={s.value} decimals={s.decimals ?? 0} />{s.suffix}
            </p>
            <p className="mt-2 text-sm text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
