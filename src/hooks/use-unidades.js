import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useUnidades = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/unidades?populate=all&sort=nombre&pagination[limit]=200',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'unidades'
  });

  return {
    data: result?.data || [],
    totalCount: result?.data?.length || 0
  };
};

export default useUnidades;
