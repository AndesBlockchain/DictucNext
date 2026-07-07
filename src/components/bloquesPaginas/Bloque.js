import React from "react";
import Image from "next/image";
import clsx from "clsx";
import FranjaAzul from "../FranjaAzul";
import Titulo from "../Titulo";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_API_URL;

const getFotoFondoUrl = (foto) => {
  if (!foto?.url) return null;
  if (foto.url.startsWith("http")) return foto.url;
  return `${STRAPI_URL}${foto.url}`;
};

const Bloque = ({ children, datosBloque }) => {
  const colorFondo = datosBloque?.colorFondoBloque?.Codigo || "white";
  const fotoFondo = datosBloque?.FotoFondo || null;
  const fotoFondoUrl = getFotoFondoUrl(fotoFondo);
  const colorBarrita = datosBloque?.colorBarrita?.Codigo || "azul-dictuc";
  const margenSuperior = datosBloque?.MargenSuperior || 0;
  const margenInferior = datosBloque?.MargenInferior || 0;
  const titleColor = fotoFondoUrl ? "text-white" : "";

  const bloqueClasses = clsx(
    "my-8 text-center mx-auto pl-8 pr-8 relative overflow-hidden isolate",
    { [`bg-${colorFondo}`]: !fotoFondoUrl }
  );

  const paddingStyle = {
    paddingTop: `${(4 + margenSuperior) * 0.25}rem`,
    paddingBottom: `${(4 + margenInferior) * 0.25}rem`,
    ...(fotoFondoUrl ? { minHeight: '200px' } : {}),
  };

  return (
    <div
      style={paddingStyle}
      className={bloqueClasses}
      id={datosBloque?.anchor}
    >
      {fotoFondoUrl && (
        <Image
          src={fotoFondoUrl}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          quality={75}
          className="object-cover -z-10"
        />
      )}
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
