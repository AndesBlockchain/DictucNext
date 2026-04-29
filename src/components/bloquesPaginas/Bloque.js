import React from "react";
import clsx from "clsx";
import FranjaAzul from "../FranjaAzul";
import Titulo from "../Titulo";

const Bloque = ({ children, datosBloque }) => {
  const STRAPI_URL = process.env.STRAPI_API_URL;

  const colorFondo = datosBloque?.colorFondoBloque?.Codigo || "white";
  const fotoFondo = datosBloque?.FotoFondo?.url || null;
  const colorBarrita = datosBloque?.colorBarrita?.Codigo || "azul-dictuc";
  const margenSuperior = datosBloque?.MargenSuperior || 0;
  const margenInferior = datosBloque?.MargenInferior || 0;
  const titleColor = fotoFondo ? "text-white" : "";

  const bloqueClasses = clsx(
    "my-8 text-center mx-auto pl-8 pr-8 relative",
    { [`bg-${colorFondo}`]: !fotoFondo }
  );

  const paddingStyle = {
    paddingTop: `${(4 + margenSuperior) * 0.25}rem`,
    paddingBottom: `${(4 + margenInferior) * 0.25}rem`,
  };

  const backgroundImageStyle = fotoFondo ? {
    backgroundImage: `url(${STRAPI_URL}${fotoFondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '200px',
  } : {};

  return (
    <div
      style={{ ...backgroundImageStyle, ...paddingStyle }}
      className={bloqueClasses}
    >
      {!datosBloque?.OcultarTitulo && (
        <>
          <FranjaAzul color={colorBarrita} />
          <Titulo color={titleColor} titulo={datosBloque?.Titulo} />
        </>
      )}
      {children}
    </div>
  );
};

export default Bloque;
