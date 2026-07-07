import { NextResponse } from "next/server";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

// Anchos más comunes para imágenes full-width (deviceSizes de Next.js)
const WIDTHS = [640, 1080, 1920];
const QUALITY = 75;

/**
 * Extrae todas las URLs de imágenes del payload del webhook de Strapi.
 * Los objetos de imagen de Strapi tienen { url, mime, ... }
 */
function extractImageUrls(data, urls = new Set()) {
  if (!data || typeof data !== "object") return urls;
  if (Array.isArray(data)) {
    data.forEach((item) => extractImageUrls(item, urls));
  } else {
    if (
      typeof data.url === "string" &&
      data.mime?.startsWith("image/")
    ) {
      urls.add(data.url);
    }
    Object.values(data).forEach((val) => extractImageUrls(val, urls));
  }
  return urls;
}

async function warmImage(strapiUrl, siteOrigin) {
  const absoluteUrl = strapiUrl.startsWith("http")
    ? strapiUrl
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_API_URL}${strapiUrl}`;

  await Promise.all(
    WIDTHS.map((w) =>
      fetch(
        `${siteOrigin}/_next/image?url=${encodeURIComponent(absoluteUrl)}&w=${w}&q=${QUALITY}`,
        { headers: { Accept: "image/avif,image/webp,*/*" } }
      ).catch((err) =>
        console.warn(`[warm-images] Error calentando ${absoluteUrl} w=${w}:`, err.message)
      )
    )
  );
}

export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!REVALIDATION_SECRET || token !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const siteOrigin = new URL(request.url).origin;

    const imageUrls = extractImageUrls(body.entry || body);

    if (imageUrls.size === 0) {
      return NextResponse.json({ warmed: 0, message: "Sin imágenes en el payload" });
    }

    // Calentar en paralelo, sin bloquear la respuesta
    Promise.all([...imageUrls].map((url) => warmImage(url, siteOrigin))).catch(
      (err) => console.error("[warm-images] Error general:", err)
    );

    return NextResponse.json({
      warmed: imageUrls.size,
      urls: [...imageUrls],
      widths: WIDTHS,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("[warm-images] Error:", error);
    return NextResponse.json({ error: "Error al procesar" }, { status: 500 });
  }
}
