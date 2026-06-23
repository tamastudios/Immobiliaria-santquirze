# Immobiliària Sant Quirze — Plataforma web

Web inmobiliaria premium para **Immobiliària Sant Quirze** (Sant Quirze del Vallès, Barcelona).
Diseño editorial inspirado en Engel & Völkers / Lucas Fox, con la identidad del mockup.

## Stack (fase 1 — construido y verificado)
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **TailwindCSS** (sistema de diseño con los colores y tipografías de marca)
- **Framer Motion** (animaciones de entrada, scroll, slider, lightbox)
- **next/font**: Playfair Display (títulos) + Montserrat (texto)
- SEO técnico: metadata dinámica, Open Graph, **JSON-LD** (RealEstateAgent + Residence), **sitemap.xml**, **robots.txt**, URLs amigables (`/propiedad/casa-sant-quirze-del-valles-560000`)

## Qué incluye (funciona ya, con datos de ejemplo)
- **Home**: hero fullscreen con buscador, propiedades destacadas, bloque vender, servicios, por qué elegirnos, nosotros, testimonios (slider), contacto.
- **Comprar / Alquilar**: listado con filtros (operación, tipo, zona, precio) + columna de mapa.
- **Ficha de propiedad**: galería tipo Airbnb con **lightbox**, características, equipamiento, **calculadora hipotecaria** en tiempo real, formulario de contacto, botones WhatsApp/llamada, propiedades similares.
- **Vender**: proceso visual de 6 pasos + formulario.
- **Valoración gratuita**: formulario avanzado (con subida de fotos).
- **Nosotros**: historia, valores, timeline.
- **Contacto**: datos + formulario + mapa.
- **Header sticky** (reduce altura + blur + sombra al hacer scroll), menú móvil.
- **Botones flotantes** globales: WhatsApp + barra inferior móvil (WhatsApp / Llamar / Valoración).
- **API de leads** (`/api/leads`) con validación → cada formulario crea un lead (CRM).
- Responsive completo y optimizado para Core Web Vitals.

## Arrancar en local
```bash
npm install
npm run dev      # http://localhost:3000
```
(Copia `.env.example` a `.env.local` cuando conectes servicios externos.)

## La "costura" para el backend
Todos los componentes leen datos a través de `lib/api.ts`. Hoy devuelve datos de ejemplo
(`lib/properties.ts`). Para conectar el backend real, **solo se cambia la implementación de
esas funciones** para llamar a Strapi — sin tocar ni un componente.

## Fase 2 — Backend y panel (plan)
Ver [docs/BACKEND.md](docs/BACKEND.md): Strapi CMS + PostgreSQL, Cloudinary (imágenes),
panel de administración (roles admin/agente/editor), CRM de leads, Google Maps API, y
seguridad (rate limiting, sanitización, validación en servidor).

## Notas honestas
- Las **fotos** son de stock (Unsplash) para la demo → se sustituyen por las reales (vía Cloudinary).
- El **mapa** muestra un marcador de posición → se activa con la clave de Google Maps.
- **Strapi/PostgreSQL/panel admin/auth** son un servidor aparte: están planificados en `docs/BACKEND.md`, no levantados todavía.
