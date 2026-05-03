import React from "react";
import Bloque from "./Bloque";
import StrapiImage from "../StrapiImage";
import DegradeBase from "../DegradeBase";

const BloqueHero = ({ datosBloque }) => {
  const fotoADerecha = datosBloque.posicion_foto === "Derecha";

  return (
    <Bloque datosBloque={{ ...datosBloque.Bloque, OcultarTitulo: true }}>
      {datosBloque.Bloque?.Titulo && (
        <div
          className="border border-[#53565A] text-[#53565A] text-base rounded-full
            py-4 px-6 w-fit min-w-[30%] mx-auto relative translate-y-1/2 z-20 mb-0 text-center bg-white font-semibold"
          dangerouslySetInnerHTML={{ __html: datosBloque.Bloque.Titulo }}
        />
      )}
      <div id="hero" className={`container m-auto max-w-6xl pl-8 pr-8 relative flex flex-col gap-8 pb-4 ${fotoADerecha ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div className="w-full md:w-2/5 max-w-[350px] mx-auto relative z-10">
          <StrapiImage
            imagen={datosBloque.foto}
            fallback={datosBloque.foto?.formats?.medium?.url || datosBloque.foto?.url}
            alt={datosBloque.Bloque?.Titulo?.replace(/<[^>]*>/g, '') || "Hero"}
            maxWidth={500}
            className="rounded-xl w-full"
          />
        </div>

        <div className="w-full lg:w-3/5 flex flex-col mt-8 justify-center text-sm text-center lg:text-justify">
          {datosBloque.texto && (
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: datosBloque.texto.replaceAll("classname", "class") }} />
          )}
        </div>

        <div className="absolute -bottom-16 sm:-bottom-12 md:-bottom-8 lg:-bottom-4 left-0 right-0 overflow-hidden h-[40px]">
          <div className="hidden sm:block [&>div]:mt-0 [&>div]:mb-0">
            <DegradeBase color={datosBloque.color?.Codigo} toRight={fotoADerecha} />
          </div>
        </div>
      </div>
    </Bloque>
  );
};

export default BloqueHero;
