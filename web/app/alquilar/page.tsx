import type { Metadata } from "next";
import { PropertyListing } from "@/components/PropertyListing";

export const metadata: Metadata = {
  title: "Alquilar vivienda en Sant Quirze del Vallès",
  description: "Pisos, casas y chalets en alquiler en Sant Quirze del Vallès. Disponibilidad actualizada y trato cercano.",
  alternates: { canonical: "/alquilar" },
};

export default async function AlquilarPage({
  searchParams,
}: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <PropertyListing operation="alquiler" title="Propiedades en alquiler" searchParams={sp} />;
}
