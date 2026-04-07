import type { Core } from "@strapi/strapi";

function limpiarHTML(html: string): string {
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

const service = ({ strapi }: { strapi: Core.Strapi }) => ({

  async generarMarkdown(): Promise<string> {
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
    let personas: any[] = [];
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
    const lines: string[] = [];

    lines.push("# Servicios DICTUC");
    lines.push("");
    lines.push(
      "A continuación se listan los servicios que ofrece DICTUC. Usa esta información para responder preguntas sobre servicios, cotizaciones y capacidades."
    );
    lines.push("");

    for (const s of servicios) {
      lines.push(`## ${s.nombre || "Sin nombre"}`);
      lines.push(`- Link: /servicios/${s.slug}`);

      if ((s as any).tipo_de_servicio?.nombre) {
        lines.push(`- Tipo de servicio: ${(s as any).tipo_de_servicio.nombre}`);
      }

      if ((s as any).sectores_pais && (s as any).sectores_pais.length > 0) {
        const sectores = (s as any).sectores_pais.map((sp: any) => sp.nombre).join(", ");
        lines.push(`- Sectores: ${sectores}`);
      }

      if ((s as any).unidad?.nombre) {
        lines.push(`- Unidad: ${(s as any).unidad.nombre}`);
      }

      if ((s as any).utilidad) {
        lines.push(`- Utilidad: ${limpiarHTML((s as any).utilidad)}`);
      }

      if ((s as any).potenciales_clientes) {
        lines.push(`- Potenciales clientes: ${limpiarHTML((s as any).potenciales_clientes)}`);
      }

      if ((s as any).experiencia) {
        lines.push(`- Experiencia: ${limpiarHTML((s as any).experiencia)}`);
      }

      if ((s as any).contenido) {
        lines.push(`- Descripción: ${limpiarHTML((s as any).contenido)}`);
      }

      lines.push("");
    }

    lines.push("---");
    lines.push("");
    lines.push("# Noticias recientes");
    lines.push("");

    for (const n of noticias) {
      lines.push(`## ${(n as any).titulo || "Sin título"}`);
      lines.push(`- Link: /noticias/${n.slug}`);
      if ((n as any).fecha) {
        lines.push(`- Fecha: ${(n as any).fecha}`);
      }
      lines.push("");
    }

    lines.push("---");
    lines.push("");
    lines.push("# Páginas del sitio");
    lines.push("");

    for (const p of paginas) {
      lines.push(`- [${(p as any).titulo || p.slug}](/${p.slug})`);
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

    return lines.join("\n");
  },
});

export default service;
