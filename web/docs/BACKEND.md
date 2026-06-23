# Fase 2 — Backend, panel de administración y CRM

El frontend está desacoplado: lee todo por `lib/api.ts`. Aquí está el plan para el backend
real sin reescribir nada del frontend.

## 1. Strapi CMS + PostgreSQL
Servidor Strapi (Node) con base de datos PostgreSQL. Tipos de contenido:

### Property (Propiedad)
`title, slug, operation(venta|alquiler), type(piso|casa|chalet|duplex|local|terreno),
status(disponible|reservado|vendido|alquilado|destacado|exclusiva), tag(nuevo|rebajado|exclusiva|vendido|reservado),
price, location, city, bedrooms, bathrooms, area, reference, description(rich text),
features(json), equipment(json), energyCertificate, lat, lng, images(media múltiple → Cloudinary),
featured(bool), seoTitle, seoDescription`

### Lead (CRM)
`fecha, nombre, email, telefono, origen, propiedad(relación), estado(nuevo|contactado|visita|negociacion|cerrado|perdido), notas`

### Otros
`Testimonial`, `BlogPost (title, slug, cover, body, category, seo)`, `TeamMember`.

## 2. Conectar el frontend (cambio mínimo)
En `lib/api.ts`, sustituir el mock por fetch a Strapi:
```ts
const r = await fetch(`${process.env.STRAPI_URL}/api/properties?populate=*&filters[...]`,
  { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }, next: { revalidate: 60 } });
```
Mapear la respuesta al tipo `Property`. Ningún componente cambia.

## 3. Panel de administración
Strapi ya trae panel admin con **roles y permisos** (admin / agente / editor):
crear, editar, eliminar, duplicar y cambiar estado de propiedades; gestionar imágenes,
blog, testimonios, usuarios; ver y **exportar leads** (CSV). Para el cliente, el panel de
Strapi cubre el 100% del CRUD pedido sin desarrollo extra.

## 4. Cloudinary (imágenes)
Plugin `@strapi/provider-upload-cloudinary`. Las fotos se suben optimizadas y se sirven por CDN
con transformaciones (tamaños responsive). El frontend ya usa `next/image` con el dominio de Cloudinary
permitido en `next.config.js`.

## 5. Leads → notificación
`app/api/leads/route.ts` ya valida y sanitiza. Añadir:
1. `POST` a Strapi `/api/leads` (crea el lead en el CRM).
2. Email de aviso al equipo con **Resend** (`LEADS_NOTIFY_EMAIL`).

## 6. Google Maps
`@vis.gl/react-google-maps`. Sustituir los placeholders de mapa (listado y ficha) por un
`<Map>` centrado en `lat/lng`. Clave en `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

## 7. Seguridad
- **Rate limiting** en `/api/leads` (p.ej. Upstash Ratelimit) para evitar spam.
- Validación y **sanitización** en servidor (ya iniciada con regex/longitudes).
- Honeypot + (opcional) hCaptcha en formularios.
- Strapi gestiona auth (JWT), CORS y permisos por rol.
- Cabeceras de seguridad (CSP, X-Frame-Options) en `next.config.js`.

## 8. Despliegue
- **Frontend** → Vercel (build ya verificado).
- **Strapi + PostgreSQL** → Railway / Render / VPS.
- **Imágenes** → Cloudinary.
- `revalidate` o webhooks de Strapi para refrescar el contenido al publicar.

## Orden recomendado
1. Levantar Strapi + Postgres con los tipos `Property` y `Lead`.
2. Conectar `lib/api.ts` (propiedades) → adiós a los datos de ejemplo.
3. Cargar propiedades reales con fotos (Cloudinary).
4. Conectar leads (Strapi + Resend).
5. Activar Google Maps.
6. Endurecer seguridad y desplegar.
