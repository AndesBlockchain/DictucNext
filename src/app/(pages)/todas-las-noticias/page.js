import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
const BannerNoticias = "/images/BannerMicrofonos.webp"
import useNoticiasPorAgno from "@/hooks/use-noticias-por-agno";
import Instagram from "@/components/Instagram";
import Titulo from "@/components/Titulo";

export const metadata = {
  title: 'Dictuc | Noticias'
};

export default async function HomeNoticiasPage() {

    const noticias = await useNoticiasPorAgno()

    // Forzar el orden de los años y agregar logs
    const noticiasOrdenadas = Object.entries(noticias).sort(([agnoA], [agnoB]) => parseInt(agnoB) - parseInt(agnoA));
  return (
    <PaginaInterior fallback={BannerNoticias}
                    titulo="Noticias"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Noticias", link: "/noticias" }]}> 
      <div className="container m-auto max-w-6xl pl-8 pr-8">
        <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mb-8">
          <legend className="fieldset-legend">Buscar dentro de noticias</legend>
          <input type="text" className="input"/>
          <button className="btn btn-primary">Buscar</button>
        </fieldset>
      </div>

      <div className="mt-8">
      {noticiasOrdenadas.map(([agno, noticiasDelAgno], index) => (
        <div key={agno} className="container m-auto max-w-6xl pl-8 pr-8 collapse collapse-plus bg-base-100 border border-base-300">
          <input type="checkbox" name="my-accordion-3" defaultChecked={index === 0} />
          <div className="collapse-title font-semibold text-xl">{agno}</div>
          <div className="collapse-content text-sm">
            <div className="space-y-4">
              {noticiasDelAgno.map((noticia, noticiaIndex) => (
                <div key={noticiaIndex} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <h4 className="font-medium text-gray-900 mb-2">
                    <a href={`/noticias/${noticia.slug}`} className="hover:text-blue-600 transition-colors">
                    {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    })} - {noticia.titulo}
                    </a>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
  </div>
<div className="mt-8">

    <Titulo titulo="Nuestro Instagram"/>
      <Instagram />
</div>
    </PaginaInterior>
  );
}