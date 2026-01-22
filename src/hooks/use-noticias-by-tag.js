import { useStaticQuery, graphql } from "gatsby"

const useNoticiasByTag = (documentId) => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiNoticia {
        nodes {
          slug
          titulo
          url_foto
          galeria {
            url
          }
          foto {
            url
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
    }
  `);
  
  // Filtrar las noticias por documentId después de obtener todos los datos
  
  const noticiasFiltradas = data.allStrapiNoticia.nodes.filter(noticia => 
    noticia.etiqueta_noticias && 
    noticia.etiqueta_noticias.some(etiqueta => etiqueta.documentId === documentId)
  );
  return {
    nodes: noticiasFiltradas
  };
}

// Función para determinar el fondo basado en fotoFondo y colorFondo
const claseFondo = (fotoFondo, colorFondo) => {
  if (fotoFondo && fotoFondo !== false) {
    return `url(${fotoFondo})`;
  } else {
    return colorFondo;
  }
};

export default useNoticiasByTag;
export { claseFondo };