import React from "react"
import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import StrapiImage from "../StrapiImage";
import Bloque from "./Bloque";

const BloqueTiposServicio = async ({ datosBloque }) => {
  const tipos = await useTipoDeServicio();
  const tiposData = tipos?.data || [];

  return (
    <Bloque datosBloque={datosBloque?.Bloque}>
      <div id="items-servicios" className="grid gap-2 mt-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 justify-center">
          {tiposData.map(item => (
            <div key={item.slug}>
              <a href={"/tipos-de-servicio/" + item.slug} className="flex flex-col justify-center w-full">
                <StrapiImage
                  imagen={item.Icono}
                  alt={item.nombre}
                  className="ml-auto mr-auto w-auto max-h-[50px]"
                />
              </a>
              <div className="w-full py-2 text-center">
                <span className="text-azul-dictuc text-xs font-bold">{item.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bloque>
  )
}

export default BloqueTiposServicio
