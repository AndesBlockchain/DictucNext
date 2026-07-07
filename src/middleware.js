import { NextResponse } from "next/server";

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const CACHE_TTL = 60 * 1000; // 60 segundos

let cachedRedirects = null;
let cacheTimestamp = 0;

async function getRedirects() {
  const now = Date.now();
  if (cachedRedirects && now - cacheTimestamp < CACHE_TTL) {
    return cachedRedirects;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${STRAPI_API_URL}/api/redirecciones?populate=all`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const json = await res.json();

    const redirects = [];
    for (const entry of json.data || []) {
      for (const r of entry.Redirect || []) {
        if (r.origen && r.destino) {
          const esUrlAbsoluta = /^https?:\/\//.test(r.destino);
          redirects.push({
            origen: r.origen.startsWith("/") ? r.origen : `/${r.origen}`,
            destino: esUrlAbsoluta
              ? r.destino
              : r.destino.startsWith("/")
              ? r.destino
              : `/${r.destino}`,
            prefijo: r.origen.endsWith("*"),
            absoluta: esUrlAbsoluta,
          });
        }
      }
    }

    cachedRedirects = redirects;
    cacheTimestamp = now;
    return redirects;
  } catch (error) {
    console.error("Error al obtener redirects de Strapi:", error);
    return cachedRedirects || [];
  }
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Maintenance mode
  if (process.env.MAINTENANCE_MODE === "true") {
    if (pathname !== "/maintenance") {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }
    return NextResponse.next();
  }

  // Redirect de imágenes antiguas de WordPress a Azure Blob Storage
  if (pathname.startsWith("/wp-content/")) {
    return NextResponse.redirect(
      `https://wwwdictuc.blob.core.windows.net/fotosnoticiasantiguas${pathname}`,
      301
    );
  }

  // No interceptar assets estáticos ni APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/monitoring") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const redirects = await getRedirects();

  const search = request.nextUrl.search;

  for (const r of redirects) {
    if (r.prefijo) {
      const prefix = r.origen.slice(0, -1); // quitar el *
      if (pathname.startsWith(prefix)) {
        const rest = pathname.slice(prefix.length);
        const destino = r.destino.endsWith("*")
          ? r.destino.slice(0, -1) + rest
          : r.destino;
        if (r.absoluta) {
          return NextResponse.redirect(destino, 301);
        }
        const url = new URL(destino, request.url);
        if (search) url.search = search;
        return NextResponse.redirect(url, 301);
      }
    } else if (pathname === r.origen) {
      if (r.absoluta) {
        return NextResponse.redirect(r.destino, 301);
      }
      const url = new URL(r.destino, request.url);
      if (search) url.search = search;
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
