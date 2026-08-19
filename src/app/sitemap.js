import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';
import { getPaginasConRuta } from '@/lib/pagina-rutas';

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

export default async function sitemap() {
  const [servicios, noticias, sectores, tiposDeServicio, paginasConRuta] = await Promise.all([
    getServicios(),
    getNoticias(),
    getSectores(),
    getTiposDeServicio(),
    getPaginasConRuta()
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

  const paginasUrls = paginasConRuta.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/${slug.join('/')}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
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
