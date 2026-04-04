import React from "react"
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import StrapiImage from "../StrapiImage";

const BloqueTiposServicio = async () => {

    const tipos = await useTipoDeServicio();
    
  return (
    <div id="items-servicios" className="grid gap-2 mt-8 w-220 ml-auto mr-auto">
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 justify-center">
      {tipos.data.map(item=>
        <div key={item.slug} className="">
        <div className="justify-center w-full">
        <a href={"/tipos-de-servicio/" + item.slug} className="flex flex-col justify-center">
          <StrapiImage
            imagen={item.Icono}
            gatsbyImageData={item.Icono?.localFile?.childImageSharp?.gatsbyImageData}
            alt={item.nombre}
            className="ml-auto mr-auto w-auto max-h-[50px]"
          />
        </a>
        </div>  
        <div className="w-full py-2 text-center">
            <span className="text-azul-dictuc text-xs font-bold">{item.nombre}</span>
        </div>
        </div>
      )}
    </div>
    <div className="flex justify-center mb-6">
        <a href="/servicios/todos-los-servicios" className="bg-azul-dictuc text-white font-bold px-4 py-2 m-4 text-xs rounded-full hover:bg-azul-dictuc/90 transition-all">Buscar Servicios</a>
      </div>
    </div>
  )
}

export default BloqueTiposServicio