import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener todas las noticias agrupadas por año
 * Versión refactorizada usando la utilidad centralizada
 *
 * @returns {Promise<Object>} - Objeto con años como claves y arrays de noticias como valores
 * Ejemplo: { "2024": [...noticias], "2023": [...noticias] }
 */
const useNoticiasPorAgno = async () => {
  // Obtener todas las noticias publicadas ordenadas por fecha
  const query = buildStrapiQuery({
    custom: { status: 'published' },
    sort: 'fecha:desc',
    populate: ['foto', 'galeria', 'etiqueta_noticias'],
    pagination: {
      limit: 1000 // Obtener todas las noticias
    }
  });

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias${query}`,
    cache: CACHE_PRESETS.FREQUENT, // Revalidar cada 5 minutos
    fallback: { data: [] },
    errorContext: 'noticias por año',
    transform: (data) => {
      const noticias = data.data || [];

      if (noticias.length === 0) {
        return {};
      }

      // Agrupar noticias por año
      const noticiasPorAgno = noticias.reduce((acc, noticia) => {
        const agno = new Date(noticia.fecha).getFullYear();

        if (!acc[agno]) {
          acc[agno] = [];
        }

        acc[agno].push(noticia);
        return acc;
      }, {});

      // Ordenar las noticias dentro de cada año de más recientes a más antiguas
      Object.keys(noticiasPorAgno).forEach(agno => {
        noticiasPorAgno[agno].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      });

      // Ordenar los años de forma descendente (más reciente primero)
      const agnosOrdenados = Object.keys(noticiasPorAgno).sort((a, b) => parseInt(b) - parseInt(a));

      // Crear objeto final con años ordenados
      const resultado = {};
      agnosOrdenados.forEach(agno => {
        resultado[agno] = noticiasPorAgno[agno];
      });

      return resultado;
    }
  });

  return result;
}

export default useNoticiasPorAgno;
