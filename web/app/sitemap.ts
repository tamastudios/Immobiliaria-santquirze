import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/api";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const staticRoutes = ["", "/comprar", "/alquilar", "/vender", "/valoracion", "/nosotros", "/contacto"];
  const now = new Date();

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.url}${r}`, lastModified: now,
      changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.8,
    })),
    ...slugs.map((slug) => ({
      url: `${SITE.url}/propiedad/${slug}`, lastModified: now,
      changeFrequency: "weekly" as const, priority: 0.7,
    })),
  ];
}
