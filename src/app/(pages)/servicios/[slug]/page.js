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
  const strapiApiUrl = process.env.STRAPI_API_URL;
  return (
    <PaginaInterior
      banner={servicio.tipo_de_servicio.BannerBuscadorServicios.url}
      fallback={bannerLaboratorio}
      titulo={servicio.nombre}
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Servicios", link: "/" },
        { label: servicio.nombre }
      ]}
    >
      <div className="ml-4 mr-4 mt-4"><strong>Tipo de Servicio:</strong> {servicio.tipo_de_servicio.nombre} </div>
      <div className="ml-4 mr-4 mt-2"><strong>Ejecutor:</strong> {servicio.unidad.nombre}</div>
      <div className="ml-4 mr-4 mb-8 mt-2">
        <strong>Sectores: </strong>
        {servicio.sectores_pais.map(sector => (
          <span key={sector.slug}>{sector.nombre}</span>
        ))}
      </div>

      <div>
        <div id="tarjetas" className="flex flex-wrap p-8 bg-gray-200 justify-center">
          <div className="lg:basis-1/3 md:basis-1/2 basis-full lg:pl-12 lg:pr-12 md:pl-8 md:pr-8 pl-4 pr-4 pb-4">
          <CardServicio
            key={1}
            titulo="Utilidad"
            icono={iconoUtilidad}
            contenido={servicio.utilidad || "Por completar"}
          />
          </div>
          <div className="lg:basis-1/3 md:basis-1/2 basis-full lg:pl-12 lg:pr-12 md:pl-8 md:pr-8 pl-4 pr-4 pb-4">
          <CardServicio
            key={2}
            titulo="Experiencia"
            icono={iconoExperiencia}
            contenido={servicio.experiencia || "Por completar"}
          />
          </div>
          <div className="lg:basis-1/3 md:basis-1/2 basis-full lg:pl-12 lg:pr-12 md:pl-8 md:pr-8 pl-4 pr-4 pb-4">
          <CardServicio
            key={3}
            titulo="Potenciales Clientes"
            icono={iconoPotenciales}
            contenido={servicio.potenciales_clientes || "Por completar"}
          />
          </div>
        </div>
        <div className="flex justify-center mb-4 pb-8 bg-gray-200">
          <a href="#cotizar" className="bg-azul-dictuc text-white px-4 py-1 rounded-full shadow hover:bg-gray-900 transition-all text-sm">
            Cotizar servicio
          </a>
        </div>
      </div>

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

      <div id="cotizar" className="w-full md:w-1/2 flex justify-center mx-auto mb-6">
        <Contacto
          titulo="Solicitud de <span class='text-azul-dictuc'>Cotización</span>"
          border={true}
          isCotizacion={true}
          servicio={slug}
          strapiApiUrl={strapiApiUrl}
          codigoUnidad={servicio.unidad.codigoDictuc}
        />
      </div>
    </PaginaInterior>
  );
}