import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useSectoresPais = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/sectores?sort=nombre&fields[0]=nombre&fields[1]=slug&populate[icono][fields][0]=url&populate[icono][fields][1]=formats&populate[icono][fields][2]=width&populate[icono][fields][3]=height&populate[icono][fields][4]=alternativeText',
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
