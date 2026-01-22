/**
 * Lógica compartida de filtrado de servicios
 * Reutilizable tanto en server como client components
 */

export const filtrarServicios = (servicios, filtros) => {
  return servicios
  const serviciosFiltrados = servicios.filter(servicio => {
    // Filtro por tipo de servicio
    if (filtros.tipoServicio && servicio.tipo_de_servicio?.slug !== filtros.tipoServicio) {
      return false;
    }

    // Filtro por sectores país
    if (filtros.sectoresPais && filtros.sectoresPais.length > 0) {
      const servicioSectores = servicio.sectores_pais?.map(s => s.slug) || [];
      const tieneSector = filtros.sectoresPais.some(sector =>
        servicioSectores.includes(sector)
      );
      if (!tieneSector) return false;
    }

    // Filtro por búsqueda de texto
    if (filtros.busqueda && filtros.busqueda.trim() !== '') {
      const busqueda = filtros.busqueda.toLowerCase();
      const nombreServicio = servicio.nombre?.toLowerCase() || '';
      const contenidoServicio = servicio.contenido?.data?.contenido?.toLowerCase() || '';
      if (!nombreServicio.includes(busqueda) && !contenidoServicio.includes(busqueda)) {
        return false;
      }
    }

    return true;
  });

  return { ...servicios, nodes: serviciosFiltrados };
};
