import React from "react"
import FranjaAzul from "./FranjaAzul"
import CardNoticia from "./CardNoticia"
import Titulo from "./Titulo"
const FotoDefaultNoticias = "/images/noticias.png"

const Noticias = ({ noticias, titulo, linkFiltroNoticias = false }) => {

  return (
    <div id="noticias" className="mt-8">
      <FranjaAzul />
      <Titulo titulo={titulo} />
      <div id="items-noticias" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-12 pl-16 pr-16 gap-y-12">
        {noticias.data.map(noticia => (
          <CardNoticia className="border"
            key={noticia.id || noticia.slug}
            titulo={noticia.titulo}
            imagen={noticia.foto}
            gatsbyImageData={noticia.foto?.localFile?.childImageSharp?.gatsbyImageData}
            fallback={noticia.url_foto || FotoDefaultNoticias}
            fecha={noticia.fecha}
            bajada={noticia.cuerpo}
            slug={noticia.slug}
          />
        ))}
      </div>
      {!linkFiltroNoticias && (
        <div className="flex justify-center items-center mt-8">
          <a href="/ultimas-noticias" className="bg-azul-dictuc text-white px-4 py-2 m-4 text-xs rounded-full hover:bg-azul-dictuc/90 transition-all">Ver más noticias</a>
        </div>
      )}
      {linkFiltroNoticias && (
        <div className="flex justify-center items-center mt-8">
          <a href="/todas-las-noticias" className="bg-azul-dictuc text-white px-4 py-2 m-4 text-xs rounded-full hover:bg-azul-dictuc/90 transition-all">Más noticias</a>
        </div>
      )}
    </div>
  )
}

export default Noticias 