"use client"
import React, { useState } from "react";
import Bloque from "./Bloque";
import ItemEfemerides from "./efemerides/ItemEfemerides";
import StrapiImage from "../StrapiImage";

const BloqueEfemerides = ({ datosBloque }) => {
  const [fotoModal, setFotoModal] = useState(null);

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Contenedor con línea continua de fondo */}
        <div className="relative">
          {/* Línea vertical continua - desktop centrada, mobile a la izquierda */}
          <div className="absolute top-0 bottom-0 md:left-1/2 left-[10px] md:-translate-x-1/2 w-0.5 bg-azul-dictuc" />

          {/* Items */}
          <div className="flex flex-col gap-6">
            {datosBloque.Efemerides?.map((efemeride, index) => (
              <ItemEfemerides
                key={efemeride.id || index}
                agno={efemeride.agno}
                evento={efemeride.Evento}
                foto={efemeride.Foto}
                index={index}
                isFirst={index === 0}
                isLast={index === datosBloque.Efemerides.length - 1}
                onFotoClick={(foto) => setFotoModal(foto)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de foto */}
      {fotoModal && (
        <div
          className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4"
          onClick={() => setFotoModal(null)}
        >
          <button
            className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-gray-300 transition-colors"
            onClick={() => setFotoModal(null)}
            aria-label="Cerrar"
          >
            &times;
          </button>
          <div
            className="relative w-[90vw] max-w-3xl h-[80vh] rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <StrapiImage
              imagen={fotoModal.formats?.large || fotoModal}
              alt="Efeméride"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Bloque>
  );
};

export default BloqueEfemerides;
