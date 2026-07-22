import React from "react";
import Bloque from "./Bloque";
import TablaPersonasClient from "./TablaPersonasClient";

const mezclarArreglo = (arr) => {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const BloqueTablaPersonas = ({ datosBloque }) => {
  const personas = mezclarArreglo(datosBloque.etiqueta_persona?.personas || []);
  const cantidadFilas = datosBloque.CantidadFilas || 10;

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="my-8 px-8">
        <TablaPersonasClient personas={personas} cantidadFilas={cantidadFilas} />
      </div>
    </Bloque>
  );
};

export default BloqueTablaPersonas;
