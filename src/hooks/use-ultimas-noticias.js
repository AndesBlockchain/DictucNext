import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener las últimas noticias publicadas
 * Versión refactorizada usando la utilidad centralizada
 */
const useUltimasNoticias = async () => {
  // Construir query con el helper
  const query = buildStrapiQuery({
    custom: { status: 'published' },
    sort: 'publishedAt:desc',
    pagination: {
      page: 1,
      pageSize: 6
    }
  });

  return fetchFromStrapi({
    endpoint: `/api/noticias${query}`,
    cache: CACHE_PRESETS.FREQUENT, // Revalidar cada 5 minutos
    fallback: { data: [] },
    errorContext: 'ultimas noticias'
  });
}

export default useUltimasNoticias;
