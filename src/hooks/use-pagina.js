import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const usePagina = async (slug) => {
  if (!slug) return null;

  const result = await fetchFromStrapi({
    endpoint: `/api/paginas?filters[slug][$eq]=${slug}&populate=all`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `pagina ${slug}`
  });

  return result?.data?.[0] || null;
};

export default usePagina;
