import type { Metadata } from "next";
import { Suspense } from "react";
import { getProperties } from "@/lib/api";
import { ListingClient } from "@/components/ListingClient";

export const metadata: Metadata = {
  title: "Comprar vivienda en Sant Quirze del Vallès",
  description: "Casas, pisos y chalets en venta en Sant Quirze del Vallès. Encuentra tu próxima vivienda con expertos locales.",
  alternates: { canonical: "/comprar" },
};

export default async function ComprarPage() {
  const properties = await getProperties({ operation: "venta" });
  return (
    <Suspense>
      <ListingClient operation="venta" title="Propiedades en venta" properties={properties} />
    </Suspense>
  );
}
