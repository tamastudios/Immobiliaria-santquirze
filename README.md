# Immobiliària Sant Quirze — Plataforma web

Plataforma inmobiliaria premium para **Immobiliària Sant Quirze** (Sant Quirze del Vallès, Barcelona).

## Estructura (monorepo)

```
/web        → Frontend Next.js 15 + React + TypeScript + Tailwind + Framer Motion
/backend    → CMS Strapi 5 (propiedades, leads/CRM, testimonios)
```

## Arranque en local

### 1. Backend (Strapi)
```bash
cd backend
cp .env.example .env        # genera/rellena las claves (ver nota abajo)
npm install
npm run develop             # http://localhost:1337/admin  (crea tu cuenta admin)
```
> Las claves de `.env` (APP_KEYS, secrets) son secretas y NO están en el repo.
> Para desarrollo, al ejecutar `npm run develop` por primera vez Strapi puede
> generarlas; si no, copia `.env.example` y rellena valores aleatorios.

### 2. Frontend (web)
```bash
cd web
cp .env.example .env.local  # STRAPI_URL=http://localhost:1337
npm install
npm run dev                 # http://localhost:3000
```

La web lee las propiedades de Strapi. Si el backend está apagado o vacío,
muestra datos de ejemplo automáticamente (nunca se queda en blanco).

## Despliegue
- **Frontend** → Vercel. Root Directory = `web`. Variables: `STRAPI_URL` (la del backend en producción).
- **Backend** → Railway / Render (Strapi + PostgreSQL). Cambia la BD de SQLite a Postgres en `backend/config/database.ts`.
- **Imágenes** → Cloudinary (plugin de upload en Strapi). Ver `web/docs/BACKEND.md`.

## Documentación
- `web/README.md` — detalle del frontend y lo que incluye.
- `web/docs/BACKEND.md` — plan de backend, CRM, Cloudinary, Google Maps y seguridad.
