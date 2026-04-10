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
  return (
    <PaginaInterior fallback={bannerNoticias}
                    titulo="Noticias"
    breadcrum={[{ label: "Home", link: "/" }, {label:"Noticias", link:"/todas-las-noticias"}, { label: noticia.titulo, link: "/" }]}>
        <div className="container m-auto max-w-12xl">
          <h1 className="text-xl text-bold font-bold mt-10">{noticia.titulo}</h1>
          <div className="text-sm text-gris-dictuc">{noticia.fecha}</div>
          <div className="w-min mt-2 mb-2">
          <FranjaAzul/>
          </div>
          <div className="mt-8 text-sm [&_a]:text-azul-dictuc [&_a]:underline [&_a]:hover:text-blue-800">
            <div dangerouslySetInnerHTML={{__html: noticia.cuerpo}}></div>
          </div>
          <div className="flex justify-center mt-16 mb-24">
            <StrapiImage
              imagen={noticia.foto}
              gatsbyImageData={noticia.foto?.localFile?.childImageSharp?.gatsbyImageData}
              fallback={noticia.url_foto || FotoDefaultNoticias}
              className="max-w-[350px] max-h-[350px] md:max-w-[450px] md:max-h-[450px] lg:max-w-[1/3] lg:max-h-[1/3] w-full h-auto object-contain rounded-lg"
              alt={noticia.titulo || 'Imagen de la noticia'}
            />
          </div>
        </div> 
         </PaginaInterior>

  );
}