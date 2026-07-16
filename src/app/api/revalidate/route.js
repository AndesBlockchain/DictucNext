import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

// Mapea modelos de Strapi (singular) a los cache tags que genera
// tagFromEndpoint() en src/lib/strapi-fetcher.js (derivados del endpoint,
// en plural). El modelo no siempre coincide con el endpoint (ej:
// sector-pais → /api/sectores).
const MODEL_TO_TAGS = {
  "noticia": ["strapi-noticias"],
  // Las etiquetas viajan pobladas dentro de /api/noticias
  "etiqueta-noticia": ["strapi-noticias"],
  "servicio": ["strapi-servicios"],
  "pagina": ["strapi-paginas"],
  "sector-pais": ["strapi-sectores"],
  "tipo-de-servicio": ["strapi-tipo-de-servicios"],
  "unidad": ["strapi-unidades"],
  "carrusel": ["strapi-carruseles"],
  "menu-superior": ["strapi-menu-superiors"],
  "menu-secundario": ["strapi-menu-secundarios"],
  "menu-cajon": ["strapi-menu-cajons"],
  "menu-footer": ["strapi-menu-footers"],
  "menu-footer-superior": ["strapi-menu-footer-superiors"],
  "documento": ["strapi-documentos"],
  "tipo-de-contacto": ["strapi-tipos-de-contactos"],
  "agente": ["strapi-agente"],
};

// Tag global presente en todos los fetch de fetchFromStrapi: fallback
// cuando llega un modelo que no está en el mapa.
const GLOBAL_TAG = "strapi";

// Precalienta una ruta visitándola después de invalidar su caché.
// Fire-and-forget: no bloquea la respuesta al webhook.
function warmPath(origin, path) {
  const url = `${origin}${path}`;
  fetch(url).catch((err) =>
    console.warn(`[revalidate] warm failed for ${url}:`, err.message)
  );
}

// Rutas a precalentar según el modelo y el entry del webhook. Las que no
// se listan aquí quedan stale y se regeneran en su primera visita.
function getWarmPathsForModel(model, entry) {
  const slug = entry?.slug;
  switch (model) {
    case "noticia": {
      // URL real: /novedades/<etiqueta>/<slug> (una por etiqueta asociada)
      const etiquetas = (entry?.etiqueta_noticias || [])
        .map((e) => e?.slug)
        .filter(Boolean);
      return [
        ...(slug ? etiquetas.map((e) => `/novedades/${e}/${slug}`) : []),
        "/",
      ];
    }
    case "servicio":
      return [
        ...(slug ? [`/servicios/${slug}`] : []),
        "/servicios/todos-los-servicios",
        "/",
      ];
    case "sector-pais":
      return [...(slug ? [`/sectores-pais/${slug}`] : []), "/"];
    case "tipo-de-servicio":
      return [
        ...(slug ? [`/tipos-de-servicio/${slug}`] : []),
        "/servicios/todos-los-servicios",
      ];
    case "unidad":
      return [
        ...(slug ? [`/ejecutor/${slug}`] : []),
        "/servicios/todos-los-servicios",
      ];
    case "pagina":
      // La URL real vive bajo [seccion]/[...slug] y se compone desde los
      // menús, no desde el entry: no es derivable aquí.
      return ["/"];
    default:
      // Menús, carrusel, footer, etc.: aparecen en todas las páginas.
      return ["/"];
  }
}

export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!REVALIDATION_SECRET || token !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const origin = new URL(request.url).origin;

    // Formato legado: { "path": "/ruta" }
    if (body.path) {
      revalidatePath(body.path);
      warmPath(origin, body.path);
      console.log(`[revalidate] path=${body.path}`);
      return NextResponse.json({
        revalidated: true,
        paths: [body.path],
        model: null,
        timestamp: Date.now(),
      });
    }

    // Formato webhook nativo de Strapi: { event, model, entry: {...} }
    const model = body.model || null;
    let tags;
    if (model && MODEL_TO_TAGS[model]) {
      tags = MODEL_TO_TAGS[model];
    } else {
      tags = [GLOBAL_TAG];
      if (model) {
        console.warn(
          `[revalidate] modelo no mapeado "${model}": invalidando tag global "${GLOBAL_TAG}". Agregarlo a MODEL_TO_TAGS.`
        );
      }
    }

    for (const tag of tags) {
      revalidateTag(tag);
    }

    // El warming va DESPUÉS de revalidateTag: el fetch dispara la regeneración.
    const warmPaths = getWarmPathsForModel(model, body.entry);
    for (const path of warmPaths) {
      warmPath(origin, path);
    }

    console.log(
      `[revalidate] model=${model ?? "(sin modelo)"} tags=${tags.join(",")} warm=${warmPaths.join(",")}`
    );

    return NextResponse.json({
      revalidated: true,
      tags,
      warmed: warmPaths,
      model,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error en /api/revalidate:", error);
    return NextResponse.json({ error: "Error al revalidar" }, { status: 500 });
  }
}
