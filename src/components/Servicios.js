"use client"
import {React, useState, useEffect} from "react";
import FiltroServicios from "./FiltroServicios";
import FilaServicios from "./FilaServicios";

const Servicios = ({sectores_pais, tipos_de_servicio, sectores_pais_visibles, 
                    tipos_de_servicio_visibles, servicios, slug}) => {


  const [filtros, setFiltros] = useState({
    busqueda: '',
    tipoServicio: '',
    sectoresPais: [],
    conteoPorTipo: 1,
    serviciosFiltrados: []
  });

  const [serviciosFiltrados, setServiciosFiltrados] = useState(servicios);

    return (
        <div className="mb-4">
        <FiltroServicios
          sectoresPaisVisibles={sectores_pais_visibles}
          tiposDeServicioVisibles={tipos_de_servicio_visibles}
          filtroSectorPais={slug}
          conteoPorTipoProp="1"
          sectores_pais={sectores_pais}
          tipos_de_servicio={tipos_de_servicio}
          servicios={servicios}
        />
        <div className="flex flex-row">

        <div className="flex-3 pl-4 pr-4">
          <div className="text-xl font-semibold mb-1 text-left">
            Servicios Encontrados ({servicios.length})
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
