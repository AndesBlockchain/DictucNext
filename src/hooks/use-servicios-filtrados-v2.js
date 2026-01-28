import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener servicios con filtros opcionales
 * Ejemplo avanzado de uso de la utilidad centralizada
 *
 * @param {Object} options - Opciones de filtrado
 * @param {string} options.tipoServicio - Slug del tipo de servicio (opcional)
 * @param {string} options.sector - Slug del sector (opcional)
 * @param {string} options.search - Término de búsqueda (opcional)
 * @param {number} options.page - Número de página (default: 1)
 * @param {number} options.pageSize - Tamaño de página (default: 20)
 * @returns {Promise<Object>} - Servicios filtrados con metadata de paginación
 */
const useServiciosFiltrados = async (options = {}) => {
  const {
    tipoServicio = null,
    sector = null,
    search = null,
    page = 1,
    pageSize = 20
  } = options;

  // Construir filtros dinámicamente
  const filters = {};

  if (tipoServicio) {
    filters.tipo_de_servicio = { slug: { $eq: tipoServicio } };
  }

  if (sector) {
    filters.sectores_pais = { slug: { $containsi: sector } };
  }

  if (search) {
    // Buscar en nombre o descripción
    filters.$or = [
      { nombre: { $containsi: search } },
      { descripcion: { $containsi: search } }
    ];
  }

  const query = buildStrapiQuery({
    filters: Object.keys(filters).length > 0 ? filters : undefined,
    populate: ['tipo_de_servicio', 'sectores_pais', 'unidad'],
    sort: 'nombre:asc',
    pagination: { page, pageSize }
  });

  return fetchFromStrapi({
    endpoint: `/api/servicios${query}`,
    cache: CACHE_PRESETS.FREQUENT,
    fallback: {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: pageSize,
          pageCount: 0,
          total: 0
        }
      }
    },
    errorContext: 'servicios filtrados',
    transform: (data) => {
      // Asegurar que meta existe
      return {
        data: data.data || [],
        meta: data.meta || {
          pagination: {
            page: 1,
            pageSize: pageSize,
            pageCount: 0,
            total: 0
          }
        }
      };
    }
  });
}

export default useServiciosFiltrados;
