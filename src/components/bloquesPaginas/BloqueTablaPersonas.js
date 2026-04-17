import React from "react";
import Bloque from "./Bloque";
import TablaPersonasClient from "./TablaPersonasClient";

const BloqueTablaPersonas = ({ datosBloque }) => {
  const personas = datosBloque.etiqueta_persona?.personas || [];
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
