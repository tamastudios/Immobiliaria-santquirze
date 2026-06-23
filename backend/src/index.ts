import type { Core } from "@strapi/strapi";

// Acciones que el rol PÚBLICO puede hacer sin autenticación:
// - leer propiedades y testimonios (para mostrarlos en la web)
// - crear leads (formularios de contacto/valoración)
const PUBLIC_ACTIONS = [
  "api::property.property.find",
  "api::property.property.findOne",
  "api::testimonial.testimonial.find",
  "api::testimonial.testimonial.findOne",
  "api::lead.lead.create",
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });
      if (!publicRole) return;

      for (const action of PUBLIC_ACTIONS) {
        const existing = await strapi
          .query("plugin::users-permissions.permission")
          .findOne({ where: { action, role: publicRole.id } });
        if (!existing) {
          await strapi
            .query("plugin::users-permissions.permission")
            .create({ data: { action, role: publicRole.id } });
          strapi.log.info(`[permisos] Habilitado para público: ${action}`);
        }
      }
    } catch (e) {
      strapi.log.warn("[permisos] No se pudieron aplicar permisos públicos automáticos: " + e);
    }
  },
};
