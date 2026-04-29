import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useMenuFooterSuperior = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/menu-footer-superiors?populate=all',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'menu footer superior'
  });

  return result?.data || [];
};

export default useMenuFooterSuperior;
