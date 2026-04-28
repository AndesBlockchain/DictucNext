"use client"
import React, { useState, useEffect } from "react";
import SeparadorHorizontal from "./SeparadorHorizontal";
import Agente from "./Agente";

// Funciones puras extraidas fuera del componente

const normalizarServicios = (servicios) => {
  const arr = Array.isArray(servicios) ? servicios : servicios?.data;
  return Array.isArray(arr) ? arr : [];
};

const calcularConteoPorTipo = (serviciosArray) => {
  const conteo = {};
  serviciosArray.forEach(servicio => {
    const tipoSlug = servicio.tipo_de_servicio?.slug;
    if (tipoSlug) {
      conteo[tipoSlug] = (conteo[tipoSlug] || 0) + 1;
    }
  });
  return conteo;
};

const calcularConteoPorUnidad = (serviciosArray) => {
  const conteo = {};
  serviciosArray.forEach(servicio => {
    const unidadNombre = servicio.unidad?.nombre;
    if (unidadNombre) {
      conteo[unidadNombre] = (conteo[unidadNombre] || 0) + 1;
    }
  });
  return conteo;
};

const calcularConteoPorSector = (serviciosArray) => {
  const conteo = {};
  serviciosArray.forEach(servicio => {
    servicio.sectores_pais?.forEach(sector => {
      if (sector.slug) {
        conteo[sector.slug] = (conteo[sector.slug] || 0) + 1;
      }
    });
  });
  return conteo;
};

const normalizarTexto = (str) =>
  str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ?? '';

const filtrarServicios = (serviciosArray, filtros) => {
  return serviciosArray.filter(servicio => {
    if (filtros.busqueda && filtros.busqueda.trim() !== '') {
      const busqueda = normalizarTexto(filtros.busqueda);
      const nombreMatch = normalizarTexto(servicio.nombre).includes(busqueda);
      const contenidoMatch = normalizarTexto(servicio.contenido).includes(busqueda);
      if (!nombreMatch && !contenidoMatch) return false;
    }

    if (filtros.tiposServicio.length > 0) {
      if (!filtros.tiposServicio.includes(servicio.tipo_de_servicio?.slug)) return false;
    }

    if (filtros.sectoresPais.length > 0) {
      const servicioSectores = servicio.sectores_pais?.map(s => s.slug) || [];
      if (!filtros.sectoresPais.some(sector => servicioSectores.includes(sector))) return false;
    }

    if (filtros.unidades.length > 0) {
      const unidadNombre = servicio.unidad?.nombre;
      if (!unidadNombre || !filtros.unidades.includes(unidadNombre)) return false;
    }

    return true;
  });
};

