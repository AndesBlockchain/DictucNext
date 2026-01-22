import React from "react";
import { graphql } from "gatsby";
import PaginaInterior from "../../components/PaginaInterior";
import bannerNoticias from "../../images/BannerMicrofonos.webp";
import FranjaAzul from "../../components/FranjaAzul";
import StrapiImage from "../../components/StrapiImage";
import FotoDefaultNoticias from '../../images/noticias.png'

export default function PaginasContenido({ data })
{
    const noticia = data.strapiNoticia;

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
          <div dangerouslySetInnerHTML={{__html: noticia.cuerpo.data.cuerpo}}></div>
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

// Page query - obtiene solo la noticia específica basada en el slug
export const query = graphql`
  query($slug: String!) {
    strapiNoticia(slug: { eq: $slug }) {
      slug
      titulo
      url_foto
      galeria {
        url
      }
      foto {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
      fecha
      cuerpo {
        data {
          cuerpo
        }
      }
      etiqueta_noticias {
        documentId
        etiqueta
      }
    }
  }
`;

export async function config() {
  return ({ params }) => {
    return {
      defer: true,
    }
  }
}
