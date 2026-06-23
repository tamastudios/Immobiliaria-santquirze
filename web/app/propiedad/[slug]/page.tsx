import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BedDouble, Bath, Maximize, MapPin, Phone, MessageCircle, Hash, Zap } from "lucide-react";
import { getAllSlugs, getPropertyBySlug, getSimilarProperties } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { SITE, waLink } from "@/lib/site";
import { PropertyGallery } from "@/components/PropertyGallery";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { ContactForm } from "@/components/ContactForm";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) return { title: "Propiedad no encontrada" };
  return {
    title: `${p.title} · ${formatPrice(p.price, p.operation)}`,
    description: p.description.slice(0, 155),
    alternates: { canonical: `/propiedad/${p.slug}` },
    openGraph: { title: p.title, description: p.description.slice(0, 155), images: [p.images[0]] },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) notFound();
  const similar = await getSimilarProperties(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: p.title,
    description: p.description,
    image: p.images,
    address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: "Barcelona", addressCountry: "ES" },
  };

  return (
    <div className="bg-cream pb-20 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x">
        <nav className="mb-4 text-sm text-ink/50">
          <Link href="/comprar" className="hover:text-accent-deep">Comprar</Link> · {p.city}
        </nav>

        <PropertyGallery images={p.images} title={p.title} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Columna principal */}
          <div>
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              {p.operation === "alquiler" ? "En alquiler" : "En venta"}
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">{p.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-ink/60"><MapPin className="h-4 w-4 text-accent-deep" /> {p.location}, {p.city}</p>
            <p className="mt-4 font-display text-3xl font-semibold text-primary">{formatPrice(p.price, p.operation)}</p>

            <div className="mt-6 flex flex-wrap gap-6 border-y border-black/5 py-5 text-sm text-ink/75">
              {p.bedrooms > 0 && <span className="flex items-center gap-2"><BedDouble className="h-5 w-5 text-secondary" /> {p.bedrooms} hab.</span>}
              <span className="flex items-center gap-2"><Bath className="h-5 w-5 text-secondary" /> {p.bathrooms} baños</span>
              <span className="flex items-center gap-2"><Maximize className="h-5 w-5 text-secondary" /> {p.area} m²</span>
              <span className="flex items-center gap-2"><Hash className="h-5 w-5 text-secondary" /> Ref. {p.reference}</span>
              <span className="flex items-center gap-2"><Zap className="h-5 w-5 text-secondary" /> Cert. {p.energyCertificate}</span>
            </div>

            <section className="mt-8">
              <h2 className="font-display text-2xl font-semibold text-primary">Descripción</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{p.description}</p>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-primary">Características</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink/70">
                  {p.features.map((f) => <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> {f}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-primary">Equipamiento</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink/70">
                  {p.equipment.map((f) => <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> {f}</li>)}
                </ul>
              </div>
            </section>

            <section className="mt-10"><MortgageCalculator defaultPrice={p.operation === "venta" ? p.price : 250000} /></section>

            {/* Mapa */}
            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-primary">Ubicación</h2>
              <div className="mt-3 h-72 overflow-hidden rounded-xl border border-black/5 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=60')] bg-cover bg-center">
                <div className="grid h-full place-items-center bg-primary/10">
                  <span className="rounded-lg bg-white/95 px-4 py-2 text-xs text-ink/60">Google Maps — se activa con la clave en producción</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar contacto */}
          <aside>
            <div className="sticky top-24 rounded-xl border border-black/5 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl font-semibold text-primary">¿Te interesa esta propiedad?</h3>
              <p className="mt-1 text-sm text-ink/55">Déjanos tus datos y te contactamos.</p>
              <div className="mt-4"><ContactForm source="propiedad" propertyRef={p.reference} compact /></div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={`tel:${SITE.phoneRaw}`} className="btn-ghost"><Phone className="h-4 w-4" /> Llamar</a>
                <a href={waLink(`Hola, me interesa la propiedad ${p.reference} (${p.title}).`)} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-primary">Propiedades similares</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => <PropertyCard key={s.id} property={s} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
