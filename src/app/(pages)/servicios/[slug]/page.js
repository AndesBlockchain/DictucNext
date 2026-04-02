import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import CardServicio from "@/components/CardServicio";
import FranjaAzul from "@/components/FranjaAzul";
import Contacto from "@/components/Contacto";
import StrapiImage from "@/components/StrapiImage";
const bannerLaboratorio = "/images/BannerLaboratorioServicios.webp";
const iconoUtilidad = "/images/Utilidad.png";
const iconoExperiencia = "/images/Experiencia.png";
const iconoPotenciales = "/images/PotencialesClientes.png";

import useServicio from "@/hooks/use-servicio";

export default async function Servicio({ params }) {

  const { slug } = await params;
  const servicio = await useServicio(slug);
 console.log(servicio.tipo_de_servicio.IconoFichaProducto.formats.small.url)
  const strapiApiUrl = process.env.STRAPI_API_URL;
  return (
    <PaginaInterior
      banner={servicio?.banner}
      fallback={bannerLaboratorio}
      titulo_visible={false}
      icono_secundario={servicio.tipo_de_servicio.IconoFichaProducto.formats.small.url}
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Servicios", link: "/" },
        { label: servicio.nombre }
      ]}
    >
      <div className="text-2xl font-bold mt-2 mb-2 ml-10 text-left"><h2>{servicio.nombre}</h2></div>
      <div className="ml-10 mb-4"><span className="text-azul-dictuc font-bold">Ejecutor:</span> {servicio.unidad.nombre}  <span className="text-azul-dictuc font-bold"> | Tipo de Servicio:</span> {servicio.tipo_de_servicio.nombre} <span className="text-azul-dictuc font-bold"> | Sectores:</span> {servicio.sectores_pais.map(sector => sector.nombre).join(", ")}</div>
      <div className="bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div id="tarjetas" className="flex flex-wrap p-8 justify-center [&_h3]:uppercase [&_h3]:!text-azul-dictuc [&_h3]:mt-2">
    
          <div className="lg:basis-1/3 md:basis-1/2 basis-full lg:pl-8 lg:pr-8 md:pl-8 md:pr-8 pl-4 pr-4 pb-4">
          <CardServicio
            key={1}
            titulo="Utilidad"
            icono={iconoUtilidad}
            contenido={servicio.utilidad || "Por completar"}
          />
          </div>
          <div className="lg:basis-1/3 md:basis-1/2 basis-full lg:pl-8 lg:pr-8 md:pl-8 md:pr-8 pl-4 pr-4 pb-4">
          <CardServicio
            key={2}
            titulo="Experiencia"
            icono={iconoExperiencia}
            contenido={servicio.experiencia || "Por completar"}
          />
          </div>
          <div className="lg:basis-1/3 md:basis-1/2 basis-full lg:pl-8 lg:pr-8 md:pl-8 md:pr-8 pl-4 pr-4 pb-4">
          <CardServicio
            key={3}
            titulo="Potenciales Clientes"
            icono={iconoPotenciales}
            contenido={servicio.potenciales_clientes || "Por completar"}
          />
          </div>
        </div>
        <div className="flex justify-center mb-4 pb-8 bg-gray-100">
          <a href="#cotizar" className="bg-azul-dictuc text-white font-bold rounded-full px-4 py-2 text-xs hover:bg-azul-dictuc/90 transition-all">
            Cotizar servicio
          </a>
        </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
      <FranjaAzul />
      <div className="ml-8 mr-8">
      <div className="text-lg text-center mt-2 uppercase font-semibold">
        <span className="text-azul-dictuc">Descripción</span> del Servicio
      </div>
      <div className="mt-6 mb-12" dangerouslySetInnerHTML={{ __html: servicio.contenido }} />
      </div>

      <StrapiImage
        imagen={servicio.imagen} className="w-[300px] mx-auto rounded-lg h-auto mt-6 mb-6"
      />

      {servicio.tabla_especificaciones && (
        <div className="ml-8 mr-8 border border-gray-200">
          <div className="text-lg text-center mt-2 uppercase font-semibold">
            <span className="text-azul-dictuc">Especificaciones</span> Técnicas
          </div>
          <div className="mt-6 mb-12" dangerouslySetInnerHTML={{ __html: servicio.tabla_especificaciones }} />
        </div>
      )}

      <div id="cotizar" className="w-full md:w-3/4 flex justify-center mx-auto mb-6">
        <Contacto
          titulo="Solicitud de <span class='text-azul-dictuc'>Cotización</span>"
          border={true}
          isCotizacion={true}
          servicio={slug}
          strapiApiUrl={strapiApiUrl}
          codigoUnidad={servicio.unidad.codigoDictuc}
        />
      </div>

      </div>
    </PaginaInterior>
  );
}