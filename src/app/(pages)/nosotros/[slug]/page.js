
import React from "react";
import MenuSecundario from "@/components/MenuSecundario";
import PaginaInterior from "@/components/PaginaInterior";
import ScrollSpy from "@/components/ScrollSpy";
import { renderBloque } from "@/helpers/bloque-renderer";
import usePagina from "@/hooks/use-pagina";
import useMenuSecundario from "@/hooks/use-menu-secundario";


export default async function PaginasContenido({params}) {

  const {slug} = await params;

  const pagina = await usePagina(slug);
  
console.log("pagina", pagina);
  const menuSecundario= await useMenuSecundario();

  return (
    <PaginaInterior
      fallback={process.env.STRAPI_API_URL + pagina.Banner.url}
      titulo = {pagina.titulo}
      titulo_visible={pagina.TituloVisible}
      color_titulo= {pagina.color_titulo.Codigo}
      breadcrum={[
        { label: "Home", link: "/" }, 
        { label: pagina?.titulo || "Página", link: "/" }
      ]}> 
      <MenuSecundario items={menuSecundario} />
      {(pagina.ScrollSpyVisible !== false) && (
        <ScrollSpy datosBloques={pagina.Bloques}/>
      )}
      {pagina?.Bloques && Array.isArray(pagina.Bloques) && pagina.Bloques.length > 0 ? (
        pagina.Bloques.map((bloque, index) => (
          <div key={bloque.id || index} id={bloque.id}>
            {renderBloque(bloque)}
          </div>
        ))
      ) : (
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
          <p className="text-yellow-800">No se encontraron bloques para mostrar.</p>
        </div>
      )}
      </PaginaInterior>
  );
  }
