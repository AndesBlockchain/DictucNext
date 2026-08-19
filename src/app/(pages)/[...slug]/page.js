import { notFound } from "next/navigation";
import MenuSecundario from "@/components/MenuSecundario";
import PaginaInterior from "@/components/PaginaInterior";
import ScrollSpy from "@/components/ScrollSpy";
import { renderBloque } from "@/helpers/bloque-renderer";
import usePagina from "@/hooks/use-pagina";
import useMenuSecundario from "@/hooks/use-menu-secundario";
import useMenuCajon from "@/hooks/use-menu-cajon";
import EditorPageRegistrar from "@/components/editor/EditorPageRegistrar";
import BloqueDebugBadge from "@/components/editor/BloqueDebugBadge";
import { getPaginasConRuta } from "@/lib/pagina-rutas";

export const revalidate = false

export async function generateStaticParams() {
  const rutas = await getPaginasConRuta();
  return rutas.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pagina = await usePagina(slug[slug.length - 1]);
  return { title: pagina?.titulo || "Página" };
}

export default async function PaginasContenido({ params }) {
  const { slug } = await params;
  const slugFinal = slug[slug.length - 1];
  const pagina = await usePagina(slugFinal);

  if (!pagina) {
    notFound();
  }

  const [menuSecundario, menuCajon] = await Promise.all([
    useMenuSecundario(pagina.new_menu_secundario?.documentId),
    useMenuCajon(pagina.menu_cajon?.documentId),
  ]);

  return (
    <>
      <EditorPageRegistrar bloques={pagina?.Bloques || []} documentId={pagina?.documentId} />
      <PaginaInterior
        banner={pagina.Banner}
        titulo={pagina.titulo}
        titulo_visible={pagina.TituloVisible}
        color_titulo={pagina.color_titulo.Codigo}
        menuCajon={menuCajon}
        seccionActiva={pagina.new_menu_principal?.slug_ruta}
        breadcrum={[
          { label: "Home", link: "/" },
          { label: pagina?.titulo || "Página", link: "/" }
        ]}>
        <MenuSecundario menu={menuSecundario} slug={slugFinal} />
        {(pagina.ScrollSpyVisible !== false) && (
          <ScrollSpy datosBloques={pagina.Bloques} />
        )}
        {pagina?.Bloques && Array.isArray(pagina.Bloques) && pagina.Bloques.length > 0 ? (
          pagina.Bloques.map((bloque, index) => (
            <div key={bloque.id || index} id={`bloque-${bloque.id || index}`} className="relative">
              <BloqueDebugBadge component={bloque.__component} blockId={bloque.id} title={bloque.Bloque?.Titulo} />
              {renderBloque(bloque)}
            </div>
          ))
        ) : (
          <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
            <p className="text-yellow-800">No se encontraron bloques para mostrar.</p>
          </div>
        )}
      </PaginaInterior>
    </>
  );
}
