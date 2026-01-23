import React from "react";
import clsx from "clsx";
import StrapiImage from "../StrapiImage";
import DegradeBase from "../DegradeBase";

const BloqueHero = ({ datosBloque }) => {

const letra = datosBloque.Texto?.tipografia?.class || "";
const colorLetra = datosBloque.Texto?.colorTexto?.Codigo || "black";
const posicion_foto= datosBloque.posicion_foto
const margenSuperior= datosBloque.Bloque.MargenSuperior
const margenInferior= datosBloque.Bloque.MargenInferior

// Clases CSS usando clsx
const tituloClasses = clsx(
  "border border-[#53565A] text-[#53565A] uppercase text-base rounded-full",
  "pt-4 pb-4 pl-8 pr-8 w-fit min-w-[40%] mx-auto relative z-20",
  "text-center bg-white font-semibold"
);

const imagenContainerClasses = clsx(
  "flex-col w-2/5 pl-8 pr-8"
);

const imagenClasses = clsx(
  "rounded-xl w-[350px]"
);

const textoContainerClasses = clsx(
  "flex-col w-3/5 content-center pl-8 text-sm text-justify pr-4 h-auto"
);

const contenidoFlexClasses = clsx(
  "flex flex-row p-12"
);

const contenedorPrincipalClasses = clsx(
  {
    [`mt-${margenSuperior}`]: true,
  }
);

  // Definir el contenido de los divs
  const contenidoImagen = (
    <div className={imagenContainerClasses}>
      <StrapiImage
        imagen={datosBloque.foto}
        gatsbyImageData={datosBloque.foto?.localFile?.childImageSharp?.gatsbyImageData}
        fallback={datosBloque.foto?.formats?.medium?.url || datosBloque.foto?.url}
        alt=""
        className={imagenClasses}
      />
    </div>
  );

  const contenidoTexto = (
    <div className={textoContainerClasses}>
      <div dangerouslySetInnerHTML={{__html: datosBloque.texto.replace("classname","class")}} />
    </div>
  );

  return (
    <div className={contenedorPrincipalClasses}>
      <div className={tituloClasses}
          dangerouslySetInnerHTML={{__html:datosBloque.Bloque.Titulo}} />
      
        {posicion_foto === "Derecha" ? (
          <div>
          <div className={contenidoFlexClasses}>
            {contenidoTexto}
            {contenidoImagen}
          </div>
          <DegradeBase color="azul-dictuc" />
          </div>
        ) : (
          <div>
          <div className={contenidoFlexClasses}>
            {contenidoImagen}
            {contenidoTexto}
          </div>
          <DegradeBase color="azul-dictuc" toRight={false} />
          </div>
        )}
     </div>
);
};

export default BloqueHero;