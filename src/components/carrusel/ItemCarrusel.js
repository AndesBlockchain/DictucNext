import React from "react";

const ItemCarrusel =({index, foto}) => {

  return(
    <div id={"item"+index} className="carousel-item w-full">
      <img
        src={process.env.STRAPI_API_URL + foto.url}
        alt=""
      />
    </div>
  )
}

export default ItemCarrusel