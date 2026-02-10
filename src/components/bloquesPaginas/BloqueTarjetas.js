import React from "react";
import Bloque from "./Bloque";
import CardServicio from "../CardServicio";

const BloqueTarjetas = ({ datosBloque }) => {
  const tarjetasPorFila = datosBloque.TarjetasPorFila || 3; // Default 3 si no está definido

  // Mapear tarjetasPorFila a clases basis de Tailwind para desktop
  const basisMap = {
    1: "lg:basis-full",
    2: "lg:basis-1/2",
    3: "lg:basis-1/3",
    4: "lg:basis-1/4",
    5: "lg:basis-1/5",
    6: "lg:basis-1/6"
  };

  const desktopBasis = basisMap[tarjetasPorFila] || "lg:basis-1/3";

  // Responsive basis: mobile (full) → tablet (1/2) → desktop (variable)
  const responsiveBasis = `basis-full sm:basis-1/2 ${desktopBasis}`;

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div
        id="tarjetas"
        className="flex flex-wrap justify-center"
      >
        {datosBloque.Tarjetas.map((tarjeta, index) => (
          <div key={index} className={`${responsiveBasis} p-4 pl-8 pr-8`}>
            <CardServicio
              titulo={tarjeta.Titulo || ""}
              color_fondo={tarjeta?.color_fondo?.Codigo || "white"}
              color_texto={tarjeta?.color_texto?.Codigo || "black"}
              imagen={tarjeta.Imagen}
              contenido={tarjeta.Texto || ""}
              callToAction={tarjeta.CallToAction}
            />
          </div>
        ))}
      </div>
    </Bloque>
  );
};

export default BloqueTarjetas;