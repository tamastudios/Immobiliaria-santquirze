"use client";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const show = (i: number) => { setIdx(i); setOpen(true); };
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl">
        <button onClick={() => show(0)} className="relative col-span-4 row-span-2 aspect-[16/10] sm:col-span-2">
          <Image src={images[0]} alt={title} fill className="object-cover transition hover:opacity-95" sizes="50vw" priority />
        </button>
        {images.slice(1, 5).map((src, i) => (
          <button key={i} onClick={() => show(i + 1)} className="relative hidden aspect-square sm:block">
            <Image src={src} alt={`${title} ${i + 2}`} fill className="object-cover transition hover:opacity-95" sizes="25vw" />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 grid place-items-center bg-black/50 text-sm font-semibold text-white">
                +{images.length - 5} fotos
              </span>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(false)}>
          <button className="absolute right-5 top-5 text-white/80 hover:text-white" onClick={() => setOpen(false)}><X className="h-7 w-7" /></button>
          <button className="absolute left-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft className="h-9 w-9" /></button>
          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[idx]} alt={title} fill className="object-contain" sizes="90vw" />
          </div>
          <button className="absolute right-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight className="h-9 w-9" /></button>
        </div>
      )}
    </>
  );
}
