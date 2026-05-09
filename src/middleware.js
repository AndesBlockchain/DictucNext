import { NextResponse } from "next/server";

const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://127.0.0.1:1337";
const CACHE_TTL = 60 * 1000; // 60 segundos

let cachedRedirects = null;
let cacheTimestamp = 0;

async function getRedirects() {
  const now = Date.now();
  if (cachedRedirects && now - cacheTimestamp < CACHE_TTL) {
    return cachedRedirects;
  }

  try {
    const res = await fetch(`${STRAPI_API_URL}/api/redirecciones?populate=all`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();

    const redirects = [];
    for (const entry of json.data || []) {
      for (const r of entry.Redirect || []) {
        if (r.origen && r.destino) {
          redirects.push({
            origen: r.origen.startsWith("/") ? r.origen : `/${r.origen}`,
            destino: r.destino.startsWith("/") ? r.destino : `/${r.destino}`,
            prefijo: r.origen.endsWith("*"),
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

  for (const r of redirects) {
    if (r.prefijo) {
      const prefix = r.origen.slice(0, -1); // quitar el *
      if (pathname.startsWith(prefix)) {
        const rest = pathname.slice(prefix.length);
        const destino = r.destino.endsWith("*")
          ? r.destino.slice(0, -1) + rest
          : r.destino;
        return NextResponse.redirect(new URL(destino, request.url), 301);
      }
    } else if (pathname === r.origen) {
      return NextResponse.redirect(new URL(r.destino, request.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
