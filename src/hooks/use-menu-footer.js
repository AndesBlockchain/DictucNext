import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';
import { normalizarLink, populatePaginaQuery } from '@/lib/menu-links';

const useMenuFooter = async () => {
  const query = [
    'sort=sortOrder:asc',
    populatePaginaQuery('populate[links][populate]'),
  ].join('&');

  const result = await fetchFromStrapi({
    endpoint: `/api/menu-footers?${query}`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'menu footer',
    transform: (data) => ({
      data: (data.data ?? []).map((grupo) => ({
        ...grupo,
        links: (grupo.links ?? []).map(normalizarLink),
      })),
    })
  });

  return result?.data || [];
};

export default useMenuFooter;
