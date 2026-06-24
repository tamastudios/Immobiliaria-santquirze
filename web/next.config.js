/** @type {import('next').NextConfig} */

// Cuando EXPORT_MODE=true (build para GitHub Pages) genera una web estática.
// En desarrollo y en Vercel (servidor), EXPORT_MODE no está → app dinámica normal.
const isExport = process.env.EXPORT_MODE === "true";
const repo = "Immobiliaria-santquirze"; // nombre del repo = ruta en GitHub Pages

const nextConfig = {
  images: {
    unoptimized: isExport,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  ...(isExport
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
};

module.exports = nextConfig;
