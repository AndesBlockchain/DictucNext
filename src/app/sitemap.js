import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const SITE_URL = process.env.SITE_URL || 'https://frontend-dictuc.andesblockchain.com';

async function getServicios() {
  const result = await fetchFromStrapi({
    endpoint: '/api/servicios?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=1000',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sitemap servicios'
  });
  return result?.data || [];
}

async function getNoticias() {
  const result = await fetchFromStrapi({
    endpoint: '/api/noticias?fields[0]=slug&fields[1]=updatedAt&status=published&pagination[limit]=1000',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sitemap noticias'
  });
  return result?.data || [];
}

async function getSectores() {
  const result = await fetchFromStrapi({
    endpoint: '/api/sectores?fields[0]=slug&fields[1]=updatedAt',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sitemap sectores'
  });
  return result?.data || [];
}

async function getTiposDeServicio() {
  const result = await fetchFromStrapi({
    endpoint: '/api/tipo-de-servicios?fields[0]=slug&fields[1]=updatedAt',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sitemap tipos de servicio'
  });
  return result?.data || [];
}

async function getMenuCajones() {
  const result = await fetchFromStrapi({
    endpoint: '/api/menu-cajons?populate[links][fields][0]=url&pagination[pageSize]=100',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sitemap menu cajones'
  });
  return result?.data || [];
}

async function getMenuSecundarios() {
  const result = await fetchFromStrapi({
    endpoint: '/api/menu-secundarios?populate=all&pagination[limit]=100',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sitemap menu secundarios'
  });
  return result?.data || [];
}

async function getMenuSuperior() {
  const result = await fetchFromStrapi({
    endpoint: '/api/menu-superiors?sort=posicion&populate=all&pagination[limit]=100',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sitemap menu superior'
  });
  return result?.data || [];
}

function extraerUrlsDeMenus(cajones, secundarios, superior) {
  const urls = new Set();

  for (const menu of cajones) {
    for (const link of (menu.links || [])) {
      if (link.url?.startsWith('/')) urls.add(link.url);
    }
  }

  for (const menu of secundarios) {
    if (menu.Link?.startsWith('/')) urls.add(menu.Link);
    for (const link of (menu.Links || [])) {
      if (link.url?.startsWith('/')) urls.add(link.url);
    }
  }

  for (const item of superior) {
    if (item.link?.startsWith('/')) urls.add(item.link);
    for (const link of (item.LInks || [])) {
      if (link.url?.startsWith('/')) urls.add(link.url);
    }
  }

  return [...urls];
}

export default async function sitemap() {
  const [servicios, noticias, sectores, tiposDeServicio, cajones, secundarios, superior] = await Promise.all([
    getServicios(),
    getNoticias(),
    getSectores(),
    getTiposDeServicio(),
    getMenuCajones(),
    getMenuSecundarios(),
    getMenuSuperior()
  ]);

  const estaticas = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/servicios/todos-los-servicios`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/todas-las-noticias`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/medios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/estado-ticket`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/verifica`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/canal-denuncia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const serviciosUrls = servicios.map(s => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const noticiasUrls = noticias.map(n => ({
    url: `${SITE_URL}/noticias/${n.slug}`,
    lastModified: n.updatedAt ? new Date(n.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  const sectoresUrls = sectores.map(s => ({
    url: `${SITE_URL}/sectores-pais/${s.slug}`,
    lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const tiposUrls = tiposDeServicio.map(t => ({
    url: `${SITE_URL}/tipos-de-servicio/${t.slug}`,
    lastModified: t.updatedAt ? new Date(t.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  // Páginas de contenido extraídas de menús
  const urlsMenus = extraerUrlsDeMenus(cajones, secundarios, superior);
  const urlsYaIncluidas = new Set([
    ...estaticas.map(e => e.url),
    ...serviciosUrls.map(e => e.url),
    ...noticiasUrls.map(e => e.url),
    ...sectoresUrls.map(e => e.url),
    ...tiposUrls.map(e => e.url),
  ]);

  const paginasUrls = urlsMenus
    .map(path => `${SITE_URL}${path.replace(/\/$/, '')}`)
    .filter(url => !urlsYaIncluidas.has(url))
    .map(url => ({
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    }));

  return [
    ...estaticas,
    ...serviciosUrls,
    ...noticiasUrls,
    ...sectoresUrls,
    ...tiposUrls,
    ...paginasUrls
  ];
}
