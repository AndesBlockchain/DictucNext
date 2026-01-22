import React, {useState} from "react";
import SeparadorHorizontal from "./SeparadorHorizontal";
import Agente from "./Agente";
import useSectoresPais from "../hooks/use-sectores-pais";
import useTipoDeServicio from "../hooks/use-tipo-de-servicios";

const FiltroServicios = ({
  tiposDeServicioVisibles = true,
  sectoresPaisVisibles = true,
  filtroTipoServicio="",
  filtroSectorPais="",
  onFiltrosChange,
  // Conteos pre-calculados (requeridos para mostrar badges)
  conteoPorTipoProp = null,
  conteoPorSectorProp = null
}) => {

    const tiposDeServicio = useTipoDeServicio();
    const sectoresPais = useSectoresPais();

    const [filtros, setFiltros] = useState({
      tipoServicio: '',
      sectoresPais: [],
      busqueda: ''
    });

    const handleFiltroTextChange = (e)=> {
      const newState = filtros
      filtros['busqueda']=e.target.value
      setFiltros(newState)
      onFiltrosChange(newState)
    }

    const handleTipoServicioChange = (e)=> {
      const newState = filtros
      filtros['tipoServicio']=e.target.value
      setFiltros(newState)
      onFiltrosChange(newState)
    }

    const handleSectoresPaisChange = (e) => {
      const sector = e.target.value;
      const isChecked = e.target.checked;

      if (isChecked) {
          // Agregar el sector si no está ya en la lista
          if (!filtros.sectoresPais.includes(sector)) {
              setFiltros(prev => {
                  const nuevoEstado = {
                      ...prev,
                      sectoresPais: [...prev.sectoresPais, sector]
                  };

                  // Llamar a onFiltrosChange con el nuevo estado
                  if (typeof onFiltrosChange === 'function') {
                      onFiltrosChange(nuevoEstado);
                  }

                  return nuevoEstado;
              });
          }
      } else {
          // Quitar el sector de la lista
          setFiltros(prev => {
              const nuevoEstado = {
                  ...prev,
                  sectoresPais: prev.sectoresPais.filter(s => s !== sector)
              };

              // Llamar a onFiltrosChange con el nuevo estado
              if (typeof onFiltrosChange === 'function') {
                  onFiltrosChange(nuevoEstado);
              }

              return nuevoEstado;
          });
      }
  }

return(
    <div className="border-1 border-x-gray-500 rounded-md text-xs p-4 flex-1">
    <div className="mb-1 font-semibold text-center font-md mb-2">Filtros de Búsqueda</div>
    <div className="mt-3 font-semibold">Búsqueda por palabra</div>
      <input type="text" style={{ width: "100%", padding: 8, margin: "8px 0", borderRadius: 4, border: "1px solid #ccc" }}
        onChange={handleFiltroTextChange} />
    {tiposDeServicioVisibles && conteoPorTipoProp && (
      <>
        <div className="font-semibold mb-1">Tipo de Servicio</div>
        <div>
        {tiposDeServicio && tiposDeServicio.nodes.map((item, index) =>
          conteoPorTipoProp[item.slug] && conteoPorTipoProp[item.slug] > 0 ? (
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
              <div className="badge badge-soft badge-primary" style={{ marginLeft: 'auto' }}>{conteoPorTipoProp[item.slug]}</div>
            </div>
          ) : null
        )}
      </div>
      </>
    )}
    {sectoresPaisVisibles && conteoPorSectorProp && (
      <>
        <div className="font-semibold mb-1 mt-1">Sector País</div>
        <div>
        {sectoresPais && sectoresPais.nodes.map(item => (
          conteoPorSectorProp[item.slug] && conteoPorSectorProp[item.slug] > 0 ? (
          <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <input
              type="checkbox"
              id={`sector-${item.id}`}
              name={item.nombre}
              value={item.slug}
              onChange={handleSectoresPaisChange}
              checked={filtros.sectoresPais.includes(item.slug)}
            />
            <label htmlFor={`sector-${item.id}`} style={{ marginLeft: 8 }}>
              {item.nombre}
            </label>
            <div className="badge badge-soft badge-primary" style={{ marginLeft: 'auto' }}>{conteoPorSectorProp[item.slug]}</div>
          </div>
          ) : null
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
