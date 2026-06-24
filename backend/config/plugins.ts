import type { Core } from '@strapi/strapi';

// Si hay credenciales de Cloudinary en el entorno, las imágenes se guardan ahí
// (recomendado en producción: el disco de Render es efímero y las perdería).
// Si no, Strapi usa el almacenamiento local (válido para desarrollo).
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin =>
  env('CLOUDINARY_NAME')
    ? {
        upload: {
          config: {
            provider: 'cloudinary',
            providerOptions: {
              cloud_name: env('CLOUDINARY_NAME'),
              api_key: env('CLOUDINARY_KEY'),
              api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: { upload: {}, uploadStream: {}, delete: {} },
          },
        },
      }
    : {};

export default config;
