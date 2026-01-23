"use client"
import { React, useState, useEffect } from "react";
import FiltroServicios from "./FiltroServicios";
import FilaServicios from "./FilaServicios";

const Servicios = ({
  sectores_pais,
  tipos_de_servicio,
  sectores_pais_visibles,
  tipos_de_servicio_visibles,
  servicios,
  slug
}) => {

  // Estado: servicios filtrados
  const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios);

  // Sincronizar cuando cambien servicios externos
  useEffect(() => {
    setServiciosFiltrados(servicios);
  }, [servicios]);

  // Handler: recibe filtros aplicados desde FiltroServicios
  const handleFiltrosChange = (data) => {
    // data = { busqueda, tipoServicio, sectoresPais, serviciosFiltrados }
    setServiciosFiltrados(data.serviciosFiltrados);
  };

  return (
    <div className="mb-4">
      {/* Contenedor flex responsivo */}
      <div className="flex flex-row gap-4 md:gap-6">

        {/* Filtros: 100% móvil, 1/3 desktop */}
        <div className="md:flex-1">
          <FiltroServicios
            sectoresPaisVisibles={sectores_pais_visibles}
            tiposDeServicioVisibles={tipos_de_servicio_visibles}
            sectores_pais={sectores_pais}
            tipos_de_servicio={tipos_de_servicio}
            servicios={servicios}
            onFiltrosChange={handleFiltrosChange}
          />
        </div>

        {/* Listado: 100% móvil, 2/3 desktop */}
        <div className="md:flex-2">
          <div className="text-xl font-semibold mb-4 text-left">
            Servicios Encontrados ({serviciosFiltrados.length})
          </div>

          {serviciosFiltrados && serviciosFiltrados.length > 0 ? (
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
  );
}

export default Servicios;
