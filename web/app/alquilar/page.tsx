import type { Metadata } from "next";
import { Suspense } from "react";
import { getProperties } from "@/lib/api";
import { ListingClient } from "@/components/ListingClient";

export const metadata: Metadata = {
  title: "Alquilar vivienda en Sant Quirze del Vallès",
  description: "Pisos, casas y chalets en alquiler en Sant Quirze del Vallès. Disponibilidad actualizada y trato cercano.",
  alternates: { canonical: "/alquilar" },
};

export default async function AlquilarPage() {
  const properties = await getProperties({ operation: "alquiler" });
  return (
    <Suspense>
      <ListingClient operation="alquiler" title="Propiedades en alquiler" properties={properties} />
    </Suspense>
  );
}
