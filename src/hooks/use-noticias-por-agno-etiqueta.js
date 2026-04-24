import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener noticias agrupadas por año, filtradas por etiqueta (documentId)
 */
const useNoticiasPorAgnoEtiqueta = async (etiquetaDocumentId) => {
  if (!etiquetaDocumentId) return {};

  const query = buildStrapiQuery({
    custom: { status: 'published' },
    sort: 'fecha:desc',
    populate: ['foto', 'galeria', 'etiqueta_noticias'],
    filters: {
      'etiqueta_noticias][documentId][$eq': etiquetaDocumentId
    },
    pagination: {
      limit: 1000
    }
  });

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias${query}`,
    cache: CACHE_PRESETS.FREQUENT,
    fallback: { data: [] },
    errorContext: `noticias por etiqueta ${etiquetaDocumentId}`,
    transform: (data) => {
      const noticias = data.data || [];

      if (noticias.length === 0) return {};

      const noticiasPorAgno = noticias.reduce((acc, noticia) => {
        const agno = new Date(noticia.fecha).getFullYear();
        if (!acc[agno]) acc[agno] = [];
        acc[agno].push(noticia);
        return acc;
      }, {});

      Object.keys(noticiasPorAgno).forEach(agno => {
        noticiasPorAgno[agno].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      });

      const agnosOrdenados = Object.keys(noticiasPorAgno).sort((a, b) => parseInt(b) - parseInt(a));
      const resultado = {};
      agnosOrdenados.forEach(agno => {
        resultado[agno] = noticiasPorAgno[agno];
      });

      return resultado;
    }
  });

  return result;
}

export default useNoticiasPorAgnoEtiqueta;
