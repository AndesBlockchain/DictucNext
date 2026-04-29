import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useModals = async () => {
  return fetchFromStrapi({
    endpoint: '/api/carruseles',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'modals/carruseles'
  });
};

export default useModals;
