import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useProyectosPorAgno = async () => {
  const query = '?status=published&sort=fecha:desc&filters[etiqueta_noticias][documentId][$eq]=e6yj5fpd0mtoeeyhof0nyedg&populate[0]=foto&populate[1]=galeria&populate[2]=etiqueta_noticias&pagination[limit]=1000';

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias${query}`,
    cache: CACHE_PRESETS.FREQUENT,
    fallback: { data: [] },
    errorContext: 'proyectos por año',
    transform: (data) => {
      const noticias = data.data || [];

      if (noticias.length === 0) {
        return {};
      }

      const noticiasPorAgno = noticias.reduce((acc, noticia) => {
        const agno = new Date(noticia.fecha).getFullYear();
        if (!acc[agno]) {
          acc[agno] = [];
        }
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

export default useProyectosPorAgno;
