import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener sectores del país
 * Versión refactorizada usando la utilidad centralizada
 */
const useSectoresPais = async () => {

  return fetchFromStrapi({
    endpoint: `/api/sectores?sort=nombre`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [], totalCount: 0 },
    errorContext: 'sectores pais',
    // Transformar la respuesta para agregar totalCount
    transform: (data) => {
      return {
        data: data.data || [],
        totalCount: data.data?.length || 0
      };
    }
  });
}

export default useSectoresPais;
