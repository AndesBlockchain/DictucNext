import useSectoresPais from "../../hooks/use-sectores-pais";
import Bloque from "./Bloque";
import ItemSectoresPais from "../ItemSectoresPais";
import ContenedorSectoresPais from "../ContenedorSectoresPais";
import { GRID_COLS } from "@/helpers/grid-cols";

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
      <div id="items-servicios" className="grid gap-2 mt-8 max-w-6xl ml-auto mr-auto">
        <div className={`group/sectores grid ${GRID_COLS[datosBloque.IconosPorFila] ?? GRID_COLS[3]} justify-center items-start`}>
        {sectores.map(item=>
          <ItemSectoresPais
            key={item.slug}
            url={"/sectores-pais/" + item.slug}
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