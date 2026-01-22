"use client"
import { React, useState, useEffect } from "react";
import SeparadorHorizontal from "./SeparadorHorizontal";
import Agente from "./Agente";

const FiltroServicios = ({
  tipos_de_servicio,
  sectores_pais,
  tiposDeServicioVisibles = true,
  sectoresPaisVisibles = true,
  onFiltrosChange,
  servicios
}) => {

  const tiposDeServicio = tipos_de_servicio;
  const sectoresPais = sectores_pais;

  const [filtros, setFiltros] = useState({
    busqueda: '',
    tipoServicio: '',reiv
    sectoresPais: [],
  });

  const handleFiltroTextChange = (e) => {
    const value = e.target.value;
    setFiltros(prev => ({ ...prev, busqueda: value }));
  }

  const handleTipoServicioChange = (e) => {
    const value = e.target.value;
    setFiltros(prev => ({ ...prev, tipoServicio: value }));
  }

  const handleSectoresPaisChange = (e) => {
    const sector = e.target.value;
    const isChecked = e.target.checked;

    setFiltros(prev => {
      if (isChecked) {
        if (!prev.sectoresPais.includes(sector)) {
          return { ...prev, sectoresPais: [...prev.sectoresPais, sector] };
        }
      } else {
        return { ...prev, sectoresPais: prev.sectoresPais.filter(s => s !== sector) };
      }
    });
  }

  return (
    <div className="border-1 border-x-gray-500 rounded-md text-xs p-4 flex-1">
      <div className="mb-1 font-semibold text-center font-md mb-2">Filtros de Búsqueda</div>
      <div className="mt-3 font-semibold">Búsqueda por palabra</div>
      <input type="text" style={{ width: "100%", padding: 8, margin: "8px 0", borderRadius: 4, border: "1px solid #ccc" }}
        onChange={handleFiltroTextChange} />
      {tiposDeServicioVisibles && (
        <>
          <div className="font-semibold mb-1">Tipo de Servicio</div>
          <div>
            {tiposDeServicio.data.map((item, index) =>
              <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <input
                  type="radio"
                  id={`servicio-${item.id}`}
                  name="tipo-servicio"
                  value={item.slug}
                  onChange={handleTipoServicioChange}
                />
                <label htmlFor={`servicio-${item.id}`} style={{ marginLeft: 8 }}>
                  {item.nombre}
                </label>
                <div className="badge badge-soft badge-primary" style={{ marginLeft: 'auto' }}></div>
              </div>
            )}
          </div>
        </>
      )}
      {sectoresPaisVisibles && (
        <>
          <div className="font-semibold mb-1 mt-1">Sector País</div>
          <div>
            {sectoresPais.data.map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <input
                  type="checkbox"
                  id={`sector-${item.id}`}
                  name={item.nombre}
                  value={item.slug}
                  onChange={handleSectoresPaisChange}
                />
                <label htmlFor={`sector-${item.id}`} style={{ marginLeft: 8 }}>
                  {item.nombre}
                </label>
                <div className="badge badge-soft badge-primary" style={{ marginLeft: 'auto' }}></div>
              </div>
            ))}
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
