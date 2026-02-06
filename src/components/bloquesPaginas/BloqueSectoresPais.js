import React from "react"
import useSectoresPais from "../../hooks/use-sectores-pais";
import Bloque from "./Bloque";
import StrapiImage from "../StrapiImage";

const BloqueSectoresPais = async ({datosBloque}) => {

    const sectores = await useSectoresPais();

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div id="items-servicios" className="grid gap-2 mt-8 w-220 ml-auto mr-auto">
        <div className="flex gap-2 justify-center">
        {sectores.nodes.map(item=>
          <div key={item.slug} className="">
          <div className="justify-center w-full">
          <a href={"/tipos-de-servicio/" + item.slug} className="flex flex-col justify-center">
            <StrapiImage
              imagen={item.icono}
              gatsbyImageData={item.icono?.[0]?.localFile?.childImageSharp?.gatsbyImageData}
              alt={item.nombre || ""}
              className="ml-auto mr-auto"
            />
          </a>
          </div>
          </div>
        )}
        </div>
      </div>
    </Bloque>
  )
}

export default BloqueSectoresPais