"use client"
import React from "react";
import useNoticiasByTag from "@/hooks/use-noticias-by-tag";
import CardNoticia  from "../CardNoticia";
import Bloque from "./Bloque";

const BloqueNoticias = async ({ datosBloque }) => {
 
  // Query para obtener noticias
//const noticias = await useNoticiasByTag(datosBloque.etiqueta_noticia.documentId);


const cantidadNoticias= datosBloque.CantidadNoticias
const mostrarFecha= datosBloque.MostrarFecha
const noticias={data:[]}
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
        <div className="grid grid-cols-3 flex-wrap justify-center items-center gap-8 mt-8 pb-6">
          {noticias.data.slice(0, cantidadNoticias).map((noticia) => (
            <CardNoticia
              key={noticia.id}
              titulo={noticia.titulo}
              imagen={noticia.foto}
              gatsbyImageData={noticia.foto?.localFile?.childImageSharp?.gatsbyImageData}
              fallback={noticia.url_foto || FotoDefaultNoticias}
              fecha={noticia.fecha}
              bajada={noticia.cuerpo.data.cuerpo}
              slug={noticia.slug}
              mostrarFecha={mostrarFecha}
            />
          ))}
        </div>
    </Bloque>
);


};

export default BloqueNoticias; 