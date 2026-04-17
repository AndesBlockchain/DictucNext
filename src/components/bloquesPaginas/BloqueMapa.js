import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Bloque from "./Bloque";

const BloqueMapa = ({ datosBloque }) => {
  const { Lugares, Texto } = datosBloque;

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      {Texto && (
        <div
          className="container max-w-6xl mx-auto mt-4 text-center text-sm"
          dangerouslySetInnerHTML={{ __html: Texto }}
        />
      )}

      <div className="container max-w-6xl mx-auto mt-12 space-y-16">
        {Lugares?.map((lugar, index) => {
          const mapSrc = `https://www.google.com/maps?q=${lugar.Latitud},${lugar.Longitud}&z=15&output=embed`;
          const invertido = index % 2 !== 0;

          return (
            <div
              key={lugar.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left ${invertido ? "md:[direction:rtl]" : ""}`}
            >
              <div className={`w-full h-64 md:h-80 rounded-lg overflow-hidden shadow ${invertido ? "md:[direction:ltr]" : ""}`}>
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${lugar.Nombre}`}
                />
              </div>

              <div className={invertido ? "md:[direction:ltr]" : ""}>
                <h3 className="text-azul-dictuc font-bold text-xl mb-4">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-azul-dictuc" />
                  {lugar.Nombre}
                </h3>
                {lugar.Instalaciones?.map((instalacion) => (
                  <div key={instalacion.id} className="mb-4">
                    <p className="font-bold text-xs">{instalacion.Nombre}</p>
                    <p className="text-sm">
                      Horario de Atención: {instalacion.Horario}
                    </p>
                    <p className="text-sm">
                      Teléfono de contacto: {instalacion.Telefono}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Bloque>
  );
};

export default BloqueMapa;
