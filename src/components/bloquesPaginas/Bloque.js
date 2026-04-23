import React from "react";
import clsx from "clsx";
import FranjaAzul from "../FranjaAzul";
import Titulo from "../Titulo";

const Bloque = ({ children, datosBloque, sinBarrita=false }) => {
  const STRAPI_URL =  process.env.STRAPI_API_URL;

  // Procesamiento de los datos para el fondo
  const colorFondo = datosBloque?.colorFondoBloque?.Codigo || "white";
  const fotoFondo = datosBloque?.FotoFondo?.url || false;
  const colorBarrita = datosBloque?.colorBarrita?.Codigo || "azul-dictuc";
  const margenSuperior = datosBloque?.MargenSuperior || 0;
  const margenInferior = datosBloque?.MargenInferior || 0;

  const getTitleColor = () => {
    if (fotoFondo && fotoFondo !== false) {
      return "text-white";
    } else {
      return "";
    }
  };

  // Construir las clases usando clsx
  const bloqueClasses = clsx(
    "my-8 text-center mx-auto pl-8 pr-8 relative",
    {
      [`bg-${colorFondo}`]: !fotoFondo,
    }
  );

  const paddingStyle = {
    paddingTop: `${(4 + margenSuperior) * 0.25}rem`,
    paddingBottom: `${(4 + margenInferior) * 0.25}rem`,
  };

  // Estilos para la imagen de fondo
  const backgroundImageStyle = fotoFondo ? {
    backgroundImage: `url(${STRAPI_URL}${fotoFondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '200px', // Altura mínima para asegurar que se vea la imagen
  } : {};

  return (
    <div 
      style={{...backgroundImageStyle, ...paddingStyle}}
      key={datosBloque?.id}
      className={bloqueClasses}
    >      
      {!datosBloque?.OcultarTitulo && (
        <>
          <FranjaAzul color={colorBarrita} />
          <Titulo color={getTitleColor()} titulo={datosBloque?.Titulo} />
        </>
      )}
      {children}
    </div>
  );
};

export default Bloque;