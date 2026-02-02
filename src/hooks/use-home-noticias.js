import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener las últimas 6 noticias para mostrar en home
 * @returns {Promise} Objeto con nodos de noticias
 */
const useHomeNoticias = async () => {
  const query = buildStrapiQuery({
    custom: { status: 'published' },
    sort: 'fecha:desc',
    populate: ['foto'],
    pagination: { page: 1, pageSize: 6 }
  });

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias${query}`,
    cache: CACHE_PRESETS.FREQUENT, // Cache 5 minutos
    fallback: { data: [] },
    errorContext: 'home noticias'
  });

  // Transform to match expected format (nodes structure)
  return {
    nodes: result.data || []
  };
}

export default useHomeNoticias;
