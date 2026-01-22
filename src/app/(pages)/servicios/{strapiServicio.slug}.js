import React from "react";
import { graphql } from "gatsby";
import PaginaInterior from "../../components/PaginaInterior";
import CardServicio from "../../components/CardServicio";
import Badge from "../../components/Badge";
import FranjaAzul from "../../components/FranjaAzul";
import Contacto from "../../components/Contacto";
import bannerLaboratorio from "../../images/BannerLaboratorioServicios.webp";
import iconoUtilidad from "../../images/Utilidad.png";
import iconoExperiencia from "../../images/Experiencia.png";
import iconoPotenciales from "../../images/PotencialesClientes.png";

export default function Servicio({ data, pageContext }) {
  const servicio = data.strapiServicio;
  const slug = pageContext.slug;

  return (
    <PaginaInterior
      banner={servicio.tipo_de_servicio.BannerBuscadorServicios}
      fallback={bannerLaboratorio}
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Servicios", link: "/" },
        { label: servicio.nombre }
      ]}
    >
      <h1 className="text-xl font-bold uppercase">{servicio.nombre}</h1>
      <div className="mt-4"><strong>Tipo de Servicio:</strong> {servicio.tipo_de_servicio.nombre} </div>
      <div className="mt-2"><strong>Ejecutor:</strong> {servicio.unidad.nombre}</div>
      <div className="mb-8 mt-2">
        <strong>Sectores: </strong>
        {servicio.sectores_pais.map(sector => (
          <span key={sector.slug}>{sector.nombre}</span>
        ))}
      </div>

      <div>
        <div id="tarjetas" className="flex flex-row p-8 bg-gray-200 flex-wrap justify-center items-stretch gap-8">
          <CardServicio
            key={1}
            titulo="Utilidad"
            icono={iconoUtilidad}
            contenido={servicio.utilidad?.data?.utilidad || "Por completar"}
          />
          <CardServicio
            key={2}
            titulo="Experiencia"
            icono={iconoExperiencia}
            contenido={servicio.experiencia?.data?.experiencia || "Por completar"}
          />
          <CardServicio
            key={3}
            titulo="Potenciales Clientes"
            icono={iconoPotenciales}
            contenido={servicio.potenciales_clientes?.data?.potenciales_clientes || "Por completar"}
          />
        </div>
        <div className="flex justify-center mb-4 pb-8 bg-gray-200">
          <a href="#cotizar" className="bg-azul-dictuc text-white px-4 py-1 rounded-full shadow hover:bg-gray-900 transition-all text-sm">
            Cotizar servicio
          </a>
        </div>
      </div>

      <FranjaAzul />
      <div className="text-lg text-center mt-2 uppercase font-semibold">
        <span className="text-azul-dictuc">Descripción</span> del Servicio
      </div>
      <div className="mt-6 mb-12" dangerouslySetInnerHTML={{ __html: servicio.contenido.data.contenido }} />
      <div id="cotizar" className="w-full md:w-1/2 flex justify-center mx-auto mb-6">
        <Contacto
          titulo="Solicitud de <span class='text-azul-dictuc'>Cotización</span>"
          border={true}
          isCotizacion={true}
          servicio={slug}
        />
      </div>
    </PaginaInterior>
  );
}

// Page query - solo obtiene el servicio específico basado en el slug
export const query = graphql`
  query($slug: String!) {
    strapiServicio(slug: { eq: $slug }) {
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
      contenido {
        data {
          contenido
        }
      }
      tipo_de_servicio {
        nombre
        slug      
        BannerBuscadorServicios{
          url
        }
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
`;

export async function config() {
  return ({ params }) => {
    return {
      defer: true,
    }
  }
}
