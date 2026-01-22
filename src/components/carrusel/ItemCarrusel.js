import React from "react";
import StrapiImage from "../StrapiImage";

const ItemCarrusel =({index, foto}) => {
  return(
    <div id={"item"+index} className="carousel-item w-full">
      <StrapiImage
        imagen={foto}
        alt=""
        className="w-full"
      />
    </div>
  )
}

export default ItemCarrusel