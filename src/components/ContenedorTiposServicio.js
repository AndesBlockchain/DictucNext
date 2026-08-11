import useTipoDeServicio from "@/hooks/use-tipo-de-servicios";
import StrapiImage from "./StrapiImage";
import { LG_GRID_COLS } from "@/helpers/grid-cols";

const ContenedorTiposServicio = async ({ useIcono = false, itemsPorFila }) => {

  const tiposDeServicio = await useTipoDeServicio();

  // Validar que tiposDeServicio y tiposDeServicio.data existan
  const tiposArray = tiposDeServicio?.data || [];

  if (tiposArray.length === 0) {
    return null; // O mostrar un mensaje de "No hay servicios disponibles"
  }

  const lgGridCols = LG_GRID_COLS[itemsPorFila] ?? LG_GRID_COLS[3];

  return (
    <div id="items-servicios" className={`container max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 ${lgGridCols} gap-8 mt-8 pl-2 pr-2 justify-center`}>
      {tiposArray.map((item) => {
        const imagen = useIcono ? item.Icono : item.fotoPortada;

        return (
          <div key={item.slug} className="flex">
            <a
              href={"/tipos-de-servicio/" + item.slug}
              className="block w-full max-w-[280px] mx-auto h-auto group"
            >
              {imagen && (
                <StrapiImage
                  imagen={imagen}
                  alt={item.nombre}
                  maxWidth={500}
                  className="rounded-xl object-cover shadow-md w-full"
                />
              )}
              <div className="bg-gray-700 rounded-b-xl -mt-[40px] h-12 px-2 flex items-center justify-center relative z-10">
                <span className="text-white text-xs font-bold text-center line-clamp-2">
                  {item.nombre}
                </span>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  )
}

export default ContenedorTiposServicio