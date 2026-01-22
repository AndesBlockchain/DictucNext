import React from "react";
import Bloque from "./Bloque";
import ItemCarrusel from "../carrusel/ItemCarrusel"
import BotonCarrusel from "../carrusel/BotonCarrusel";

 const BloqueGaleria = ({ datosBloque }) => {
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
    <div className="carousel w-1/4">
      {datosBloque.FotosGaleria.map((foto, index) => (
        <ItemCarrusel 
          key={index}
          index={index+1} 
          foto={foto.Foto}
        />
      ))}
    </div>
    <div className="flex w-full justify-center gap-2 py-2">
    {datosBloque.FotosGaleria.map((foto, index) => (
      <BotonCarrusel index={index+1}/>
    ))}     
    </div>
    </Bloque>
  );
};

export default BloqueGaleria;
