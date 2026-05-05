import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useNoticiasPorAgnoEtiqueta = async (etiquetaDocumentId) => {
  if (!etiquetaDocumentId) return {};

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias?status=published&sort=fecha:desc&pagination[limit]=1000&fields[0]=titulo&fields[1]=slug&fields[2]=fecha&filters[etiqueta_noticias][documentId][$eq]=${etiquetaDocumentId}`,
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
