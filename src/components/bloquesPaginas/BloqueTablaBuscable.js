import React from "react";
import TablaBuscableClient from "./TablaBuscableClient";

const BloqueTablaBuscable = ({ datosBloque }) => {
  const datos = datosBloque.FilaTablaBuscable || [];

  return (
    <div className="my-8 px-8">
      <TablaBuscableClient datos={datos} />
    </div>
  );
};

export default BloqueTablaBuscable;
