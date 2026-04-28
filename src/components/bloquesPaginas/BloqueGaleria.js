import React from "react";
import Bloque from "./Bloque";
import GaleriaClient from "./GaleriaClient";

const BloqueGaleria = ({ datosBloque }) => {
  const fotos = datosBloque.FotosGaleria.map((foto, index) => ({
    url: foto.Foto?.url,
    alt: foto.Foto?.alternativeText || `Imagen ${index + 1} de la galería`,
    texto: foto.Texto || null
  }));

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <GaleriaClient fotos={fotos} />
    </Bloque>
  );
};

export default BloqueGaleria;
