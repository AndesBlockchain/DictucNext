#!/usr/bin/env node

/**
 * Warm-up de banners: recorre los banners de todas las páginas, servicios,
 * sectores y tipos de servicio, y hace GET a /_next/image para calentar
 * el cache del optimizador de Next.js y del CDN.
 *
 * Uso: node scripts/warmup-banners.mjs [SITE_URL] [STRAPI_API_URL]
 *   SITE_URL default: https://www.dictuc.cl
 *   STRAPI_API_URL default: https://backend-dictuc.andesblockchain.com
 */

const SITE_URL = process.argv[2] || process.env.SITE_URL || 'https://www.dictuc.cl';
const STRAPI_API_URL = process.argv[3] || process.env.STRAPI_API_URL || 'https://backend-dictuc.andesblockchain.com';
const WIDTHS = [1920, 3840];
const CONCURRENCY = 6;

async function fetchJSON(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) return null;
  return res.json();
}

async function collectBannerUrls() {
  const urls = new Set();

  const endpoints = [
    { url: `${STRAPI_API_URL}/api/paginas?fields[0]=slug&populate[Banner][fields][0]=url&pagination[limit]=200`, field: 'Banner' },
    { url: `${STRAPI_API_URL}/api/servicios?fields[0]=slug&populate[banner][fields][0]=url&pagination[limit]=500`, field: 'banner' },
    { url: `${STRAPI_API_URL}/api/sectores?fields[0]=slug&populate[banner][fields][0]=url&pagination[limit]=50`, field: 'banner' },
    { url: `${STRAPI_API_URL}/api/tipo-de-servicios?fields[0]=slug&populate[BannerBuscadorServicios][fields][0]=url&pagination[limit]=50`, field: 'BannerBuscadorServicios' },
    { url: `${STRAPI_API_URL}/api/etiqueta-noticias?fields[0]=slug&populate[Banner][fields][0]=url&pagination[limit]=50`, field: 'Banner' },
  ];

  const results = await Promise.allSettled(endpoints.map(e => fetchJSON(e.url).then(d => ({ ...e, data: d }))));

  for (const r of results) {
    if (r.status !== 'fulfilled' || !r.value.data?.data) continue;
    const { field, data } = r.value;
    for (const item of data.data) {
      const banner = item[field];
      const url = banner?.url;
      if (url) urls.add(url);
    }
  }

  return [...urls];
}

async function warmUrl(imageUrl) {
  const origin = imageUrl.startsWith('http') ? imageUrl : `${STRAPI_API_URL}${imageUrl}`;
  const results = [];

  for (const w of WIDTHS) {
    const nextImageUrl = `${SITE_URL}/_next/image?url=${encodeURIComponent(origin)}&w=${w}&q=75`;
    const start = Date.now();
    try {
      const res = await fetch(nextImageUrl, {
        headers: { Accept: 'image/webp,*/*' },
        signal: AbortSignal.timeout(30000),
      });
      const elapsed = Date.now() - start;
      const cacheHeader = res.headers.get('x-nextjs-cache') || '-';
      results.push({ w, status: res.status, elapsed, cache: cacheHeader });
    } catch (err) {
      results.push({ w, status: 'ERR', elapsed: Date.now() - start, cache: err.message });
    }
  }
  return { imageUrl, results };
}

async function runWithConcurrency(tasks, concurrency) {
  const results = [];
  let idx = 0;

  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

async function main() {
  console.log(`Warm-up banners: ${SITE_URL} (Strapi: ${STRAPI_API_URL})`);
  console.log('Recopilando URLs de banners...');

  const bannerUrls = await collectBannerUrls();
  console.log(`Encontrados ${bannerUrls.length} banners únicos. Calentando ${bannerUrls.length * WIDTHS.length} variantes...`);

  const tasks = bannerUrls.map(url => () => warmUrl(url));
  const results = await runWithConcurrency(tasks, CONCURRENCY);

  let hits = 0, misses = 0, errors = 0;
  for (const r of results) {
    for (const v of r.results) {
      if (v.status === 'ERR' || v.status >= 400) {
        errors++;
        console.log(`  ERROR ${r.imageUrl} w=${v.w}: ${v.cache}`);
      } else if (v.cache === 'HIT') {
        hits++;
      } else {
        misses++;
      }
    }
  }

  console.log(`\nResultados: ${hits} HIT, ${misses} MISS (calentados), ${errors} errores`);
  console.log(`Total variantes: ${bannerUrls.length * WIDTHS.length}`);

  if (errors > 0) process.exit(1);
}

main().catch(err => { console.error(err); process.exit(1); });
