import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';
import { normalizarLink, populatePaginaQuery } from '@/lib/menu-links';

// Cada registro de new-menu-principal es un MENÚ completo (ej. "Menu Sitio
// Web", "Menu backup"), no un ítem de navegación. Sus ítems reales de
// navegación viven en su campo "Items" (con sub-links anidados en "Links").
// Cada ítem puede además tener una relación opcional "pagina": si viene
// seteada, el link debe apuntar a la ruta de esa página en vez de a su
// campo "url" (ver normalizarLink en @/lib/menu-links).
//
// Selección de menú: si el primer segmento de la URL actual matchea el
// slug_ruta de algún registro de esta colección, se usa ese menú (permite
// previsualizar un menú no-default navegando a /<slug_ruta>/...). Si no hay
// match, se usa el registro marcado como "default".
const useMenuSuperior = async (primerSegmento = null) => {
  const filtro = primerSegmento
    ? `filters[$or][0][slug_ruta][$eq]=${encodeURIComponent(primerSegmento)}&filters[$or][1][default][$eq]=true`
    : 'filters[default][$eq]=true';

  const query = [
    filtro,
    populatePaginaQuery('populate[Items][populate]'),
    populatePaginaQuery('populate[Items][populate][Links][populate]'),
    'pagination[limit]=10',
  ].join('&');

  return fetchFromStrapi({
    endpoint: `/api/new-menu-principals?${query}`,
    cache: CACHE_PRESETS.FREQUENT,
    fallback: { data: [] },
    errorContext: 'menu superior (new-menu-principal)',
    transform: (data) => {
      const registros = data.data ?? [];
      const match = primerSegmento
        ? registros.find((r) => r.slug_ruta === primerSegmento)
        : null;
      const elegido = match ?? registros.find((r) => r.default === true) ?? registros[0];
      return { data: (elegido?.Items ?? []).map(normalizarLink) };
    }
  });
}

export default useMenuSuperior;
