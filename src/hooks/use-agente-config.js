import { useStaticQuery, graphql } from "gatsby"


const useAgenteConfig = () => {
     const data = useStaticQuery(graphql`
{
  strapiAgente(Activado: {}) {
    Activado
    TextoExplicativo
  }
}
      `); 
  return data.strapiAgente;
}

export default useAgenteConfig;