import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // En Render se autodetecta la URL pública (RENDER_EXTERNAL_URL).
  url: env('PUBLIC_URL', env('RENDER_EXTERNAL_URL', undefined)),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
