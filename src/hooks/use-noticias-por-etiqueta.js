import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useNoticiasPorEtiqueta = async (etiquetaDocumentId, cantidad = 6) => {
  if (!etiquetaDocumentId) return [];

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias?filters[etiqueta_noticias][documentId][$eq]=${etiquetaDocumentId}&status=published&sort=fecha:desc&populate=*&pagination[pageSize]=${cantidad}`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `noticias por etiqueta ${etiquetaDocumentId}`
  });

  return result?.data || [];
};

export default useNoticiasPorEtiqueta;
