import type { Metadata } from "next";
import { PropertyListing } from "@/components/PropertyListing";

export const metadata: Metadata = {
  title: "Comprar vivienda en Sant Quirze del Vallès",
  description: "Casas, pisos y chalets en venta en Sant Quirze del Vallès. Encuentra tu próxima vivienda con expertos locales.",
  alternates: { canonical: "/comprar" },
};

export default async function ComprarPage({
  searchParams,
}: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <PropertyListing operation="venta" title="Propiedades en venta" searchParams={sp} />;
}
