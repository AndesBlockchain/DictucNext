import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useNoticia = async (slug) => {
  if (!slug) return null;

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias?filters[slug][$eq]=${slug}&status=published&populate=all`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `noticia ${slug}`
  });

  return result?.data?.[0] || null;
}

export default useNoticia;
