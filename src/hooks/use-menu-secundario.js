import { useStaticQuery, graphql } from "gatsby"


const useMenuSecundario = () => {
     const data = useStaticQuery(graphql`
      {
        allStrapiMenuSecundario {
          nodes {
            Link
            Titulo
          }
        }
      }
      `); 
  return data.allStrapiMenuSecundario.nodes;
}

export default useMenuSecundario;