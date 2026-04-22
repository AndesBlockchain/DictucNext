import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useServicio = async (slug) => {
  if (!slug) return null;

  const result = await fetchFromStrapi({
    endpoint: `/api/servicios?filters[slug][$eq]=${slug}&populate=all`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `servicio ${slug}`
  });

  return result?.data?.[0] || null;
};

export default useServicio;
