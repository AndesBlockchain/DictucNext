import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import Bloque from "./Bloque";


const BloqueDocumentos = ({datosBloque}) => {

  const documentosSorted = datosBloque.etiqueta_documentos[0].documentos.sort((a, b) => a.sortOrder - b.sortOrder);

  return (
        <Bloque datosBloque={datosBloque.Bloque}>
        <div className="grid grid-cols-6 justify-center items-center gap-8 mt-8 lg:ml-8 lg:mr-8 md:mr-4 md:ml-4 sm:mr-2 sm:ml-2">
        {documentosSorted.map((documento)=>(
                <div className="flex flex-col justify-center items-center w-96">
                    <div className="avatar">
                        <div className="w-24 rounded">
                            {documento.Foto?.localFile?.childImageSharp?.gatsbyImageData ? (
                              <GatsbyImage 
                                image={documento.Foto.localFile.childImageSharp.gatsbyImageData}
                                alt={documento.Titulo}
                              />
                            ) : documento.Foto?.url ? (
                              <img src={documento.Foto.url} alt={documento.Titulo}/>
                            ) : null}
                        </div>
                    </div> 
                    <div className="text-left">{documento.Titulo}</div>
                </div>
        ))}
        </div>
        </Bloque>
    )
}

export default BloqueDocumentos