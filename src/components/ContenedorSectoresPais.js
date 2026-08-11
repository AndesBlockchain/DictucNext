import useSectoresPais from "@/hooks/use-sectores-pais";
import StrapiImage from "./StrapiImage";
import { LG_GRID_COLS } from "@/helpers/grid-cols";

const ContenedorSectoresPais = async ({itemsPorFila}) => {

  const res = await useSectoresPais();
  const sectores = res?.data || [];

  if (sectores.length === 0) {
    return null;
  }

  const lgGridCols = LG_GRID_COLS[itemsPorFila] ?? LG_GRID_COLS[3];

  return (
    <div id="items-servicios" className={`container max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 ${lgGridCols} gap-8 mt-8 pl-2 pr-2 justify-center`}>
      {sectores.map((item) => {
        return (
          <div key={item.slug} className="flex">
            <a
              href={"/sectores-pais/" + item.slug}
              className="block w-full max-w-[280px] mx-auto h-auto group"
            >
              {item.Foto && (
                <StrapiImage
                  imagen={item.Foto}
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

export default ContenedorSectoresPais
