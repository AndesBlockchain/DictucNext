import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
const BannerNoticias = "/images/BannerMicrofonos.webp"
import useProyectosPorAgno from "@/hooks/use-proyectos-por-agno";
import Instagram from "@/components/Instagram";
import FranjaAzul from "@/components/FranjaAzul";
import BuscadorNoticias from "@/components/BuscadorNoticias";

export const metadata = {
  title: 'Dictuc | Proyectos Destacados'
};

export default async function TodosLosProyectosPage() {

    const proyectos = await useProyectosPorAgno()

    const proyectosOrdenados = Object.entries(proyectos).sort(([agnoA], [agnoB]) => parseInt(agnoB) - parseInt(agnoA));
  return (
    <PaginaInterior fallback={BannerNoticias}
                    titulo="Proyectos Destacados"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Proyectos Destacados", link: "/todos-los-proyectos" }]}>
      <BuscadorNoticias noticiasOrdenadas={proyectosOrdenados} />
<div className="mt-16 container m-auto max-w-8xl pl-8 pr-8">
    <FranjaAzul className="mt-8"/>
    <div className={"text-center mb-4 mt-4 font-semibold "}>NUESTRO <span className="text-azul-dictuc">INSTAGRAM</span></div>
      <Instagram />
    </div>
    </PaginaInterior>
  );
}
