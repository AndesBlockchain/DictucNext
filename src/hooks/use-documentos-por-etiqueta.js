import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useDocumentosPorEtiqueta = async (documentId) => {
  if (!documentId) return [];

  const result = await fetchFromStrapi({
    endpoint: `/api/documentos?filters[etiqueta_documentos][documentId][$eq]=${documentId}&populate=*&pagination[pageSize]=100&sort=sortOrder:asc`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `documentos por etiqueta ${documentId}`
  });

  return result?.data || [];
};

export default useDocumentosPorEtiqueta;