const FiltroServicios = ({
  tipos_de_servicio: tiposDeServicio,
  sectores_pais: sectoresPais,
  unidades,
  tiposDeServicioVisibles = true,
  sectoresPaisVisibles = true,
  unidadesVisibles = true,
  onFiltrosChange,
  servicios,
  ejecutorInicial,
  sectorInicial
}) => {

  const [filtros, setFiltros] = useState({
    busqueda: '',
    tiposServicio: [],
    sectoresPais: sectorInicial ? [sectorInicial] : [],
    unidades: ejecutorInicial ? [ejecutorInicial] : []
  });

  const [conteoPorTipo, setConteoPorTipo] = useState({});
  const [conteoPorSector, setConteoPorSector] = useState({});
  const [conteoPorUnidad, setConteoPorUnidad] = useState({});

  useEffect(() => {
    const serviciosArray = normalizarServicios(servicios);
    if (serviciosArray.length === 0) {
      setConteoPorTipo({});
      setConteoPorSector({});
      setConteoPorUnidad({});
      if (typeof onFiltrosChange === 'function') {
        onFiltrosChange({
          busqueda: filtros.busqueda,
          tiposServicio: filtros.tiposServicio,
          sectoresPais: filtros.sectoresPais,
          serviciosFiltrados: []
        });
      }
      return;
    }

    setConteoPorTipo(calcularConteoPorTipo(serviciosArray));
    setConteoPorSector(calcularConteoPorSector(serviciosArray));
    setConteoPorUnidad(calcularConteoPorUnidad(serviciosArray));

    const filtrados = filtrarServicios(serviciosArray, filtros);

    if (typeof onFiltrosChange === 'function') {
      onFiltrosChange({
        busqueda: filtros.busqueda,
        tiposServicio: filtros.tiposServicio,
        sectoresPais: filtros.sectoresPais,
        serviciosFiltrados: filtrados
      });
    }
  }, [filtros, servicios]);

  // Handlers
  const handleFiltroTextChange = (e) => {
    setFiltros(prev => ({ ...prev, busqueda: e.target.value }));
  };

  const handleTipoServicioChange = (e) => {
    const tipo = e.target.value;
    const isChecked = e.target.checked;
    setFiltros(prev => ({
      ...prev,
      tiposServicio: isChecked
        ? prev.tiposServicio.includes(tipo) ? prev.tiposServicio : [...prev.tiposServicio, tipo]
        : prev.tiposServicio.filter(t => t !== tipo)
    }));
  };

  const handleSectoresPaisChange = (e) => {
    const sector = e.target.value;
    const isChecked = e.target.checked;
    setFiltros(prev => ({
      ...prev,
      sectoresPais: isChecked
        ? prev.sectoresPais.includes(sector) ? prev.sectoresPais : [...prev.sectoresPais, sector]
        : prev.sectoresPais.filter(s => s !== sector)
    }));
  };

  const handleUnidadesChange = (e) => {
    const unidad = e.target.value;
    const isChecked = e.target.checked;
    setFiltros(prev => ({
      ...prev,
      unidades: isChecked
        ? prev.unidades.includes(unidad) ? prev.unidades : [...prev.unidades, unidad]
        : prev.unidades.filter(u => u !== unidad)
    }));
  };

  return (
    <div className="border-1 border-x-gray-500 rounded-md text-xs p-4 w-full">
      <div className="font-semibold text-center text-base mb-2">Filtros de Búsqueda</div>

      <div className="mt-3 font-semibold">Búsqueda por palabra</div>
      <input
        type="text"
        value={filtros.busqueda}
        className="input input-bordered border border-gray-300 w-full my-2"
        onChange={handleFiltroTextChange}
        placeholder="Buscar servicios..."
      />

      {tiposDeServicioVisibles && tiposDeServicio?.data && (
        <div className="collapse collapse-arrow border-b border-gray-200">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title font-semibold px-0 min-h-0 py-2">Tipo de Servicio</div>
          <div className="collapse-content px-0">
            {[...tiposDeServicio.data].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')).map((item) => {
              const count = conteoPorTipo[item.slug] || 0;
              if (count === 0) return null;

              return (
                <div key={item.slug} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`servicio-${item.id}`}
                    name={item.nombre}
                    value={item.slug}
                    checked={filtros.tiposServicio.includes(item.slug)}
                    onChange={handleTipoServicioChange}
                  />
                  <label htmlFor={`servicio-${item.id}`} className="ml-2">
                    {item.nombre}
                  </label>
                  <div className="badge badge-soft badge-primary ml-auto">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sectoresPaisVisibles && sectoresPais?.data && (
        <div className="collapse collapse-arrow border-b border-gray-200">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title font-semibold px-0 min-h-0 py-2">Sector Productivo</div>
          <div className="collapse-content px-0">
            {sectoresPais.data.map(item => {
              const count = conteoPorSector[item.slug] || 0;
              if (count === 0) return null;

              return (
                <div key={item.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`sector-${item.id}`}
                    name={item.nombre}
                    value={item.slug}
                    checked={filtros.sectoresPais.includes(item.slug)}
                    onChange={handleSectoresPaisChange}
                  />
                  <label htmlFor={`sector-${item.id}`} className="ml-2">
                    {item.nombre}
                  </label>
                  <div className="badge badge-soft badge-primary ml-auto">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {unidadesVisibles && unidades?.data && (
        <div className="collapse collapse-arrow border-b border-gray-200">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title font-semibold px-0 min-h-0 py-2">Ejecutor</div>
          <div className="collapse-content px-0">
            {unidades.data.map(item => {
              const count = conteoPorUnidad[item.nombre] || 0;
              if (count === 0) return null;

              return (
                <div key={item.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`unidad-${item.id}`}
                    name={item.nombre}
                    value={item.nombre}
                    checked={filtros.unidades.includes(item.nombre)}
                    onChange={handleUnidadesChange}
                  />
                  <label htmlFor={`unidad-${item.id}`} className="ml-2">
                    {item.nombre}
                  </label>
                  <div className="badge badge-soft badge-primary ml-auto">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <SeparadorHorizontal />
      <Agente
        titulo="Asistente IA"
        franja={false}
        backgroundColor="bg-white"
        padding={1}
        marginTop={4}
      />
    </div>
  );
}

export default FiltroServicios;
