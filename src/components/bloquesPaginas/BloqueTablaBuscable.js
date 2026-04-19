import React from "react";
import TablaBuscableClient from "./TablaBuscableClient";

const BloqueTablaBuscable = ({ datosBloque }) => {
  const datos = datosBloque.FilaTablaBuscable || [];
  const filas = datosBloque.Filas || 8;

  return (
    <div className="my-8 px-8">
      <TablaBuscableClient datos={datos} filasPorPagina={filas} />
    </div>
  );
};

export default BloqueTablaBuscable;
