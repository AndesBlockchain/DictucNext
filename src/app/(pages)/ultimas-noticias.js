
import React from "react";
import PaginaInterior from "../components/PaginaInterior";
import Noticias from "../components/Noticias";
import BannerNoticias from "../images/BannerMicrofonos.webp"
import { graphql } from "gatsby";
import Titulo from "../components/Titulo";
import Instagram from "../components/Instagram";

export default function HomeNoticiasPage({pageContext,data}) {

    console.log("Data",data)
    const noticias= data.allStrapiNoticia;

  return (
    <PaginaInterior fallback={BannerNoticias}
                    titulo="Noticias y Proyectos Destacados"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Noticias y Proyectos Destacados", link: "/noticias" }]}> 
    <Noticias noticias={noticias} linkFiltroNoticias={true} />
    <Titulo titulo="Nuestro Instagram"/>
    <Instagram />
    </PaginaInterior>
  );
}

export const Head = () => <title>Dictuc | Noticias</title>

export const PAGE_QUERY = graphql`
 {
   allStrapiNoticia(sort: {fecha: DESC}, limit: 6) {
     nodes {
       titulo
       slug
       fecha
       url_foto
       cuerpo {
          data {
            cuerpo
          }
          }
       foto {
         url
         localFile {
           childImageSharp {
             gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
           }
         }
       }
     }
   }
 }
`