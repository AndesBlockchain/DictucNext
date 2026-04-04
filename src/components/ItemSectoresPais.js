import React from "react";
import StrapiImage from "./StrapiImage";

const ItemSectoresPais = ({ icono, url_icono, gatsbyImageData, url, nombre }) => {
  return (
    <div className="flex flex-col items-center w-[120px] group-hover/sectores:opacity-40 hover:!opacity-100 transition-opacity">
      
      <a href={url} className="flex flex-col items-center">
        <div>
        <div className="h-[45px] flex items-start justify-center">
          <StrapiImage
            imagen={icono}
            gatsbyImageData={gatsbyImageData}
            fallback={url_icono}
            alt={nombre || ""}
            className="w-[57px] h-[45px] object-contain"
          />
        </div>
      
      </div>
      <div className="text-center text-azul-dictuc font-bold text-[11px] mt-1">{nombre}</div>
    
    </a>
    </div>
  )
};

export default ItemSectoresPais;
