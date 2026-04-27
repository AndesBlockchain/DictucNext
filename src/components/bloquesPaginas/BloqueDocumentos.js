import React from "react";
import Bloque from "./Bloque";
import StrapiImage from "../StrapiImage";

const BloqueDocumentos = ({ datosBloque }) => {
  const documentos = datosBloque.etiqueta_documentos?.[0]?.documentos || [];
  const documentosSorted = [...documentos].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-center items-center gap-8 mt-8 mx-4 lg:mx-8">
        {documentosSorted.map((documento) => (
          <div key={documento.id} className="flex flex-col justify-center items-center">
            <div className="avatar">
              <div className="w-24 rounded">
                <StrapiImage
                  imagen={documento.Foto}
                  alt={documento.Titulo || "Documento"}
                />
              </div>
            </div>
            <div className="text-left">{documento.Titulo}</div>
          </div>
        ))}
      </div>
    </Bloque>
  );
};

export default BloqueDocumentos;
