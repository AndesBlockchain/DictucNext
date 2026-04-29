import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useNoticiasByTag = async (tag) => {
  if (!tag) return { data: [] };

  return fetchFromStrapi({
    endpoint: `/api/noticias?filters[etiqueta_noticias][$eq]=${tag}&status=published&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `noticias by tag ${tag}`
  });
};

export default useNoticiasByTag;
