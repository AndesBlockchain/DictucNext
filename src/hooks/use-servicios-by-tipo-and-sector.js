import { useStaticQuery, graphql } from "gatsby"

const useServiciosByTipoAndSector = (tipoServicioSlug, sectorPaisSlug) => {
    const data = useStaticQuery(graphql`
 {
  allStrapiServicio {
    nodes {
      contenido {
        data {
          contenido
        }
      }
      nombre
      slug
      utilidad {
        data {
          utilidad
        }
      }
      experiencia {
        data {
          experiencia
        }
      }
      potenciales_clientes {
        data {
          potenciales_clientes
        }
      }
      tipo_de_servicio {
        nombre
        slug
      }
      unidad {
        nombre
      }
      sectores_pais {
        nombre
        slug
      }
    }
  }
}
  `); 

  // Filtrar servicios que cumplan con ambos criterios
  const serviciosFiltrados = data.allStrapiServicio.nodes.filter(servicio => {
    // Verificar que tenga el tipo de servicio especificado
    const tieneTipoCorrecto = servicio.tipo_de_servicio && 
                             servicio.tipo_de_servicio.slug === tipoServicioSlug;
    
    // Verificar que tenga el sector país especificado
    const tieneSectorCorrecto = servicio.sectores_pais && 
                               servicio.sectores_pais.some(sector => sector.slug === sectorPaisSlug);
    
    // Debe cumplir ambos criterios
    return tieneTipoCorrecto && tieneSectorCorrecto;
  });

  return serviciosFiltrados;
}

// Función para contar servicios por tipo dentro de un array de servicios
const contarServiciosPorTipo = (serviciosBySector) => {
  const contador = {};
  
  serviciosBySector.forEach(servicio => {
    if (servicio.tipo_de_servicio && servicio.tipo_de_servicio.slug) {
      const tipoSlug = servicio.tipo_de_servicio.slug;
      contador[tipoSlug] = (contador[tipoSlug] || 0) + 1;
    }
  });
  
  return contador;
};

// Función para contar servicios por sector país dentro de un array de servicios
const contarServiciosPorSector = (serviciosByTipo) => {
  const contador = {};
  
  serviciosByTipo.forEach(servicio => {
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


export { contarServiciosPorTipo, contarServiciosPorSector };
export default useServiciosByTipoAndSector;
