import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useSectoresPais = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/sectores?populate=all&sort=nombre',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'sectores pais'
  });

  return {
    data: result?.data || [],
    totalCount: result?.data?.length || 0
  };
};

export default useSectoresPais;
