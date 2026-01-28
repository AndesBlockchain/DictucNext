import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Hook para obtener las últimas noticias publicadas
 * Versión refactorizada usando la utilidad centralizada
 */
const useMenuSuperior = async () => {
  // Construir query con el helper

  return fetchFromStrapi({
    endpoint: `/api/menu-superiors?sort=posicion`,
    cache: CACHE_PRESETS.FREQUENT, // Revalidar cada 5 minutos
    fallback: { data: [] },
    errorContext: 'menu superior  '
  });
}

export default useMenuSuperior;