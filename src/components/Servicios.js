"use client"
import React, { useState, useCallback } from "react";
import FiltroServicios from "./FiltroServicios";
import FilaServicios from "./FilaServicios";

const Servicios = ({
  sectores_pais,
  tipos_de_servicio,
  unidades,
  sectores_pais_visibles,
  tipos_de_servicio_visibles,
  servicios,
  ejecutorInicial,
  slug
}) => {
  const serviciosArray = Array.isArray(servicios) ? servicios : servicios?.data ?? [];
  const [serviciosFiltrados, setServiciosFiltrados] = useState(serviciosArray);
  const drawerId = "drawer-filtros-servicios";

  const handleFiltrosChange = useCallback((data) => {
    setServiciosFiltrados(data.serviciosFiltrados);
  }, []);

  return (
    <div className="mb-4 container m-auto max-w-6xl">
      <div className="drawer md:drawer-open">
        <input id={drawerId} type="checkbox" className="drawer-toggle" />

        {/* Contenido principal: listado */}
        <div className="drawer-content md:pl-4">
          <div className="flex items-center justify-between mb-4 ml-2 md:ml-0">
            <div className="text-xl font-semibold">
              Servicios Encontrados ({serviciosFiltrados.length})
            </div>
            <label htmlFor={drawerId} className="btn btn-primary btn-sm md:hidden">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
            </label>
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

        {/* Panel lateral: filtros */}
        <div className="drawer-side z-40">
          <label htmlFor={drawerId} className="drawer-overlay" aria-label="Cerrar filtros"></label>
          <div className="bg-white min-h-full w-72 p-2 pt-4">
            <div className="flex justify-end md:hidden">
              <label htmlFor={drawerId} className="btn btn-sm btn-ghost" aria-label="Cerrar filtros">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </label>
            </div>
            <FiltroServicios
              sectoresPaisVisibles={sectores_pais_visibles}
              tiposDeServicioVisibles={tipos_de_servicio_visibles}
              sectores_pais={sectores_pais}
              tipos_de_servicio={tipos_de_servicio}
              unidades={unidades}
              servicios={servicios}
              onFiltrosChange={handleFiltrosChange}
              ejecutorInicial={ejecutorInicial}
              sectorInicial={slug}
            />
            <label htmlFor={drawerId} className="btn btn-primary w-full mt-4 md:hidden">
              Ver {serviciosFiltrados.length} resultados
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
