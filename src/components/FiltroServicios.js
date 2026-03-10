"use client"
import { React, useState, useEffect } from "react";
import SeparadorHorizontal from "./SeparadorHorizontal";
import Agente from "./Agente";

const FiltroServicios = ({
  tipos_de_servicio,
  sectores_pais,
  unidades,
  tiposDeServicioVisibles = true,
  sectoresPaisVisibles = true,
  unidadesVisibles = true,
  onFiltrosChange,
  servicios
}) => {

  const tiposDeServicio = tipos_de_servicio;
  const sectoresPais = sectores_pais;

  // Estado de filtros
  const [filtros, setFiltros] = useState({
    busqueda: '',
    tiposServicio: [],
    sectoresPais: [],
    unidades: []
  });

  // Estados para servicios filtrados y conteos
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [conteoPorTipo, setConteoPorTipo] = useState({});
  const [conteoPorSector, setConteoPorSector] = useState({});
  const [conteoPorUnidad, setConteoPorUnidad] = useState({});

  // Función para calcular conteo por tipo de servicio
  const calcularConteoPorTipo = (servicios) => {
    // Normalizar servicios: puede ser array directo o { data: [...] }
    const serviciosArray = Array.isArray(servicios) ? servicios : servicios?.data;
    if (!serviciosArray || !Array.isArray(serviciosArray)) return {};

    const conteo = {};

    serviciosArray.forEach(servicio => {
      const tipoSlug = servicio.tipo_de_servicio?.slug;
      if (tipoSlug) {
        conteo[tipoSlug] = (conteo[tipoSlug] || 0) + 1;
      }
    });

    return conteo;
  };

  // Función para calcular conteo por unidad (ejecutor)
  const calcularConteoPorUnidad = (servicios) => {
    const serviciosArray = Array.isArray(servicios) ? servicios : servicios?.data;
    if (!serviciosArray || !Array.isArray(serviciosArray)) return {};

    const conteo = {};

    serviciosArray.forEach(servicio => {
      const unidadNombre = servicio.unidad?.nombre;
      if (unidadNombre) {
        conteo[unidadNombre] = (conteo[unidadNombre] || 0) + 1;
      }
    });

    return conteo;
  };

  // Función para calcular conteo por sector país
  const calcularConteoPorSector = (servicios) => {
    // Normalizar servicios: puede ser array directo o { data: [...] }
    const serviciosArray = Array.isArray(servicios) ? servicios : servicios?.data;
    if (!serviciosArray || !Array.isArray(serviciosArray)) return {};

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

  // Función para filtrar servicios
  const filtrarServicios = (servicios, filtros) => {
    // Normalizar servicios: puede ser array directo o { data: [...] }
    const serviciosArray = Array.isArray(servicios) ? servicios : servicios?.data;
    if (!serviciosArray || !Array.isArray(serviciosArray)) return [];

    return serviciosArray.filter(servicio => {
      // Filtro 1: Búsqueda de texto
      if (filtros.busqueda && filtros.busqueda.trim() !== '') {
        const normalizar = (str) => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ?? '';
        const busqueda = normalizar(filtros.busqueda);
        const nombreMatch = normalizar(servicio.nombre).includes(busqueda);
        const contenidoMatch = normalizar(servicio.contenido).includes(busqueda);

        if (!nombreMatch && !contenidoMatch) {
          return false;
        }
      }

      // Filtro 2: Tipos de servicio (OR: cualquier tipo seleccionado)
      if (filtros.tiposServicio && filtros.tiposServicio.length > 0) {
        if (!filtros.tiposServicio.includes(servicio.tipo_de_servicio?.slug)) {
          return false;
        }
      }

      // Filtro 3: Sectores país (OR: cualquier sector seleccionado)
      if (filtros.sectoresPais && filtros.sectoresPais.length > 0) {
        const servicioSectores = servicio.sectores_pais?.map(s => s.slug) || [];
        const tieneSector = filtros.sectoresPais.some(sector =>
          servicioSectores.includes(sector)
        );

        if (!tieneSector) {
          return false;
        }
      }

      // Filtro 4: Unidades (OR: cualquier unidad seleccionada)
      if (filtros.unidades && filtros.unidades.length > 0) {
        const unidadNombre = servicio.unidad?.nombre;
        if (!unidadNombre || !filtros.unidades.includes(unidadNombre)) {
          return false;
        }
      }

      return true;
    });
  };

  // useEffect principal: calcula conteos y filtra servicios
  useEffect(() => {
    // Normalizar y validar servicios
    const serviciosArray = Array.isArray(servicios) ? servicios : servicios?.data;
    if (!serviciosArray || !Array.isArray(serviciosArray) || serviciosArray.length === 0) {
      setServiciosFiltrados([]);
      setConteoPorTipo({});
      setConteoPorSector({});
      return;
    }

    // 1. Calcular conteos sobre TODOS los servicios (sin filtrar)
    const conteoTipos = calcularConteoPorTipo(servicios);
    const conteoSectores = calcularConteoPorSector(servicios);
    const conteoUnidades = calcularConteoPorUnidad(servicios);

    setConteoPorTipo(conteoTipos);
    setConteoPorSector(conteoSectores);
    setConteoPorUnidad(conteoUnidades);

    // 2. Aplicar filtros
    const filtrados = filtrarServicios(servicios, filtros);

    setServiciosFiltrados(filtrados);

    // 3. Notificar al padre
    if (typeof onFiltrosChange === 'function') {
      onFiltrosChange({
        busqueda: filtros.busqueda,
        tiposServicio: filtros.tiposServicio,
        sectoresPais: filtros.sectoresPais,
        serviciosFiltrados: filtrados
      });
    }

  }, [filtros, servicios, onFiltrosChange]);

  // Handlers de eventos
  const handleFiltroTextChange = (e) => {
    const value = e.target.value;
    setFiltros(prev => ({ ...prev, busqueda: value }));
  }

  const handleTipoServicioChange = (e) => {
    const tipo = e.target.value;
    const isChecked = e.target.checked;

    setFiltros(prev => {
      if (isChecked) {
        if (!prev.tiposServicio.includes(tipo)) {
          return { ...prev, tiposServicio: [...prev.tiposServicio, tipo] };
        }
        return prev;
      } else {
        return { ...prev, tiposServicio: prev.tiposServicio.filter(t => t !== tipo) };
      }
    });
  }

  const handleSectoresPaisChange = (e) => {
    const sector = e.target.value;
    const isChecked = e.target.checked;

    setFiltros(prev => {
      if (isChecked) {
        if (!prev.sectoresPais.includes(sector)) {
          return { ...prev, sectoresPais: [...prev.sectoresPais, sector] };
        }
        return prev;
      } else {
        return { ...prev, sectoresPais: prev.sectoresPais.filter(s => s !== sector) };
      }
    });
  }

  const handleUnidadesChange = (e) => {
    const unidad = e.target.value;
    const isChecked = e.target.checked;

    setFiltros(prev => {
      if (isChecked) {
        if (!prev.unidades.includes(unidad)) {
          return { ...prev, unidades: [...prev.unidades, unidad] };
        }
        return prev;
      } else {
        return { ...prev, unidades: prev.unidades.filter(u => u !== unidad) };
      }
    });
  }

  return (
    <div className="border-1 border-x-gray-500 rounded-md text-xs p-4 w-full">
      <div className="mb-1 font-semibold text-center font-md mb-2">Filtros de Búsqueda</div>

      <div className="mt-3 font-semibold">Búsqueda por palabra</div>
      <input
        type="text"
        value={filtros.busqueda}
        style={{ width: "100%", padding: 8, margin: "8px 0", borderRadius: 4, border: "1px solid #ccc" }}
        onChange={handleFiltroTextChange}
        placeholder="Buscar servicios..."
      />

      {tiposDeServicioVisibles && tiposDeServicio && tiposDeServicio.data && (
        <>
          <div className="font-semibold mb-1">Tipo de Servicio</div>
          <div>
            {tiposDeServicio.data.map((item) => {
              const count = conteoPorTipo[item.slug] || 0;
              // Ocultar tipos sin servicios
              if (count === 0) return null;

              return (
                <div key={item.slug} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <input
                    type="checkbox"
                    id={`servicio-${item.id}`}
                    name={item.nombre}
                    value={item.slug}
                    checked={filtros.tiposServicio.includes(item.slug)}
                    onChange={handleTipoServicioChange}
                  />
                  <label htmlFor={`servicio-${item.id}`} style={{ marginLeft: 8 }}>
                    {item.nombre}
                  </label>
                  <div className="badge badge-soft badge-primary" style={{ marginLeft: 'auto' }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {sectoresPaisVisibles && sectoresPais && sectoresPais.data && (
        <>
          <div className="font-semibold mb-1 mt-1">Sector País</div>
          <div>
            {sectoresPais.data.map(item => {
              const count = conteoPorSector[item.slug] || 0;
              // Ocultar sectores sin servicios
              if (count === 0) return null;

              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <input
                    type="checkbox"
                    id={`sector-${item.id}`}
                    name={item.nombre}
                    value={item.slug}
                    checked={filtros.sectoresPais.includes(item.slug)}
                    onChange={handleSectoresPaisChange}
                  />
                  <label htmlFor={`sector-${item.id}`} style={{ marginLeft: 8 }}>
                    {item.nombre}
                  </label>
                  <div className="badge badge-soft badge-primary" style={{ marginLeft: 'auto' }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {unidadesVisibles && unidades && unidades.data && (
        <>
          <div className="font-semibold mb-1 mt-1">Ejecutor</div>
          <div>
            {unidades.data.map(item => {
              const count = conteoPorUnidad[item.nombre] || 0;
              // Ocultar unidades sin servicios
              if (count === 0) return null;

              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <input
                    type="checkbox"
                    id={`unidad-${item.id}`}
                    name={item.nombre}
                    value={item.nombre}
                    checked={filtros.unidades.includes(item.nombre)}
                    onChange={handleUnidadesChange}
                  />
                  <label htmlFor={`unidad-${item.id}`} style={{ marginLeft: 8 }}>
                    {item.nombre}
                  </label>
                  <div className="badge badge-soft badge-primary" style={{ marginLeft: 'auto' }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </>
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
