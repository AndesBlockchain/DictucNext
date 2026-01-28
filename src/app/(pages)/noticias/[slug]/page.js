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
    console.log("noticia", noticia)
  return (
    <PaginaInterior fallback={bannerNoticias}
                    titulo="Noticias y Proyectos Destacados"
    breadcrum={[{ label: "Home", link: "/" }, {label:"Noticias y Proyectos Destacados", link:"/noticias"}, { label: noticia.titulo, link: "/" }]}>
        <h1 className="text-lg text-bold uppercase font-bold">{noticia.titulo}</h1>
        <div className="text-sm text-gray-300">{noticia.fecha}</div>
        <div className="w-min mt-2 mb-2">
        <FranjaAzul/>
        </div>
        <div className="p-8 pl-16 pr-16 text-sm">
          <div dangerouslySetInnerHTML={{__html: noticia.cuerpo}}></div>
         </div>
         <div className="flex justify-center mb-8">
           <StrapiImage
             imagen={noticia.foto}
             gatsbyImageData={noticia.foto?.localFile?.childImageSharp?.gatsbyImageData}
             fallback={noticia.url_foto || FotoDefaultNoticias}
             className="max-w-[250px] max-h-[250px] md:max-w-[350px] md:max-h-[350px] lg:max-w-[1/3] lg:max-h-[1/3] w-full h-auto object-contain rounded-lg"
             alt={noticia.titulo || 'Imagen de la noticia'}
           />
         </div>
         </PaginaInterior>

  );
}