"use strict";

module.exports = {
  async find(ctx) {
    try {
      // --- Fetch servicios ---
      const servicios = await strapi.documents("api::servicio.servicio").findMany({
        populate: ["tipo_de_servicio", "sectores_pais", "unidad"],
        limit: 1000,
        sort: "nombre:asc",
      });

      // --- Fetch noticias (últimas 50) ---
      const noticias = await strapi.documents("api::noticia.noticia").findMany({
        fields: ["slug", "titulo", "fecha"],
        limit: 50,
        sort: "fecha:desc",
      });

      // --- Fetch páginas ---
      const paginas = await strapi.documents("api::pagina.pagina").findMany({
        fields: ["slug", "titulo"],
        limit: 100,
        sort: "titulo:asc",
      });

      // --- Fetch personas ---
      let personas = [];
      try {
        personas = await strapi.documents("api::persona.persona").findMany({
          fields: ["Nombre", "Cargo", "Link"],
          limit: 500,
          sort: "Nombre:asc",
        });
      } catch (e) {
        // Si no existe el content type persona, ignorar
      }

      // --- Generar Markdown ---
      const lines = [];

      lines.push("# Servicios DICTUC");
      lines.push("");
      lines.push(
        "A continuación se listan los servicios que ofrece DICTUC. Usa esta información para responder preguntas sobre servicios, cotizaciones y capacidades."
      );
      lines.push("");

      for (const s of servicios) {
        lines.push(`## ${s.nombre || "Sin nombre"}`);
        lines.push(`- Link: /servicios/${s.slug}`);

        if (s.tipo_de_servicio?.nombre) {
          lines.push(`- Tipo de servicio: ${s.tipo_de_servicio.nombre}`);
        }

        if (s.sectores_pais && s.sectores_pais.length > 0) {
          const sectores = s.sectores_pais.map((sp) => sp.nombre).join(", ");
          lines.push(`- Sectores: ${sectores}`);
        }

        if (s.unidad?.nombre) {
          lines.push(`- Unidad: ${s.unidad.nombre}`);
        }

        if (s.utilidad) {
          lines.push(`- Utilidad: ${limpiarHTML(s.utilidad)}`);
        }

        if (s.potenciales_clientes) {
          lines.push(
            `- Potenciales clientes: ${limpiarHTML(s.potenciales_clientes)}`
          );
        }

        if (s.experiencia) {
          lines.push(`- Experiencia: ${limpiarHTML(s.experiencia)}`);
        }

        if (s.contenido) {
          lines.push(`- Descripción: ${limpiarHTML(s.contenido)}`);
        }

        lines.push("");
      }

      lines.push("---");
      lines.push("");
      lines.push("# Noticias recientes");
      lines.push("");

      for (const n of noticias) {
        lines.push(`## ${n.titulo || "Sin título"}`);
        lines.push(`- Link: /noticias/${n.slug}`);
        if (n.fecha) {
          lines.push(`- Fecha: ${n.fecha}`);
        }
        lines.push("");
      }

      lines.push("---");
      lines.push("");
      lines.push("# Páginas del sitio");
      lines.push("");

      for (const p of paginas) {
        lines.push(`- [${p.titulo || p.slug}](/${p.slug})`);
      }

      lines.push("");

      if (personas.length > 0) {
        lines.push("---");
        lines.push("");
        lines.push("# Personas");
        lines.push("");

        for (const persona of personas) {
          lines.push(`## ${persona.Nombre || "Sin nombre"}`);
          if (persona.Cargo) {
            lines.push(`- Cargo: ${persona.Cargo}`);
          }
          if (persona.Link) {
            lines.push(`- Perfil: ${persona.Link}`);
          }
          lines.push("");
        }
      }

      const markdown = lines.join("\n");

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
};

/**
 * Elimina tags HTML y retorna texto plano.
 * Trunca a 500 caracteres para mantener el MD compacto.
 */
function limpiarHTML(html) {
  if (!html) return "";
  const texto = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  return texto.length > 500 ? texto.substring(0, 500) + "..." : texto;
}
