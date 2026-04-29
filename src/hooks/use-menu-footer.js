import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useMenuFooter = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/menu-footers?sort=sortOrder:asc&populate=*',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'menu footer'
  });

  return result?.data || [];
};

export default useMenuFooter;
