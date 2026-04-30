/**
 * Limpia HTML de tablas removiendo estilos y atributos innecesarios,
 * y agrega clases de DaisyUI para estilizar.
 */
export function limpiarTabla(html) {
  if (!html) return html;

  let limpio = html;

  // Eliminar tags wrapper que no aportan estructura (figure, div, span) manteniendo contenido
  limpio = limpio.replace(/<\/?(figure|div|span)[^>]*>/gi, '');

  // Eliminar atributos de estilo y presentación de todos los tags
  limpio = limpio.replace(
    /\s*(style|class|width|height|bgcolor|border|cellpadding|cellspacing|align|valign|data-[a-z-]+)="[^"]*"/gi,
    ''
  );

  // Agregar clases DaisyUI al tag table
  limpio = limpio.replace(/<table[^>]*>/gi, '<table class="table table-zebra">');

  return limpio;
}
