import React from "react";
import Bloque from "./Bloque";
import StrapiImage from "../StrapiImage";
import DegradeBase from "../DegradeBase";

const BloqueHero = ({ datosBloque }) => {
  const fotoADerecha = datosBloque.posicion_foto === "Derecha";

  return (
    <Bloque datosBloque={{ ...datosBloque.Bloque, OcultarTitulo: true }}>
      <div
        className="border border-[#53565A] text-[#53565A] uppercase text-base rounded-full
          py-4 px-8 w-fit min-w-[40%] mx-auto relative z-20 mb-0 text-center bg-white font-semibold"
        dangerouslySetInnerHTML={{ __html: datosBloque.Bloque.Titulo }}
      />

      <div className={`flex gap-8 ${fotoADerecha ? "flex-row-reverse" : "flex-row"}`}>
        <div className="w-2/5">
          <StrapiImage
            imagen={datosBloque.foto}
            fallback={datosBloque.foto?.formats?.medium?.url || datosBloque.foto?.url}
            alt=""
            className="rounded-xl w-full"
          />
        </div>

        <div className="w-3/5 flex flex-col justify-center text-sm text-justify">
          <div dangerouslySetInnerHTML={{ __html: datosBloque.texto.replaceAll("classname", "class") }} />
        </div>
      </div>

      <DegradeBase color="azul-dictuc" toRight={fotoADerecha} />
    </Bloque>
  );
};

export default BloqueHero;