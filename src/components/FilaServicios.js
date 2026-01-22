import React from "react";
import Badge from "./Badge";

const FilaServicios = ({ nombre_servicio, sectores, unidad, color_fondo = "bg-gray-100", slug }) => {

  return (
    <div className={`${color_fondo} flex flex-row p-2`}>
      <div className="basis-full">
        <div>
          {slug ? (
            <a href={"/servicios/"+slug} className="text-gris-dictuc text-sm no-underline">{nombre_servicio}</a>
          ) : (
            nombre_servicio
          )}
        </div>
      </div>
    </div>
  );
};

export default FilaServicios; 