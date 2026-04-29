import React from "react";
import Bloque from "./Bloque";
import StrapiImage from "../StrapiImage";
import useDocumentosPorEtiqueta from "@/hooks/use-documentos-por-etiqueta";

const STRAPI_URL = process.env.STRAPI_API_URL || "";

const BloqueDocumentos = async ({ datosBloque }) => {
  const etiquetaDocumentId = datosBloque.etiqueta_documentos?.[0]?.documentId;
  const documentos = await useDocumentosPorEtiqueta(etiquetaDocumentId);

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="flex flex-wrap max-w-6xl justify-center items-start gap-8 mt-8 mx-auto">
        {documentos.map((documento) => {
          const archivoUrl = documento.Archivo?.url
            ? `${STRAPI_URL}${documento.Archivo.url}`
            : null;

          const contenido = (
            <div className="flex flex-col justify-center items-center">
              <div className="avatar">
                <div className="w-24 rounded">
                  <StrapiImage
                    imagen={documento.Foto}
                    alt={documento.Titulo || "Documento"}
                  />
                </div>
              </div>
              <div className="text-center font-semibold text-sm mt-2">{documento.Titulo}</div>
            </div>
          );

          return archivoUrl ? (
            <a
              key={documento.id}
              href={archivoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              {contenido}
            </a>
          ) : (
            <div key={documento.id}>
              {contenido}
            </div>
          );
        })}
      </div>
    </Bloque>
  );
};

export default BloqueDocumentos;
