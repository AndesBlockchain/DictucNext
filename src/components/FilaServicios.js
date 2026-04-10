import React from "react";
import Badge from "./Badge";

const FilaServicios = ({ nombre_servicio, sectores, unidad, color_fondo = "bg-gray-100", slug }) => {

  if (slug) {
    return (
      <a href={"/servicios/"+slug} className={`${color_fondo} flex flex-row p-2 text-gris-dictuc text-sm no-underline hover:text-azul-dictuc hover:bg-gris-dictuc/20 transition-colors`}>
        <div className="basis-full">
          {nombre_servicio}
        </div>
      </a>
    );
  }

  return (
    <div className={`${color_fondo} flex flex-row p-2 text-sm`}>
      <div className="basis-full">
        {nombre_servicio}
      </div>
    </div>
  );
};

export default FilaServicios; 