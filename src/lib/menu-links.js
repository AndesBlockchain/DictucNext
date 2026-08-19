import { construirRutaPagina } from '@/lib/pagina-rutas';

// Fragmento de populate reutilizado por los hooks de menú (new-menu-principal,
// new-menu-secundario, menu-cajon) para resolver el campo opcional "pagina"
// de un ítem de link. Se antepone al prefijo del populate del propio ítem,
// ej: `${prefix}[populate]` donde prefix = 'populate[Items]' o 'populate[links]'.
export function populatePaginaQuery(prefixPopulate) {
  return [
    `${prefixPopulate}[pagina][fields][0]=slug`,
    `${prefixPopulate}[pagina][populate][new_menu_principal][fields][0]=slug_ruta`,
    `${prefixPopulate}[pagina][populate][new_menu_secundario][fields][0]=slug_ruta`,
    `${prefixPopulate}[pagina][populate][menu_cajon][fields][0]=slug`,
  ].join('&');
}

/**
 * Si el ítem tiene "pagina" seteada, su link debe apuntar a la ruta de esa
 * página (ignorando el campo "url" manual). Recorre recursivamente el campo
 * "Links" (sub-menú) cuando existe.
 */
export function normalizarLink(item) {
  if (!item) return item;

  const normalizado = {
    ...item,
    url: item.pagina ? construirRutaPagina(item.pagina) : item.url,
  };

  if (Array.isArray(item.Links)) {
    normalizado.Links = item.Links.map(normalizarLink);
  }

  return normalizado;
}
