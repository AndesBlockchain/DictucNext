import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

// Precalienta una ruta visitándola después de purgar su caché ISR.
// Se lanza fire-and-forget: no bloquea la respuesta al webhook.
function warmPath(origin, path) {
  const url = `${origin}${path}`;
  fetch(url, { headers: { "x-prerender-revalidate": "1" } }).catch(
    (err) => console.warn(`[revalidate] warm failed for ${url}:`, err.message)
  );
}

// Mapea modelos de Strapi a las rutas Next.js que deben revalidarse
function getPathsForModel(model, entry) {
  const slug = entry?.slug;
  switch (model) {
    case "servicio":
      return [
        ...(slug ? [`/servicios/${slug}`] : []),
        "/servicios/todos-los-servicios",
        "/",
      ];
    case "pagina":
      // Las páginas CMS pueden vivir en cualquier sección; revalidar todo
      return ["/"];
    case "sector-pais":
      return [
        ...(slug ? [`/sectores-pais/${slug}`] : []),
        "/",
      ];
    case "tipo-de-servicio":
      return [
        ...(slug ? [`/tipos-de-servicio/${slug}`] : []),
        "/servicios/todos-los-servicios",
        "/",
      ];
    case "unidad":
      return [
        ...(slug ? [`/ejecutor/${slug}`] : []),
        "/servicios/todos-los-servicios",
      ];
    case "noticia":
      return [
        "/novedades",
        "/",
      ];
    default:
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

    let paths;
    if (body.path) {
      // Formato legado: { "path": "/ruta" }
      paths = [body.path];
    } else if (body.model) {
      // Formato webhook nativo de Strapi: { "model": "servicio", "entry": { "slug": "..." } }
      paths = getPathsForModel(body.model, body.entry);
    } else {
      paths = ["/"];
    }

    const origin = new URL(request.url).origin;
    const revalidated = [];
    for (const path of paths) {
      revalidatePath(path, "layout");
      revalidated.push(path);
      warmPath(origin, path);
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidated,
      model: body.model || null,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error en /api/revalidate:", error);
    return NextResponse.json({ error: "Error al revalidar" }, { status: 500 });
  }
}
