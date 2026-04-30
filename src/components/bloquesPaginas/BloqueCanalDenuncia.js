import React from "react";
import Bloque from "./Bloque";
import FormularioDenuncia from "../FormularioDenuncia";

const BloqueCanalDenuncia = ({ datosBloque }) => {
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="!text-left [&_legend]:!text-left [&_label]:!text-left">
        <FormularioDenuncia />
      </div>
    </Bloque>
  );
};

export default BloqueCanalDenuncia;
