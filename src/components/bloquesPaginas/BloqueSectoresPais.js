import React from "react"
import useSectoresPais from "../../hooks/use-sectores-pais";
import Bloque from "./Bloque";
import ItemSectoresPais from "../ItemSectoresPais";
import ContenedorSectoresPais from "../ContenedorSectoresPais";

const BloqueSectoresPais = async ({datosBloque}) => {

    const usarIconos = datosBloque.UsarIconos !== false;

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      {usarIconos ? (
        <IconosView datosBloque={datosBloque} />
      ) : (
        <ContenedorSectoresPais itemsPorFila={datosBloque.IconosPorFila}/>
      )}
    </Bloque>
  )
}

const IconosView = async ({datosBloque}) => {
    const res = await useSectoresPais();
    const sectores = res?.data || [];

    return (
      <div id="items-servicios" className="grid gap-2 mt-8 w-220 ml-auto mr-auto">
        <div className={"grid grid-cols-" + datosBloque.IconosPorFila + " justify-center items-start"}>
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
    )
}

export default BloqueSectoresPais