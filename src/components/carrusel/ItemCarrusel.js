import React from "react";

const ItemCarrusel =({index, foto, alt}) => {

  return(
    <div id={"item"+index} className="carousel-item w-full">
      <img
        src={process.env.STRAPI_API_URL + foto.url}
        alt={alt || ""}
        className="w-full h-auto object-contain"
      />
    </div>
  )
}

export default ItemCarrusel