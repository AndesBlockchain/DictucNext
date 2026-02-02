import { useStaticQuery, graphql } from "gatsby"


const useHomeNoticias = () => {
     const data = useStaticQuery(graphql`
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
       }
     }
   }
 }
       `); 
   return data.allStrapiNoticia;
}

export default useHomeNoticias;