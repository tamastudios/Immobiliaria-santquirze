"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { SearchBar } from "../SearchBar";

// Hero "scrollytelling" estilo Apple: el vídeo avanza al hacer scroll hacia abajo
// y retrocede al subir. La sección es alta (260vh) y el vídeo queda fijo (sticky)
// mientras se "rebobina" según la posición del scroll.
const VIDEO_SRC = "https://assets.mixkit.co/videos/4010/4010-720.mp4"; // edificio (placeholder)

export function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const fade = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 1, 0]);
  const lift = useTransform(scrollYProgress, [0, 0.9], ["0%", "-12%"]);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  // Scrubbing del vídeo según el scroll (solo escritorio; en móvil va en bucle).
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;
    let raf = 0;
    let target = 0;
    const unsub = scrollYProgress.on("change", (v) => {
      if (video.duration) target = v * video.duration;
    });
    const loop = () => {
      if (video.duration) {
        const cur = video.currentTime;
        if (Math.abs(target - cur) > 0.01) {
          // Acercamiento suave al frame objetivo (scrubbing fluido).
          video.currentTime = cur + (target - cur) * 0.15;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { unsub(); cancelAnimationFrame(raf); };
  }, [scrollYProgress, isMobile]);

  return (
    <section ref={sectionRef} id="inicio" className="relative h-[260vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          autoPlay={isMobile}
          loop={isMobile}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/50 to-transparent" />

        <div className="container-x relative flex h-full flex-col justify-center pt-24">
          <motion.div style={{ opacity: fade, y: lift }}>
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/comprar" className="btn-accent">Ver propiedades</Link>
              <Link href="/valoracion" className="btn-ghost border-white/40 text-white hover:bg-white hover:text-primary">
                Solicitar valoración
              </Link>
            </div>
          </motion.div>

          <div className="mt-10 w-full max-w-4xl"><SearchBar variant="hero" /></div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
            <span className="scroll-hint block h-2 w-1 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    </section>
  );
}
