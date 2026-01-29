import React from "react";

const ItemCarrusel =({index, foto}) => {
  return(
    <div id={"item"+index} className="carousel-item w-full">
      <img
        src={foto}
        alt=""
        className="w-full"
      />
    </div>
  )
}

export default ItemCarrusel