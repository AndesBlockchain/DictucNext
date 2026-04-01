import React from "react";
import StrapiImage from "./StrapiImage";

const ItemSectoresPais = ({ icono, url_icono, gatsbyImageData, url, nombre }) => {
  return (
    <div className="flex flex-col items-center w-[90px]">
      <div>
      <a href={url} className="flex flex-col items-center">
        <div className="h-[45px] flex items-start justify-center">
          <StrapiImage
            imagen={icono}
            gatsbyImageData={gatsbyImageData}
            fallback={url_icono}
            alt={nombre || ""}
            className="w-[57px] h-[45px] object-contain"
          />
        </div>
      </a>
      </div>
      <div className="text-center text-azul-dictuc font-semibold text-[9px] mt-1">{nombre}</div>
    </div>
  )
};

export default ItemSectoresPais;
