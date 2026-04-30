import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useMenuCajon = async (slugCandidatos) => {
  if (!slugCandidatos || slugCandidatos.length === 0) return null;

  for (const slug of slugCandidatos) {
    const result = await fetchFromStrapi({
      endpoint: `/api/menu-cajons?filters[slug][$eq]=${slug}&populate[0]=links&pagination[pageSize]=100`,
      fallback: { data: [] },
      cache: CACHE_PRESETS.FREQUENT,
      errorContext: 'menu cajon'
    });

    const menuCajon = result?.data?.[0] || null;
    if (menuCajon) return menuCajon;
  }

  return null;
}

export default useMenuCajon;