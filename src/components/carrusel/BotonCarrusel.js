import React from "react";


const BotonCarrusel =({index}) => {
  return(
    <a href={"#item" + index} className="btn btn-xs">{index}</a>
  )
}

export default BotonCarrusel