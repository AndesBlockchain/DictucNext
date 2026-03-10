import React from "react";
import StrapiImage from "./StrapiImage";

export default function CardSmall({ titulo, callToAction, icono, contenido }) {

  return (
    <div className="border rounded-lg shadow-xl p-4 grid grid-cols-3 w-full">
      <div className="col-span-1 p-4">
        <StrapiImage
          imagen={icono}
          gatsbyImageData={icono?.localFile?.childImageSharp?.gatsbyImageData}
          fallback={icono?.formats?.medium?.url || icono?.url}
          alt=""
          className="w-full"
        />
      </div>
      <div className="col-span-2">
        <h2 className="text-lg font-bold">{titulo}</h2>
        <div dangerouslySetInnerHTML={{__html: contenido}} />
        {callToAction && callToAction.url && (
          <div className="mt-4 text-sm"><a className="text-azul-dictuc" href={callToAction.url}>Ver detalle →</a></div>
        )}
      </div>
    </div>
  );    
}