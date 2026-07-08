
import React from "react";
import MenuSecundario from "@/components/MenuSecundario";
import PaginaInterior from "@/components/PaginaInterior";
import ScrollSpy from "@/components/ScrollSpy";
import { renderBloque } from "@/helpers/bloque-renderer";
import usePagina from "@/hooks/use-pagina";
import useMenuSecundario from "@/hooks/use-menu-secundario";
import useMenuCajon from "@/hooks/use-menu-cajon";
import EditorPageRegistrar from "@/components/editor/EditorPageRegistrar";
import BloqueDebugBadge from "@/components/editor/BloqueDebugBadge";
import { fetchFromStrapi, CACHE_PRESETS } from "@/lib/strapi-fetcher";

export const revalidate = false

// Prefijos manejados por otras rutas estáticas — excluir del catch-all
const KNOWN_PREFIXES = ['/servicios/', '/sectores-pais/', '/tipos-de-servicio/', '/ejecutor/', '/novedades/'];

export async function generateStaticParams() {
  const [cajones, secundarios, superior] = await Promise.all([
    fetchFromStrapi({ endpoint: '/api/menu-cajons?populate[links][fields][0]=url&pagination[pageSize]=100', fallback: { data: [] }, cache: CACHE_PRESETS.FREQUENT }),
    fetchFromStrapi({ endpoint: '/api/menu-secundarios?populate=all&pagination[limit]=100', fallback: { data: [] }, cache: CACHE_PRESETS.FREQUENT }),
    fetchFromStrapi({ endpoint: '/api/menu-superiors?sort=posicion&populate=all&pagination[limit]=100', fallback: { data: [] }, cache: CACHE_PRESETS.FREQUENT }),
  ]);

  const urls = new Set();
  for (const menu of (cajones?.data || [])) {
    for (const link of (menu.links || [])) {
      if (link.url?.startsWith('/')) urls.add(link.url);
    }
  }
  for (const menu of (secundarios?.data || [])) {
    if (menu.Link?.startsWith('/')) urls.add(menu.Link);
    for (const link of (menu.Links || [])) {
      if (link.url?.startsWith('/')) urls.add(link.url);
    }
  }
  for (const item of (superior?.data || [])) {
    if (item.link?.startsWith('/')) urls.add(item.link);
    for (const link of (item.LInks || [])) {
      if (link.url?.startsWith('/')) urls.add(link.url);
    }
  }

  const params = [];
  for (const url of urls) {
    const clean = url.replace(/\/$/, '');
    if (KNOWN_PREFIXES.some(p => clean.startsWith(p))) continue;
    const parts = clean.replace(/^\//, '').split('/').filter(Boolean);
    if (parts.length >= 2) {
      params.push({ seccion: parts[0], slug: parts.slice(1) });
    }
  }
  return params;
}

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
  const menuCajonCandidatos = [...slug.slice(0, -1)].reverse().concat(seccion);

  const [pagina, menuSecundario, menuCajon] = await Promise.all([
    usePagina(slugFinal),
    useMenuSecundario(seccion, slugFinal),
    useMenuCajon(menuCajonCandidatos),
  ]);


  return (
    <>
    <EditorPageRegistrar bloques={pagina?.Bloques || []} documentId={pagina?.documentId} />
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
    </>
  );
  }
