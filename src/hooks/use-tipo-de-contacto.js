import { useStaticQuery, graphql } from "gatsby"


const useTipoDeContacto = () => {
   const data = useStaticQuery(graphql`
     {
        allStrapiTipoDeContacto(sort: {Tipo: ASC}) {
          nodes {
            id
            Tipo
            Destinatario
            documentId
          }
        }
      }
  `);
  return data.allStrapiTipoDeContacto.nodes; 
}

export default useTipoDeContacto;



