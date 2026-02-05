import React from "react";
import MenuSecundario from "@/components/MenuSecundario";
import PaginaInterior from "@/components/PaginaInterior";
import ScrollSpy from "@/components/ScrollSpy";
import { renderBloque } from "@/helpers/bloque-renderer";
import usePagina from "@/hooks/use-pagina";
import useMenuSecundario from "@/hooks/use-menu-secundario";


/**
   * Render page content for a given slug by fetching the page and secondary menu, and composing PaginaInterior with menu, optional ScrollSpy, and page blocks.
   *
   * @param {Object} props - Component props.
   * @param {Object|Promise<Object>} props.params - Route parameters object or a promise that resolves to it.
   * @param {string} props.params.slug - Slug of the page to load.
   * @returns {JSX.Element} The composed PaginaInterior element containing the secondary menu, optional ScrollSpy, and the page's blocks or a fallback message.
   */
  export default async function PaginasContenido({params}) {

  const {slug} = await params;

  const pagina = await usePagina(slug);
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