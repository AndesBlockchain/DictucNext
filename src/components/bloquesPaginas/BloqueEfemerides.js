import React from "react";
import Bloque from "./Bloque";
import ItemEfemerides from "./efemerides/ItemEfemerides";

const BloqueEfemerides = ({ datosBloque }) => {
  
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
        <div className="w-4/5">
          <ul className="timeline timeline-vertical [&>*:not(:last-child)]:after:bg-azul-dictuc">
          {datosBloque.Efemerides.map((efemeride, index) => (
            <ItemEfemerides 
              key={index} 
              agno={efemeride.agno} 
              evento={efemeride.Evento} 
              isFirst={index === 0}
              isLast={index === datosBloque.Efemerides.length - 1}
            />
          ))}
          </ul>
        </div>
    </Bloque>

);
};

export default BloqueEfemerides;