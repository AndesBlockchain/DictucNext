import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useSectorBySlug = async (slug) => {
  if (!slug) return null;

  const result = await fetchFromStrapi({
    endpoint: `/api/sectores?filters[slug][$eq]=${slug}&populate[0]=icono&populate[1]=banner`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `sector ${slug}`
  });

  return result?.data?.[0] || null;
};

export default useSectorBySlug;
