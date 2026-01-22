import React, { useState, useEffect, useMemo } from "react";
import { graphql } from "gatsby";
import PaginaInterior from "../../components/PaginaInterior";
import FilaServicios from "../../components/FilaServicios";
import FiltroServicios from "../../components/FiltroServicios";
import { calcularConteoPorTipo } from "../../helpers/conteo-servicios";

export default function HomeServicios({ data, pageContext })
{
  const slug = pageContext.slug;
  const sector = data.strapiSector;
  const servicios = data.allStrapiServicio;

  const [filtros,setFiltros]= useState({
    tipoServicio: '',
    sectoresPais: [slug],
    busqueda: ''
  })

  const [serviciosVisibles,setServiciosVisibles]=useState(servicios)

  // Calcular conteos pre-calculados una sola vez
  const conteoPorTipo = useMemo(() => {
    return calcularConteoPorTipo(servicios);
  }, [servicios]);

  // Función para filtrar servicios basándose en el estado filtros
  const filtrarServicios = (servicios, filtros) => {
    if (!servicios || !servicios.nodes) return { nodes: [] };

    return {
      ...servicios,
      nodes: servicios.nodes.filter(servicio => {
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
          if (!tieneSector) {
            return false;
          }
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
      })
    };
  };

  // Actualizar servicios visibles cuando cambien los filtros
  useEffect(() => {
    const serviciosFiltrados = filtrarServicios(servicios, filtros);
    setServiciosVisibles(serviciosFiltrados);
  }, [filtros, servicios]);

  const handleFiltrosChange = (data) => {
    // Crear un nuevo objeto de filtros combinando los datos recibidos
    // y manteniendo el sector actual como base
    const nuevosFiltros = {
      tipoServicio: data.tipoServicio || '',
      busqueda: data.busqueda || '',
      sectoresPais: data.sectoresPais && data.sectoresPais.length > 0 ? data.sectoresPais : [slug]
    };
    setFiltros(nuevosFiltros);
  }

  return (
    <>
      <PaginaInterior
        banner={sector.banner}
        titulo={sector.nombre}
        breadcrum={[{ label: "Home", link: "/" }, { label: sector.nombre, link: "/" + slug }]}>
        <div className="mb-4">

        <div className="flex flex-row">
        <FiltroServicios
          sectoresPaisVisibles={false}
          onFiltrosChange={handleFiltrosChange}
          filtroSectorPais={slug}
          conteoPorTipoProp={conteoPorTipo}
        />
        <div className="flex-3 pl-4 pr-4">
          <div className="text-xl font-semibold mb-1 text-left">
            Servicios Encontrados ({serviciosVisibles.nodes.length})
          </div>
          {serviciosVisibles.nodes && serviciosVisibles.nodes.length > 0 ? (
            serviciosVisibles.nodes.map((item, idx) => (
              <FilaServicios
                key={item.slug}
                nombre_servicio={item.nombre}
                sectores={item.sectores_pais}
                unidad={item.unidad}
                slug={item.slug}
                color_fondo={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No se encontraron servicios con los filtros aplicados
            </div>
          )}

        </div>
        </div>

        </div>
    </PaginaInterior>
    </>
  );
}

// Page query - obtiene el sector específico y SOLO los servicios de ese sector
export const query = graphql`
  query($slug: String!) {
    strapiSector(slug: { eq: $slug }) {
      nombre
      slug
      icono {
        url
        width
        height
        localFile {
          childImageSharp {
            gatsbyImageData(width: 280, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
      banner {
        url
        width
        height
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      } 
    }
    allStrapiServicio(
      filter: { sectores_pais: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      nodes {
        nombre
        slug
        contenido {
          data {
            contenido
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
`;

export async function config() {
  return ({ params }) => {
    return {
      defer: true,
    }
  }
}
