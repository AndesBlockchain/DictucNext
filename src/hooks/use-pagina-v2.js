import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener detalles de una página por slug
 * Versión refactorizada usando la utilidad centralizada
 *
 * @param {string} slug - Slug de la página
 * @returns {Promise<Object|null>} - Datos de la página o null si no existe
 */
const usePagina = async (slug) => {
  // Validar parámetro
  if (!slug) {
    console.error('usePagina: slug is required');
    return null;
  }

  const query = buildStrapiQuery({
    filters: {
      slug: { $eq: slug }
    },
    populate: 'all'
  });

  const result = await fetchFromStrapi({
    endpoint: `/api/paginas${query}`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [] },
    errorContext: `pagina: ${slug}`,
    transform: (data) => {
      // Si hay datos, retornar el primer resultado
      // Si no hay datos, retornar null
      return data.data && data.data.length > 0 ? data.data[0] : null;
    }
  });

  return result;
}

export default usePagina;
