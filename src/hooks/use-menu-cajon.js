import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useMenuCajon = async (slug) => {
  if (!slug) return null;

  const result = await fetchFromStrapi({
    endpoint: `/api/menu-cajons?filters[slug][$eq]=${slug}&populate=all`,
    fallback: { data: [] },
    errorContext: 'menu cajon'
  });

  return result?.data?.[0] || null;
}

export default useMenuCajon;