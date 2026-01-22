import { useStaticQuery, graphql } from "gatsby"

const useNoticiasPorAgno = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiNoticia(sort: { fecha: DESC }, limit: 10) {
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

  // Agrupar noticias por año
  const noticiasPorAgno = data.allStrapiNoticia.nodes.reduce((acc, noticia) => {
    const agno = new Date(noticia.fecha).getFullYear();
    
    if (!acc[agno]) {
      acc[agno] = [];
    }
    
    acc[agno].push(noticia);
    return acc;
  }, {});

  // Ordenar las noticias dentro de cada año de más recientes a más antiguas
  Object.keys(noticiasPorAgno).forEach(agno => {
    noticiasPorAgno[agno].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  });

  // Ordenar los años de forma descendente (más reciente primero)
  const agnosOrdenados = Object.keys(noticiasPorAgno).sort((a, b) => parseInt(b) - parseInt(a));
  
  console.log('Años ordenados:', agnosOrdenados);
  console.log('Noticias por año:', noticiasPorAgno);

  // Crear objeto final con años ordenados
  const resultado = {};
  agnosOrdenados.forEach(agno => {
    resultado[agno] = noticiasPorAgno[agno];
  });
  
  console.log('Resultado final:', resultado);

  return resultado;
}

export default useNoticiasPorAgno;
