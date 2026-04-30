import React from "react";
import Bloque from "./Bloque";
import Instagram from "../Instagram";

const BloqueInstagram = ({ datosBloque }) => {
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="container m-auto max-w-8xl pl-8 pr-8">
        <Instagram />
      </div>
    </Bloque>
  );
};

export default BloqueInstagram;
