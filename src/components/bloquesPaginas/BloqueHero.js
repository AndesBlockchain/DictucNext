import React from "react";
import Bloque from "./Bloque";
import StrapiImage from "../StrapiImage";
import DegradeBase from "../DegradeBase";

const BloqueHero = ({ datosBloque }) => {
  console.log("Hero",datosBloque)
  const fotoADerecha = datosBloque.posicion_foto === "Derecha";

  return (
    <Bloque datosBloque={{ ...datosBloque.Bloque, OcultarTitulo: true }}>
      <div className="">
      <div
        className="border border-[#53565A] text-[#53565A] text-base rounded-full
          py-4 px-4 w-fit min-w-[40%] mx-auto relative translate-y-1/2 z-20 mb-0 text-center bg-white font-semibold"
        dangerouslySetInnerHTML={{ __html: datosBloque.Bloque.Titulo }}
      />
  <div className="container m-auto max-w-6xl pl-8 pr-8">
      <div id="hero" className={`container m-auto max-w-6xl pl-8 pr-8 relative flex flex-col gap-8 pb-4 ${fotoADerecha ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div className="w-full md:w-2/5 max-w-[350px] mx-auto relative z-10">
          <StrapiImage
            imagen={datosBloque.foto}
            fallback={datosBloque.foto?.formats?.medium?.url || datosBloque.foto?.url}
            alt=""
            className="rounded-xl w-full"
          />
        </div>

        <div className="w-full lg:w-3/5 flex flex-col justify-center text-sm text-center lg:text-justify">
          <div dangerouslySetInnerHTML={{ __html: datosBloque.texto.replaceAll("classname", "class") }} />
        </div>


        </div>

      </div>
      </div>
    </Bloque>
  );
};

export default BloqueHero;