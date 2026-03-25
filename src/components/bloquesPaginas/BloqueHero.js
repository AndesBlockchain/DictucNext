import React from "react";
import StrapiImage from "../StrapiImage";
import DegradeBase from "../DegradeBase";

const BloqueHero = ({ datosBloque }) => {
  const posicionFoto = datosBloque.posicion_foto;
  const margenSuperior = datosBloque.Bloque.MargenSuperior;
  const margenInferior = datosBloque.Bloque.MargenInferior;
  const colorFondo = datosBloque.Bloque?.colorFondoBloque?.Codigo || "white";
  const fotoADerecha = posicionFoto === "Derecha";

  return (
    <div
      style={{
        marginTop: `${margenSuperior}rem`,
        marginBottom: `${margenInferior}rem`,
        backgroundColor: colorFondo,
      }}
    >
      <div className="container m-auto max-w-6xl">
        <div
          className="border border-[#53565A] text-[#53565A] uppercase text-base rounded-full pt-4 pb-4 pl-8 pr-8 w-fit min-w-[40%] mx-auto relative z-20 text-center bg-white font-semibold"
          dangerouslySetInnerHTML={{ __html: datosBloque.Bloque.Titulo }}
        />

        <div className={`flex pb-12 ${fotoADerecha ? "flex-row-reverse" : "flex-row"}`}>
          <div className="flex-col w-2/5 pl-8 pr-8">
            <StrapiImage
              imagen={datosBloque.foto}
              fallback={datosBloque.foto?.formats?.medium?.url || datosBloque.foto?.url}
              alt=""
              className="rounded-xl w-[350px]"
            />
          </div>

          <div className="flex-col w-3/5 content-center pl-8 text-sm text-justify pr-4 h-auto">
            <div dangerouslySetInnerHTML={{ __html: datosBloque.texto.replaceAll("classname", "class") }} />
          </div>
        </div>

        <DegradeBase color="azul-dictuc" toRight={fotoADerecha} />
      </div>
    </div>
  );
};

export default BloqueHero;