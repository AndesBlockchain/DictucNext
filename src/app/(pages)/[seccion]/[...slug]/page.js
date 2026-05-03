
import React from "react";
import MenuSecundario from "@/components/MenuSecundario";
import PaginaInterior from "@/components/PaginaInterior";
import ScrollSpy from "@/components/ScrollSpy";
import { renderBloque } from "@/helpers/bloque-renderer";
import usePagina from "@/hooks/use-pagina";
import useMenuSecundario from "@/hooks/use-menu-secundario";
import useMenuCajon from "@/hooks/use-menu-cajon";
import EditorModeProvider from "@/components/editor/EditorModeProvider";
import BloqueDebugBadge from "@/components/editor/BloqueDebugBadge";
import EditorPanel from "@/components/editor/EditorPanel";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugFinal = slug[slug.length - 1];
  const pagina = await usePagina(slugFinal);
  return {
    title: pagina?.titulo || "Página"
  };
}

export default async function PaginasContenido({params}) {

  const {seccion, slug} = await params;
  const slugFinal = slug[slug.length - 1];
  const pagina = await usePagina(slugFinal);
  const menuSecundario = await useMenuSecundario(seccion, slugFinal);
  const menuCajonCandidatos = [...slug.slice(0, -1)].reverse().concat(seccion);
  const menuCajon = await useMenuCajon(menuCajonCandidatos);

  return (
    <EditorModeProvider bloques={pagina?.Bloques || []} documentId={pagina?.documentId}>
    <PaginaInterior
      fallback={process.env.STRAPI_API_URL + pagina.Banner.url}
      titulo = {pagina.titulo}
      titulo_visible={pagina.TituloVisible}
      color_titulo= {pagina.color_titulo.Codigo}
      menuCajon={menuCajon}
      breadcrum={[
        { label: "Home", link: "/" },
        { label: pagina?.titulo || "Página", link: "/" }
      ]}>
      <MenuSecundario items={menuSecundario} slug={slugFinal} />
      {(pagina.ScrollSpyVisible !== false) && (
        <ScrollSpy datosBloques={pagina.Bloques}/>
      )}
      {pagina?.Bloques && Array.isArray(pagina.Bloques) && pagina.Bloques.length > 0 ? (
        pagina.Bloques.map((bloque, index) => (
          <div key={bloque.id || index} id={`bloque-${bloque.id || index}`} className="relative">
            <BloqueDebugBadge
              component={bloque.__component}
              blockId={bloque.id}
              title={bloque.Bloque?.Titulo}
            />
            {renderBloque(bloque)}
          </div>
        ))
      ) : (
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
          <p className="text-yellow-800">No se encontraron bloques para mostrar.</p>
        </div>
      )}
      </PaginaInterior>
      <EditorPanel />
    </EditorModeProvider>
  );
  }
