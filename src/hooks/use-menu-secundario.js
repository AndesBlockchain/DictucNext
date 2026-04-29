import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useMenuSecundario = async (seccion, slug) => {
  if (!seccion) return [];

  const result = await fetchFromStrapi({
    endpoint: `/api/menu-secundarios?sort=sortOrder&populate=Links&filters[seccion][slug][$eq]=${seccion}`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `menu secundario ${seccion}`
  });

  const items = result?.data ?? [];
  items.sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity));
  return items;
};

export default useMenuSecundario;
