// Funciones helper para contar servicios sin hacer queries adicionales

/**
 * Cuenta servicios por tipo de servicio
 * @param {Array} servicios - Array de servicios con formato {nodes: [...]}
 * @returns {Object} - Objeto con conteos por slug de tipo
 */
export const calcularConteoPorTipo = (servicios) => {
  const contador = {};

  if (!servicios || !servicios.nodes) return contador;

  servicios.nodes.forEach(servicio => {
    if (servicio.tipo_de_servicio && servicio.tipo_de_servicio.slug) {
      const tipoSlug = servicio.tipo_de_servicio.slug;
      contador[tipoSlug] = (contador[tipoSlug] || 0) + 1;
    }
  });

  return contador;
};

/**
 * Cuenta servicios por sector país
 * @param {Array} servicios - Array de servicios con formato {nodes: [...]}
 * @returns {Object} - Objeto con conteos por slug de sector
 */
export const calcularConteoPorSector = (servicios) => {
  const contador = {};

  if (!servicios || !servicios.nodes) return contador;

  servicios.nodes.forEach(servicio => {
    if (servicio.sectores_pais && servicio.sectores_pais.length > 0) {
      servicio.sectores_pais.forEach(sector => {
        if (sector.slug) {
          contador[sector.slug] = (contador[sector.slug] || 0) + 1;
        }
      });
    }
  });

  return contador;
};
