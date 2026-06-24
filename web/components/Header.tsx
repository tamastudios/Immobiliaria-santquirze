"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./ui/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-header"
          : "bg-gradient-to-b from-black/40 to-transparent",
      )}
    >
      <div className={cn("container-x flex items-center justify-between transition-all duration-500", scrolled ? "h-16" : "h-20")}>
        <div className={scrolled ? "" : "[&_*]:!text-white [&_span.border-accent]:!text-accent [&_span.border-accent]:!border-accent"}>
          <Logo light={!scrolled} />
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link text-sm font-medium transition-colors hover:text-accent",
                scrolled ? "text-primary" : "text-white/90",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${SITE.phoneRaw}`} className="btn-accent hidden sm:inline-flex">
            <Phone className="h-4 w-4" /> Llámanos
          </a>
          <button
            className={cn("lg:hidden", scrolled ? "text-primary" : "text-white")}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-primary hover:bg-cream">
                {item.label}
              </Link>
            ))}
            <a href={`tel:${SITE.phoneRaw}`} className="btn-accent mt-2">
              <Phone className="h-4 w-4" /> Llámanos
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
