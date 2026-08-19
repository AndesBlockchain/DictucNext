import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

// Query liviana: sólo lo necesario para armar la URL, sin Items/Links/Bloques.
const QUERY = [
  'fields[0]=slug',
  'fields[1]=updatedAt',
  'populate[new_menu_principal][fields][0]=slug_ruta',
  'populate[new_menu_secundario][fields][0]=slug_ruta',
  'populate[menu_cajon][fields][0]=slug',
  'status=published',
  'pagination[limit]=1000',
].join('&');

/**
 * Segmentos de URL de una página a partir de sus relaciones de menú:
 * new_menu_principal.slug_ruta / new_menu_secundario.slug_ruta /
 * menu_cajon.slug / slug propio. Se usa tanto para generar rutas estáticas
 * como para resolver a dónde debe apuntar un link de menú que referencia
 * una página (campo "pagina" en los ítems de new-menu-principal,
 * new-menu-secundario y menu-cajon).
 */
export function construirSegmentosPagina(pagina) {
  if (!pagina) return [];
  return [
    pagina.new_menu_principal?.slug_ruta,
    pagina.new_menu_secundario?.slug_ruta,
    pagina.menu_cajon?.slug,
    pagina.slug,
  ].filter(Boolean);
}

export function construirRutaPagina(pagina) {
  const segmentos = construirSegmentosPagina(pagina);
  return segmentos.length ? `/${segmentos.join('/')}` : '/';
}

/**
 * { slug: [...segmentos], updatedAt } por cada página con new_menu_principal.
 * Páginas sin new_menu_principal se excluyen: toda página con URL propia debe
 * pertenecer a algún menú principal (default o minisitio). El segmento de
 * `principal` sólo se agrega si ese menú tiene slug_ruta (por convención el
 * default lo tiene = "paginas", pero el código no lo asume).
 */
export async function getPaginasConRuta() {
  const result = await fetchFromStrapi({
    endpoint: `/api/paginas?${QUERY}`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'paginas (rutas)'
  });

  const rutas = [];
  for (const pagina of (result?.data || [])) {
    if (!pagina.new_menu_principal || !pagina.slug) continue;

    rutas.push({ slug: construirSegmentosPagina(pagina), updatedAt: pagina.updatedAt });
  }
  return rutas;
}
