import React from "react";
import CardNoticia  from "../CardNoticia";
import CallToAction from "../CallToAction";
import Bloque from "./Bloque";
const FotoDefaultNoticias = "/images/noticias.png";

const BloqueNoticias = ({ datosBloque }) => {
  const cantidadNoticias = datosBloque.CantidadNoticias;
  const mostrarFecha = datosBloque.MostrarFecha;
  const botones = datosBloque.CallToAction || [];

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
        <div className="container m-auto max-w-6xl flex flex-wrap justify-center items-stretch gap-8 mt-8 pb-6">
          {(datosBloque.etiqueta_noticia?.noticias || []).slice(0, cantidadNoticias).map((noticia) => (
            <CardNoticia
              key={noticia.id}
              titulo={noticia.titulo}
              imagen={noticia.foto}
              gatsbyImageData={noticia.foto?.localFile?.childImageSharp?.gatsbyImageData}
              fallback={noticia.url_foto || FotoDefaultNoticias}
              fecha={noticia.fecha}
              bajada={noticia.cuerpo}
              slug={noticia.slug}
              mostrarFecha={mostrarFecha}
            />
          ))}
        </div>
        {botones.length > 0 && (
          <div className="flex flex-row mt-4 items-center justify-center gap-4 pb-6">
            {botones.map((item, index) => (
              <CallToAction
                key={index}
                url={item.url}
                colorFondo={item.colorBoton}
                colorTexto={item.colorTexto}
                ComoAbrir={item.ComoAbrir}
                texto={item.texto}
              />
            ))}
          </div>
        )}
    </Bloque>
);


};

export default BloqueNoticias; 