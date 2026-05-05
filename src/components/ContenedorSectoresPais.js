import React from "react"
import useSectoresPais from "@/hooks/use-sectores-pais";
import StrapiImage from "./StrapiImage";

const ContenedorSectoresPais = async ({itemsPorFila}) => {

  const res = await useSectoresPais();
  const sectores = res?.data || [];

  if (sectores.length === 0) {
    return null;
  }

  return (
    <div id="items-servicios" className={`container max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsPorFila} gap-8 mt-8 pl-2 pr-2 justify-center`}>
      {sectores.map((item) => {
        return (
          <div key={item.slug} className="flex mx-auto">
            <a
              href={"/sectores-pais/" + item.slug}
              className="justify-center w-[280px] h-auto group"
            >
              {item.Foto && (
                <StrapiImage
                  imagen={item.Foto}
                  alt={item.nombre}
                  maxWidth={500}
                  className="rounded-xl object-cover shadow-md w-full"
                />
              )}
              <div className="bg-gray-700 rounded-b-xl -mt-[40px] py-2 text-center relative z-10">
                <span className="text-white lg:text-xs xl:text-xs text-xs font-bold">
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
