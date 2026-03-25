import React from "react";
import Bloque from "./Bloque";
import StrapiImage from "../StrapiImage";
import DegradeBase from "../DegradeBase";

const BloqueHero = ({ datosBloque }) => {
  const fotoADerecha = datosBloque.posicion_foto === "Derecha";

  return (
    <Bloque datosBloque={{ ...datosBloque.Bloque, OcultarTitulo: true }}>
      <div className="container m-auto max-w-6xl pl-8 pr-8">
      <div
        className="border border-[#53565A] text-[#53565A] uppercase text-base rounded-full
          py-4 px-8 w-fit min-w-[40%] mx-auto relative translate-y-1/2 z-20 mb-0 text-center bg-white font-semibold"
        dangerouslySetInnerHTML={{ __html: datosBloque.Bloque.Titulo }}
      />

      <div id="hero" className={`relative pl-2 pr-2 flex flex-col gap-8 pb-4 ${fotoADerecha ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
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

        <div className="absolute -bottom-8 left-0 right-0 overflow-hidden h-[40px]">
          <div className="[&>div]:mt-0 [&>div]:mb-0">
            <DegradeBase color="azul-dictuc" toRight={fotoADerecha} />
          </div>
        </div>
      </div>
      </div>
    </Bloque>
  );
};

export default BloqueHero;