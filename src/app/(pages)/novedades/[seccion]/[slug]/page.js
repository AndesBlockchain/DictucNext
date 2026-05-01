import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import FranjaAzul from "@/components/FranjaAzul";
import StrapiImage from "@/components/StrapiImage";
const FotoDefaultNoticias = "/images/noticias.png"
const bannerDefault = "/images/BannerMicrofonos.webp";
import useNoticia from '@/hooks/use-noticia';
import EditorModeProvider from "@/components/editor/EditorModeProvider";
import EditorBadge from "@/components/editor/EditorBadge";

export default async function PaginasContenido({ params }) {
    const { seccion, slug } = await params;
    const noticia = await useNoticia(slug);

    console.log(noticia)

    if (!noticia) {
      return (
        <PaginaInterior fallback={bannerDefault} titulo="Noticias"
          breadcrum={[{ label: "Home", link: "/" }, { label: "Noticias", link: "/todas-las-noticias" }]}>
          <div className="text-center py-16 text-gray-500">Noticia no encontrada</div>
        </PaginaInterior>
      );
    }

    // Buscar la etiqueta que coincide con la sección de la URL
    const etiqueta = noticia.etiqueta_noticias?.find(e => e.slug === seccion) || noticia.etiqueta_noticias?.[0];

    const tituloPagina = etiqueta?.Titulo || "Noticias";
    const estiloFecha = etiqueta?.EstiloFecha;
    const bannerEtiqueta = etiqueta?.Banner?.url
      ? process.env.STRAPI_API_URL + etiqueta.Banner.url
      : bannerDefault;

    const fechaFormateada = noticia.fecha
      ? estiloFecha === "Año"
        ? new Date(noticia.fecha + 'T00:00:00').getFullYear().toString()
        : new Date(noticia.fecha + 'T00:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : '';

  return (
    <EditorModeProvider documentId={noticia.documentId}>
    <PaginaInterior fallback={bannerEtiqueta}
                    titulo={tituloPagina}
    breadcrum={[{ label: "Home", link: "/" }, { label: tituloPagina, link: `/paginas/${seccion}` }, { label: noticia.titulo }]}>
        <EditorBadge contentType="api::noticia.noticia" documentId={noticia.documentId} label="noticia" />
        <div className="container m-auto max-w-6xl px-8 mt-10 mb-24">
          <h1 className="text-xl font-bold">{noticia.titulo}</h1>
          {fechaFormateada && (
            <div className="text-sm text-gris-dictuc">{fechaFormateada}</div>
          )}
          <div className="w-min mt-2 mb-6">
            <FranjaAzul/>
          </div>
          <div className="text-sm overflow-hidden [&_a]:text-azul-dictuc [&_a]:underline [&_a]:hover:text-blue-800">
            <div className="md:float-right md:ml-6 mb-4 md:w-2/5">
              <StrapiImage
                imagen={noticia.foto}
                fallback={noticia.url_foto || FotoDefaultNoticias}
                className="w-full h-auto object-contain rounded-lg"
                alt={noticia.titulo || 'Imagen de la noticia'}
              />
            </div>
            <div dangerouslySetInnerHTML={{__html: noticia.cuerpo}}></div>
          </div>
        </div>
    </PaginaInterior>
    </EditorModeProvider>
  );
}
