import React from "react";
import useTablaBuscable from "../../hooks/use-tabla-buscable";
import TablaBuscableClient from "./TablaBuscableClient";

const BloqueTablaBuscable = async ({ datosBloque }) => {
  const documentIdEtiqueta = datosBloque.etiqueta_tabla_buscable?.documentId;
  const datos = await useTablaBuscable(documentIdEtiqueta);

  return (
    <div className="my-8 px-8">
      <TablaBuscableClient datos={datos} />
    </div>
  );
};

export default BloqueTablaBuscable;