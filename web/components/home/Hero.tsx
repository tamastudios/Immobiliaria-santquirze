"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { SearchBar } from "../SearchBar";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Parallax de scroll: la imagen se mueve y escala más lenta que el contenido → profundidad 3D.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Parallax con el ratón: la imagen se desplaza sutilmente → efecto 3D.
  const mx = useSpring(useMotionValue(0), { stiffness: 50, damping: 15 });
  const my = useSpring(useMotionValue(0), { stiffness: 50, damping: 15 });
  function onMouseMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 26);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 26);
  }
  function onMouseLeave() { mx.set(0); my.set(0); }

  return (
    <section
      ref={ref}
      id="inicio"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Capa de imagen: scroll (exterior) + ratón (interior), sobredimensionada para que no se vean bordes */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <motion.div style={{ x: mx, y: my }} className="absolute -inset-[8%]">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=75"
            alt="Vivienda premium en Sant Quirze del Vallès"
            fill priority
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/40 to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative flex min-h-[100svh] flex-col justify-center pt-24"
      >
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
          className="text-balance max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
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
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="scroll-hint block h-2 w-1 rounded-full bg-white/80" />
        </div>
      </div>
    </section>
  );
}
