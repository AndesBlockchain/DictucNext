import React from "react"

const Titulo = ({ titulo, color }) => {

  return (
    <div className={"text-center mb-4 mt-4 font-semibold uppercase " + color} 
      dangerouslySetInnerHTML={{__html: titulo}} />
  )
}

export default Titulo 