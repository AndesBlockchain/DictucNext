import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useTablaBuscable = async (documentIdEtiqueta) => {
  if (!documentIdEtiqueta) return [];

  const result = await fetchFromStrapi({
    endpoint: `/api/tabla-buscables?filters[etiqueta_tabla_buscable][documentId][$eq]=${documentIdEtiqueta}&populate=all&pagination[limit]=1000`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [] },
    errorContext: 'tabla buscable'
  });

  return result?.data || [];
}

export default useTablaBuscable;