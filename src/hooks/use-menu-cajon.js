import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';
import { normalizarLink, populatePaginaQuery } from '@/lib/menu-links';

// Recibe el documentId del menu_cajon ya relacionado a la página
// (pagina.menu_cajon, obtenido vía usePagina con populate=all). Se
// refetchea acá con populate explícito por la misma razón que
// use-menu-secundario: populate=all no alcanza a resolver la ruta de una
// página referenciada por el campo opcional "pagina" de cada link.
const useMenuCajon = async (documentId) => {
  if (!documentId) return null;

  const query = populatePaginaQuery('populate[links][populate]');

  const result = await fetchFromStrapi({
    endpoint: `/api/menu-cajons/${documentId}?${query}`,
    cache: CACHE_PRESETS.FREQUENT,
    fallback: { data: null },
    errorContext: 'menu cajon (menu-cajon)'
  });

  const registro = result?.data;
  if (!registro) return null;

  return {
    ...registro,
    links: (registro.links ?? []).map(normalizarLink),
  };
}

export default useMenuCajon;
