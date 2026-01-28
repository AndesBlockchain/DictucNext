/**
 * Utilidad centralizada para hacer fetches a Strapi API
 * Maneja errores, cache, y retorna valores por defecto consistentes
 */

/**
 * Fetch genérico a Strapi con manejo de errores y cache
 *
 * @param {Object} options - Opciones de configuración
 * @param {string} options.endpoint - Endpoint de la API (ej: '/api/noticias')
 * @param {Object} options.cache - Configuración de cache Next.js
 * @param {number} options.cache.revalidate - Tiempo de revalidación en segundos (default: 3600)
 * @param {string} options.cache.mode - Modo de cache: 'force-cache', 'no-store', etc. (default: 'force-cache')
 * @param {*} options.fallback - Valor por defecto si falla (default: { data: [] })
 * @param {Function} options.transform - Función para transformar la respuesta (opcional)
 * @param {string} options.errorContext - Contexto del error para logs (default: endpoint)
 * @param {boolean} options.throwOnError - Si debe lanzar error en vez de retornar fallback (default: false)
 * @returns {Promise<*>} - Datos de Strapi o fallback
 */
export async function fetchFromStrapi({
  endpoint,
  cache = {},
  fallback = { data: [] },
  transform = null,
  errorContext = null,
  throwOnError = false
}) {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    const errorMsg = 'STRAPI_API_URL environment variable is not defined';
    console.error(errorMsg);

    if (throwOnError) {
      throw new Error(errorMsg);
    }
    return fallback;
  }

  // Construir URL completa
  const fullUrl = baseUrl + endpoint;
  const context = errorContext || endpoint;

  // Configurar opciones de fetch
  const fetchOptions = {
    next: {
      revalidate: cache.revalidate ?? 3600, // Default: 1 hora
    },
    cache: cache.mode ?? 'force-cache'
  };

  try {
    console.log(`[Strapi Fetcher] Fetching: ${fullUrl}`);

    const res = await fetch(fullUrl, fetchOptions);

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error');
      const errorMsg = `Failed to fetch ${context} (Status: ${res.status}): ${errorText}`;
      console.error(`[Strapi Fetcher] ${errorMsg}`);

      if (throwOnError) {
        throw new Error(errorMsg);
      }
      return fallback;
    }

    const data = await res.json();
    console.log(data);
    // Validar que la respuesta tenga datos
    if (!data || (data.data && !Array.isArray(data.data) && typeof data.data !== 'object')) {
      console.warn(`[Strapi Fetcher] Invalid data structure for ${context}`);
      return fallback;
    }

    // Aplicar transformación si existe
    if (transform && typeof transform === 'function') {
      return transform(data);
    }

    return data;

  } catch (error) {
    console.error(`[Strapi Fetcher] Error fetching ${context}:`, error);

    if (throwOnError) {
      throw error;
    }
    return fallback;
  }
}

/**
 * Helper para construir query strings de Strapi
 * @param {Object} params - Parámetros de búsqueda
 * @returns {string} - Query string
 */
export function buildStrapiQuery(params) {
  const queryParts = [];

  // Filtros
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([operator, val]) => {
          queryParts.push(`filters[${key}][${operator}]=${encodeURIComponent(val)}`);
        });
      } else {
        queryParts.push(`filters[${key}]=${encodeURIComponent(value)}`);
      }
    });
  }

  // Populate
  if (params.populate) {
    if (params.populate === 'all' || params.populate === '*') {
      queryParts.push('populate=all');
    } else if (Array.isArray(params.populate)) {
      params.populate.forEach((field, index) => {
        queryParts.push(`populate[${index}]=${field}`);
      });
    } else if (typeof params.populate === 'object') {
      Object.entries(params.populate).forEach(([key, value]) => {
        queryParts.push(`populate[${key}]=${value}`);
      });
    }
  }

  // Sort
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach(s => queryParts.push(`sort=${s}`));
    } else {
      queryParts.push(`sort=${params.sort}`);
    }
  }

  // Pagination
  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, value]) => {
      queryParts.push(`pagination[${key}]=${value}`);
    });
  }

  // Fields
  if (params.fields) {
    params.fields.forEach(field => {
      queryParts.push(`fields=${field}`);
    });
  }

  // Otros parámetros personalizados
  if (params.custom) {
    Object.entries(params.custom).forEach(([key, value]) => {
      queryParts.push(`${key}=${encodeURIComponent(value)}`);
    });
  }

  return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
}

/**
 * Presets comunes de configuración de cache
 */
export const CACHE_PRESETS = {
  // Revalidar cada hora (default)
  HOURLY: { revalidate: 3600, mode: 'force-cache' },

  // Revalidar cada 5 minutos (para datos que cambian frecuentemente)
  FREQUENT: { revalidate: 300, mode: 'force-cache' },

  // Revalidar cada día
  DAILY: { revalidate: 86400, mode: 'force-cache' },

  // Sin cache (siempre fetch fresco)
  NO_CACHE: { revalidate: 0, mode: 'no-store' },

  // Cache indefinido (para datos estáticos)
  INFINITE: { mode: 'force-cache' },
};
