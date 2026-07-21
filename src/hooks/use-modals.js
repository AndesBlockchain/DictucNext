import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useModals = async () => {
  return fetchFromStrapi({
    endpoint: '/api/alertas-modals?populate[imagen][fields][0]=url&populate[imagen][fields][1]=formats&populate[imagen][fields][2]=width&populate[imagen][fields][3]=height&populate[imagen][fields][4]=alternativeText',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'modals/alertas-modals'
  });
};

export default useModals;
