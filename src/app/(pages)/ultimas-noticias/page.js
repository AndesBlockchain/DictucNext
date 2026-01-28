
import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import Noticias from "@/components/Noticias";
const BannerNoticias = "/images/BannerMicrofonos.webp"
import Titulo from "@/components/Titulo";
import Instagram from "@/components/Instagram";
import useUltimasNoticias from "@/hooks/use-ultimas-noticias";

export default async function HomeNoticiasPage() {

    const noticias= await useUltimasNoticias();
    console.log("noticias",noticias);
  return (
    <PaginaInterior fallback={BannerNoticias}
                    titulo="Noticias y Proyectos Destacados"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Noticias y Proyectos Destacados", link: "/noticias" }]}> 
    <Noticias noticias={noticias} linkFiltroNoticias={true} titulo="Últimas Noticias"/>
    <Titulo titulo="Nuestro Instagram"/>
    <Instagram />
    </PaginaInterior>
  );
}

export const Head = () => <title>Dictuc | Noticias</title>