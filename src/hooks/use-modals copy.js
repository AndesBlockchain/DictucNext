import { useStaticQuery, graphql } from "gatsby"


const useModals = () => {
    const data = useStaticQuery(graphql`
{
  allStrapiAlertaModal {
    nodes {
      Publicacion {
        fechaDesde
        fechaHasta
      }
      imagen {
        url
      }
    }
  }
}
  `);
  return data.allStrapiAlertaModal;  
}

export default useModals;