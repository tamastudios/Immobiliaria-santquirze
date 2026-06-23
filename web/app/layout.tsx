import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { SITE } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"], variable: "--font-playfair", display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"], variable: "--font-montserrat", display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Inmobiliaria en ${SITE.city}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    `Compra, vende o alquila tu vivienda en ${SITE.city} con expertos locales. Propiedades exclusivas, valoración gratuita y un trato cercano y profesional.`,
  keywords: ["inmobiliaria Sant Quirze", "comprar casa Sant Quirze del Vallès", "pisos Sant Quirze", "vender vivienda Vallès", "valoración gratuita"],
  openGraph: {
    type: "website", locale: "es_ES", url: SITE.url, siteName: SITE.name,
    title: `${SITE.name} · Inmobiliaria en ${SITE.city}`,
    description: "Tu inmobiliaria de confianza en Sant Quirze del Vallès.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    image: `${SITE.url}/og.jpg`,
    "@id": SITE.url,
    url: SITE.url,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressRegion: "Barcelona",
      addressCountry: "ES",
    },
    areaServed: SITE.city,
  };

  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans pb-16 md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
