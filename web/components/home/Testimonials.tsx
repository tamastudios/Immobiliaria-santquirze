"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/properties";

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-cream">
      <div className="container-x py-20 sm:py-24">
        <p className="eyebrow mb-3 text-center">Testimonios</p>
        <h2 className="mb-12 text-center font-display text-3xl font-semibold text-primary sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>

        <div className="relative mx-auto min-h-[180px] max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: TESTIMONIALS[i].rating }).map((_, k) => (
                  <Star key={k} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="font-display text-xl italic leading-relaxed text-primary sm:text-2xl">
                “{TESTIMONIALS[i].text}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-ink/70">— {TESTIMONIALS[i].name}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Testimonio ${k + 1}`}
              className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-accent" : "w-2 bg-primary/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
