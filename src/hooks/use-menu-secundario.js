import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';
import { normalizarLink, populatePaginaQuery } from '@/lib/menu-links';

// Recibe el documentId del new-menu-secundario ya relacionado a la página
// (pagina.new_menu_secundario, obtenido vía usePagina con populate=all).
// Se refetchea acá con populate explícito porque populate=all sólo trae un
// nivel de profundidad y no alcanza a resolver pagina.new_menu_principal /
// pagina.new_menu_secundario / pagina.menu_cajon, necesarios para construir
// la ruta cuando un link tiene la relación opcional "pagina" seteada.
const useMenuSecundario = async (documentId) => {
  if (!documentId) return null;

  const query = [
    populatePaginaQuery('populate[Links][populate]'),
    populatePaginaQuery('populate[Links][populate][Links][populate]'),
  ].join('&');

  const result = await fetchFromStrapi({
    endpoint: `/api/new-menu-secundarios/${documentId}?${query}`,
    cache: CACHE_PRESETS.FREQUENT,
    fallback: { data: null },
    errorContext: 'menu secundario (new-menu-secundario)'
  });

  const registro = result?.data;
  if (!registro) return null;

  return {
    ...registro,
    Links: (registro.Links ?? []).map(normalizarLink),
  };
}

export default useMenuSecundario;
