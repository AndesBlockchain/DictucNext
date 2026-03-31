import React from "react"
import useSectoresPais from "../../hooks/use-sectores-pais";
import Bloque from "./Bloque";
import ItemSectoresPais from "../ItemSectoresPais";

const BloqueSectoresPais = async ({datosBloque}) => {

    const res = await useSectoresPais();
    const sectores = res?.data || [];

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div id="items-servicios" className="grid gap-2 mt-8 w-220 ml-auto mr-auto">
        <div className="flex gap-2 justify-center items-start">
        {sectores.map(item=>
          <ItemSectoresPais
            key={item.slug}
            url={"/tipos-de-servicio/" + item.slug}
            icono={item.icono}
            url_icono={item.icono?.url}
            nombre={item.nombre}
          />
        )}
        </div>
      </div>
    </Bloque>
  )
}

export default BloqueSectoresPais