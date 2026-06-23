"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SearchBar } from "../SearchBar";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=75"
        alt="Vivienda premium en Sant Quirze del Vallès"
        fill priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/20" />

      <div className="container-x relative flex min-h-[100svh] flex-col justify-center pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent"
        >
          Inmobiliaria local · Costa del Vallès
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
        >
          Tu inmobiliaria de confianza en Sant Quirze del Vallès
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-5 max-w-xl text-lg text-white/80"
        >
          Compra, vende o alquila tu vivienda con un equipo cercano, experto y especializado en el mercado local.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link href="/comprar" className="btn-accent">Ver propiedades</Link>
          <Link href="/valoracion" className="btn-ghost border-white/40 text-white hover:bg-white hover:text-primary">
            Solicitar valoración
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="mt-12 w-full max-w-4xl"
        >
          <SearchBar variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
