import React from "react"

const Titulo = ({ titulo, color }) => {
  if (!titulo) return null;

  return (
    <div className={"text-center mb-4 mt-4 font-semibold " + color}
      dangerouslySetInnerHTML={{__html: titulo}} />
  )
}

export default Titulo 