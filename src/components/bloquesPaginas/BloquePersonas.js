import React from "react";
import StrapiImage from "../StrapiImage";
import Bloque from "./Bloque";


const BloquePersonas = ({datosBloque}) => {

    const personasSorted = datosBloque.etiqueta_persona.personas.sort((a, b) => a.sortOrder - b.sortOrder);

    return (
        <Bloque datosBloque={datosBloque.Bloque}>
        <div className="grid grid-cols-2 justify-center items-center gap-8 mt-8 lg:ml-32 lg:mr-32 md:mr-32 md:ml-32 sm:mr-2 sm:ml-2">
        {personasSorted.map((persona)=>{
          // Normalizar imagen: usar formats.thumbnail.url como fallback si existe
          const imagenFallback = persona.Foto?.formats?.thumbnail?.url || persona.Foto?.url;
          const imagenData = persona.Foto?.localFile?.childImageSharp?.gatsbyImageData
            ? persona.Foto
            : imagenFallback
            ? { url: imagenFallback }
            : null;

          const imagenComponent = (
            <StrapiImage
              imagen={imagenData}
              alt={persona.Nombre}
              className="rounded-full"
            />
          );

          return (
                <div className="flex flex-row justify-center items-center w-96" key={persona.id}>
                    <div className="avatar">
                        <div className="w-24 border border-azul-dictuc rounded-full">
                            {persona.Link ? (
                              <a href={persona.Link} target="_blank" rel="noopener noreferrer">
                                {imagenComponent}
                              </a>
                            ) : (
                              imagenComponent
                            )}
                        </div>
                    </div>
                   <div className="flex flex-col ml-4 w-full">
                    <div className="text-left">{persona.Nombre}</div>
                    <div className="text-gray-500 text-sm text-left">{persona.Cargo}</div>
                    <div className="text-gray-500 text-xs text-left">{persona.Link && <a href={persona.Link} target="_blank" rel="noopener noreferrer">Más información</a>}</div>
                    </div>
                </div>
          );
        })}
        </div>
        </Bloque>
    )
}

export default BloquePersonas