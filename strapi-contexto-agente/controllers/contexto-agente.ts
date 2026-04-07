import type { Core } from "@strapi/strapi";

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx) {
    try {
      const markdown = await strapi
        .service("api::contexto-agente.contexto-agente")
        .generarMarkdown();

      ctx.body = {
        data: {
          markdown,
        },
      };
    } catch (error) {
      strapi.log.error("Error generando contexto agente:", error);
      ctx.throw(500, "Error generando contexto del agente");
    }
  },
});

export default controller;
