import React from "react";
import StrapiImage from "./StrapiImage";

const ItemSectoresPais = ({ icono, url_icono, gatsbyImageData, url, nombre }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <a href={url}>
        <StrapiImage
          imagen={icono}
          gatsbyImageData={gatsbyImageData}
          fallback={url_icono}
          alt={nombre || ""}
          className="w-[90px] h-auto"
        />
      </a>
    </div>
  )
};

export default ItemSectoresPais;
