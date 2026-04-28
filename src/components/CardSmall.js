import React from "react";
import StrapiImage from "./StrapiImage";

export default function CardSmall({ titulo, callToAction, icono, contenido }) {

  return (
    <div className="border rounded-lg shadow-xl p-2 grid grid-cols-3 w-full h-full">
      <div className="col-span-1 p-4 flex items-center">
        <StrapiImage
          imagen={icono}
          gatsbyImageData={icono?.localFile?.childImageSharp?.gatsbyImageData}
          fallback={icono?.formats?.medium?.url || icono?.url}
          alt=""
          className="w-full"
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <h2 className="text-sm text-left font-bold">{titulo}</h2>
        <div className="text-xs text-left flex-grow mr-4" dangerouslySetInnerHTML={{__html: contenido}} />
        {callToAction && callToAction.url && (
          <div className="mt-4 text-xs text-right mr-4"><a className="text-azul-dictuc" href={callToAction.url} target={callToAction.ComoAbrir === "Ventana Nueva" ? "_blank" : "_self"} rel={callToAction.ComoAbrir === "Ventana Nueva" ? "noopener noreferrer" : undefined}>Ver detalle →</a></div>
        )}
      </div>
    </div>
  );    
}