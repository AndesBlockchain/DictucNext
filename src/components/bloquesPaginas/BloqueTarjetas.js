import React from "react";
import Bloque from "./Bloque";
import CardServicio from "../CardServicio";

const BloqueTarjetas = ({ datosBloque }) => {


  const tarjetasPorFila = datosBloque.TarjetasPorFila

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
    <div id="tarjetas" className="flex flex-col gap-8">
      {Array.from({ length: Math.ceil(datosBloque.Tarjetas.length / tarjetasPorFila) }, (_, rowIndex) => {
        const startIndex = rowIndex * tarjetasPorFila;
        const endIndex = startIndex + tarjetasPorFila;
        const tarjetasEnFila = datosBloque.Tarjetas.slice(startIndex, endIndex);
        
        return (
          <div key={rowIndex} className="flex flex-row justify-center items-stretch gap-8 w-full">
            {tarjetasEnFila.map((tarjeta, index) => (
              <div key={startIndex + index} className="flex-1 max-w-xs">
                <CardServicio 
                  titulo={tarjeta.Titulo || ""} 
                  color_fondo={tarjeta?.color_fondo?.Codigo || "white"}
                  color_texto={tarjeta?.color_texto?.Codigo || "black"}
                  imagen={tarjeta.Imagen} 
                  contenido={tarjeta.Texto?.data?.Texto || ""} 
                  callToAction={tarjeta.CallToAction}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
    </Bloque>
  );
};

export default BloqueTarjetas;