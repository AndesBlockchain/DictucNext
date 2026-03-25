import React from "react";
import StrapiImage from "../StrapiImage";
import Bloque from "./Bloque";
const LogoLinkedIn = "/images/Linkedin.png"

const BloquePersonas = ({datosBloque}) => {

    const personasSorted = datosBloque.etiqueta_persona.personas.sort((a, b) => a.sortOrder - b.sortOrder);



    return (
        <Bloque datosBloque={datosBloque.Bloque}>
        <div className="container m-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 justify-center items-center xl:gap-16 lg:gap-8 gap-4 mt-8">
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
              className="rounded-sm"
            />
          );

          return (
                <div className="flex-basis-2 justify-center items-center max-w-sm w-full h-full mx-auto rounded-md shadow-lg bg-gray-100 p-4" key={persona.id}>
                  <div className="w-24 bg-white m-auto rounded-sm">
                    {imagenComponent}
                  </div>
                  <div className="mt-3 text-azul-dictuc font-bold text-center">
                    {persona.Nombre}
                  </div>
                  <div className="mt-2 text-center font-semibold">
                    {persona.Cargo}
                  </div>
                  <div className="mt-2 text-center text-sm" dangerouslySetInnerHTML={{__html: persona.Descripcion}} />
                  <div className="mt-2 mb-2">
                    <a href={persona.LinkedIn} target="_blank" rel="noopener noreferrer"><img src={LogoLinkedIn} alt="LinkedIn" className="w-4 h-4 m-auto" /></a>
                  </div>
                  {persona.link_ver_mas_informacion && (
                    <div className="text-center text-sm">
                      <a className="text-azul-dictuc font-semibold" href={persona.link_ver_mas_informacion} target="_blank" rel="noopener noreferrer">Más información</a>
                    </div>
                  )}
                   {persona.link_info_adicional && (
                  <div className="text-center text-sm">
                    <a className="text-azul-dictuc font-semibold" href={persona.link_info_adicional} target="_blank" rel="noopener noreferrer">{persona.label_info_adicional}</a>
                  </div>
                   )}
                </div>
          );
        })}
        </div>
        </Bloque>
    )
}

export default BloquePersonas