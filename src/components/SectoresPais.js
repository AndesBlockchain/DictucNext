import React from "react"
import FranjaAzul from "./FranjaAzul";
import ItemSectoresPais from "./ItemSectoresPais";
import useSectoresPais from "@/hooks/use-sectores-pais";

const SectoresPais = async (titulo) => {

    const res = await useSectoresPais();

    // Validar que res y res.data existan
    const sectores = res?.data || [];
    const totalCount = res?.totalCount || 0;

    const gridClassTop = (sectoresCount) => {
        if (sectoresCount <= 10) {
            return sectoresCount;
        } else {
            return Math.floor(sectoresCount / 2) + (sectoresCount % 2);
        }
    }

    const gridClassBottom = (sectoresCount) => {
        if (sectoresCount <= 10) {
            return sectoresCount;
        } else {
            return Math.floor(sectoresCount / 2);
        }
    }

    // Si no hay sectores, no mostrar nada o mostrar mensaje
    if (totalCount === 0) {
        return null;
    }

    return (
        <div id="sectores" className="relative mt-4 bg-white lg:-mt-8 p-2 pb-4 pt-5 max-w-4xl mx-auto rounded-3xl shadow-lg">
            <FranjaAzul />
            <div className="text-center mb-4 mt-4 font-semibold uppercase">
                Encuentra soluciones y servicios según tu tipo de <span className="text-azul-dictuc">industria</span>
            </div>
            {totalCount <= 10 ?
                <div className={"flex flew-row justify-center gap-2"}>
                    {sectores.map((item, index) =>
                        <ItemSectoresPais
                            key={index}
                            url={"/sectores-pais/" + item.slug}
                            icono={item.icono}
                            gatsbyImageData={null}
                            url_icono={item.icono?.url}
                            nombre={item.nombre}
                        />
                    )}
                </div>
                :
                <div>
                    <div className="flex flex-row justify-center gap-2">
                        {sectores.slice(0, gridClassTop(totalCount)).map(item =>
                            <ItemSectoresPais
                                key={item.slug}
                                url={"/sectores-pais/" + item.slug}
                                icono={item.icono}
                                gatsbyImageData={null}
                                url_icono={item.icono?.attributes?.url}
                                nombre={item.nombre}
                            />
                        )}
                    </div>
                    <div className="flex flex-row gap-2 justify-center">
                        {sectores.slice(gridClassBottom(totalCount) + 1).map(item =>
                            <ItemSectoresPais
                                key={item.slug}
                                url={"/sectores-pais/" + item.slug}
                                icono={item.icono}
                                gatsbyImageData={null}
                                url_icono={item.icono?.attributes?.url}
                                nombre={item.nombre}
                            />
                        )}
                    </div>
                </div>
            }

            <div className="flex justify-center mt-6">
                <a
                    href="/servicios/todos-los-servicios"
                    className="btn btn-primary btn-outline btn-xs rounded-full px-4"
                >
                    Ver todos los Servicios
                </a>
            </div>
        </div>

    )

}

export default SectoresPais;