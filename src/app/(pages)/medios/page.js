import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
const BannerNoticias = "/images/BannerMicrofonos.webp"
import useNoticiasPorAgnoEtiqueta from "@/hooks/use-noticias-por-agno-etiqueta";
import Instagram from "@/components/Instagram";
import FranjaAzul from "@/components/FranjaAzul";
import BuscadorNoticias from "@/components/BuscadorNoticias";

export const metadata = {
  title: 'Dictuc | Medios'
};

const ETIQUETA_PRENSA_DOCUMENT_ID = "ispfi7zx0d9a4gjhzcsl75cw";

export default async function MediosPage() {

    const noticias = await useNoticiasPorAgnoEtiqueta(ETIQUETA_PRENSA_DOCUMENT_ID)

    const noticiasOrdenadas = Object.entries(noticias).sort(([agnoA], [agnoB]) => parseInt(agnoB) - parseInt(agnoA));
  return (
    <PaginaInterior fallback={BannerNoticias}
                    titulo="Medios"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Medios", link: "/medios" }]}>
      <BuscadorNoticias noticiasOrdenadas={noticiasOrdenadas} />
      <div className="mt-16 container m-auto max-w-8xl pl-8 pr-8">
        <FranjaAzul className="mt-8"/>
        <div className={"text-center mb-4 mt-4 font-semibold "}>NUESTRO <span className="text-azul-dictuc">INSTAGRAM</span></div>
        <Instagram />
      </div>
    </PaginaInterior>
  );
}
