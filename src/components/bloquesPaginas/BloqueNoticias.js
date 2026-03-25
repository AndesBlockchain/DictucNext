import React from "react";
import CardNoticia  from "../CardNoticia";
import Bloque from "./Bloque";
const FotoDefaultNoticias = "/images/noticias.png";

const BloqueNoticias = async ({ datosBloque }) => {
 
const cantidadNoticias= datosBloque.CantidadNoticias
const mostrarFecha= datosBloque.MostrarFecha
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
        <div className="container m-auto max-w-6xl flex flex-wrap justify-center items-center gap-8 mt-8 pb-6">
          {datosBloque.etiqueta_noticia.noticias.slice(0, cantidadNoticias).map((noticia) => (
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
    </Bloque>
);


};

export default BloqueNoticias; 