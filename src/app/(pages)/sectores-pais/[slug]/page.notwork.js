import React from "react";
import { notFound } from "next/navigation";
import PaginaInterior from "@/components/PaginaInterior";
import FilaServicios from "@/components/FilaServicios";
import FiltroServiciosClient from "@/components/FiltroServiciosClient";
import useServiciosBySector from "@/hooks/use-servicios-by-sector";
import useSectorBySlug from "@/hooks/use-sector-by-slug";
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import { calcularConteoPorTipo } from "@/helpers/conteo-servicios";
import { filtrarServicios } from "@/lib/filter-servicios";

export default async function SectorPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Extraer filtros de URL
  const tipoServicio = resolvedSearchParams?.tipo || '';
  const busqueda = resolvedSearchParams?.busqueda || '';

  // Fetch datos server-side (en paralelo)
  const [sector, serviciosData, tiposDeServicio] = await Promise.all([
    useSectorBySlug(slug),
    useServiciosBySector(slug),
    useTipoDeServicio()
  ]);

  if (!sector) {
    notFound();
  }

  // Calcular conteos ANTES de filtrar (para mostrar badges correctos)
  const conteoPorTipo = calcularConteoPorTipo(serviciosData);

  // Aplicar filtros server-side
  const filtros = {
    tipoServicio,
    sectoresPais: [slug],
    busqueda
  };

  const serviciosFiltrados = serviciosData



  console.log("servicios filtrados",serviciosFiltrados);

  return (
    <PaginaInterior
      banner={sector.banner}
      titulo={sector.nombre}
      breadcrum={[
        { label: "Home", link: "/" },
        { label: sector.nombre, link: `/sectores-pais/${slug}` }
      ]}
    >
      <div className="mb-4">
        <div className="flex flex-row">
          <FiltroServiciosClient
            currentTipo={tipoServicio}
            currentBusqueda={busqueda}
            conteoPorTipo={conteoPorTipo}
            tiposDeServicio={tiposDeServicio}
          />

          <div className="flex-3 pl-4 pr-4">
            <div className="text-xl font-semibold mb-1 text-left">
              Servicios Encontrados
            </div>

            {serviciosFiltrados.length > 0 ? (
              serviciosFiltrados.map((item, idx) => (
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

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sector = await useSectorBySlug(slug);

  return {
    title: sector ? `${sector.nombre} - Servicios DICTUC` : 'Sector - DICTUC',
    description: `Servicios especializados de ${sector?.nombre || 'DICTUC'}`
  };
}
