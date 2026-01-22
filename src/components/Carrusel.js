import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import BarraFondoGris from "./BarraFondoGris";

const Carrusel = () => {

    const data = useStaticQuery(graphql`
query carruselQuery {
  allStrapiCarrusel(sort: {sortOrder: ASC}) {
    nodes {
      FraseInferior
      OcultarFrases
      FraseSuperior
      sortOrder
      Imagen {
        height
        width
        url
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 1920
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
}
      `);

    // Creamos el array carruselData con objetos itemCarrusel
    const carruselData = data.allStrapiCarrusel.nodes.map(item => {
        const imagen = item.Imagen && item.Imagen[0] ? item.Imagen[0] : {};
        return {
          fraseSuperior: item.FraseSuperior || "",
          fraseInferior: item.FraseInferior || "",
          frasesVisibles: !item.OcultarFrases ? true : false,
          gatsbyImageData: imagen.localFile?.childImageSharp?.gatsbyImageData || null,
          // Fallback para desarrollo si la imagen no se ha procesado aún
          url: imagen.url || "",
          alto: imagen.height || 0,
          ancho: imagen.width || 0,
        };
      });
  
      const [indiceCarrusel, setIndiceCarrusel] = useState(0);

      const anteriorImagen = () => {
        setIndiceCarrusel(prev => prev === 0 ? carruselData.length - 1 : prev - 1);
      };
  
      const siguienteImagen = () => {
        setIndiceCarrusel(prev => prev === carruselData.length - 1 ? 0 : prev + 1);
      };

      return (
            <div className="relative z-0 isolate">
                <BarraFondoGris className={carruselData[indiceCarrusel].frasesVisibles === false ? " invisible" : ""}>
                    {carruselData[indiceCarrusel].fraseSuperior}
                </BarraFondoGris>
                <div id="texto-carrusel-2" className={"font-semibold absolute text-lg bottom-15 right-0 z-5 w-3/5 bg-gray-200 opacity-90 text-opacity-90 px-6 py-3 rounded-l-full" + (carruselData[indiceCarrusel].frasesVisibles === false ? " invisible" : "")}>
                  {carruselData[indiceCarrusel].fraseInferior}
                </div>
              <div className="w-full bg-gray-50 flex items-center justify-center shadow-md relative">
                <button onClick={anteriorImagen} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                {carruselData[indiceCarrusel].gatsbyImageData ? (
                  <GatsbyImage 
                    image={carruselData[indiceCarrusel].gatsbyImageData}
                    alt=""
                    className="select-none"
                    draggable={false}
                  />
                ) : (
                  <img 
                    src={carruselData[indiceCarrusel].url}  
                    className="select-none"
                    draggable="false"
                    alt=""
                  />
                )}
                <button onClick={siguienteImagen} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
 
      )}


export default Carrusel