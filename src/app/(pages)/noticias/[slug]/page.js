import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
const bannerNoticias = "/images/BannerMicrofonos.webp";
import FranjaAzul from "@/components/FranjaAzul";
import StrapiImage from "@/components/StrapiImage";
const FotoDefaultNoticias = "/images/noticias.png"
import useNoticia from '@/hooks/use-noticia';

export default async function PaginasContenido({ params })
{
    const { slug } = await params;
    const noticia = await useNoticia(slug);

    if (!noticia) {
      return (
        <PaginaInterior fallback={bannerNoticias} titulo="Noticias"
          breadcrum={[{ label: "Home", link: "/" }, { label: "Noticias", link: "/todas-las-noticias" }]}>
          <div className="text-center py-16 text-gray-500">Noticia no encontrada</div>
        </PaginaInterior>
      );
    }

    const fechaFormateada = noticia.fecha
      ? new Date(noticia.fecha + 'T00:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : '';

  return (
    <PaginaInterior fallback={bannerNoticias}
                    titulo="Noticias"
    breadcrum={[{ label: "Home", link: "/" }, {label:"Noticias", link:"/todas-las-noticias"}, { label: noticia.titulo, link: "/" }]}>
        <div className="container m-auto max-w-6xl px-8 mt-10 mb-24">
          <h1 className="text-xl font-bold">{noticia.titulo}</h1>
          <div className="text-sm text-gris-dictuc">{fechaFormateada}</div>
          <div className="w-min mt-2 mb-6">
            <FranjaAzul/>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/5 shrink-0">
              <StrapiImage
                imagen={noticia.foto}
                gatsbyImageData={noticia.foto?.localFile?.childImageSharp?.gatsbyImageData}
                fallback={noticia.url_foto || FotoDefaultNoticias}
                className="w-full h-auto object-contain rounded-lg"
                alt={noticia.titulo || 'Imagen de la noticia'}
              />
            </div>
            <div className="w-full md:w-3/5 text-sm [&_a]:text-azul-dictuc [&_a]:underline [&_a]:hover:text-blue-800">
              <div dangerouslySetInnerHTML={{__html: noticia.cuerpo}}></div>
            </div>
          </div>
        </div> 
         </PaginaInterior>

  );
}