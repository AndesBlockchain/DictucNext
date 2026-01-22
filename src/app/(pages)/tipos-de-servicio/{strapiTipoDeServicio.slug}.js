import React, {useState, useEffect, useMemo} from "react";
import { graphql } from "gatsby";
import PaginaInterior from "../../components/PaginaInterior";
import FranjaAzul from "../../components/FranjaAzul";
import FilaServicios from "../../components/FilaServicios";
import FiltroServicios from "../../components/FiltroServicios";
import { calcularConteoPorSector } from "../../helpers/conteo-servicios";

export default function HomeTipoServicio({ data, pageContext })
{
  const slug = pageContext.slug;
  const tipoServicio = data.strapiTipoDeServicio;
  const servicios = data.allStrapiServicio;

  const [filtros,setFiltros]= useState({
    tipoServicio: '',
    sectoresPais: [],
    busqueda: ''
  })

  const [serviciosVisibles,setServiciosVisibles]=useState(servicios)

  // Calcular conteos pre-calculados una sola vez
  const conteoPorSector = useMemo(() => {
    return calcularConteoPorSector(servicios);
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
    const nuevosFiltros = {
      tipoServicio: data.tipoServicio || '',
      busqueda: data.busqueda || '',
      sectoresPais: data.sectoresPais && data.sectoresPais.length > 0 ? data.sectoresPais : []
    };
    setFiltros(nuevosFiltros);
  }

  return (
    <PaginaInterior
      fallback={process.env.STRAPI_API_URL + tipoServicio?.BannerBuscadorServicios?.url}
      titulo={tipoServicio.nombre}
      breadcrum={[{ label: "Home", link: "/" }, { label: tipoServicio.nombre, link: "/" + slug }]}>
        <div className="mb-4">
        <div className="flex flex-row">
        <FiltroServicios
          tiposDeServicioVisibles={false}
          onFiltrosChange={handleFiltrosChange}
          filtroTipoServicio={slug}
          conteoPorSectorProp={conteoPorSector}
        />
        <div className="flex-3 pl-4 pr-4">
          <div className="text-xl font-semibold mb-1 text-center">Servicios Encontrados</div>
          <FranjaAzul />
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
  );
}

// Page query - obtiene el tipo de servicio específico y SOLO los servicios de ese tipo
export const query = graphql`
  query($slug: String!) {
    strapiTipoDeServicio(slug: { eq: $slug }) {
      nombre
      slug
      fotoPortada {
        height
        url
        width
      }
      Icono {
        height
        url
        width
      }
      BannerBuscadorServicios {
        height
        url
        width
      }
    }
    allStrapiServicio(
      filter: { tipo_de_servicio: { slug: { eq: $slug } } }
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
