import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
const BannerNoticias = "/images/BannerMicrofonos.webp"
import useNoticiasPorAgno from "@/hooks/use-noticias-por-agno";
import Instagram from "@/components/Instagram";
import FranjaAzul from "@/components/FranjaAzul";
import BuscadorNoticias from "@/components/BuscadorNoticias";

export const metadata = {
  title: 'Dictuc | Noticias'
};


const htmlInsta= "NUESTRO <span className='text-azul-dictuc'>INSTAGRAM</span>"
export default async function HomeNoticiasPage() {

    const noticias = await useNoticiasPorAgno()

    // Forzar el orden de los años y agregar logs
    const noticiasOrdenadas = Object.entries(noticias).sort(([agnoA], [agnoB]) => parseInt(agnoB) - parseInt(agnoA));
  return (
    <PaginaInterior fallback={BannerNoticias}
                    titulo="Noticias"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Noticias", link: "/noticias" }]}>
      <BuscadorNoticias noticiasOrdenadas={noticiasOrdenadas} />
<div className="mt-16 container m-auto max-w-8xl pl-8 pr-8">
    <FranjaAzul className="mt-8"/>
    <div className={"text-center mb-4 mt-4 font-semibold "}>NUESTRO <span className="text-azul-dictuc">INSTAGRAM</span></div>
      <Instagram />
    </div>
    </PaginaInterior>
  );
}