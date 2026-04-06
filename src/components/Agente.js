import React from "react"
import FranjaAzul from "./FranjaAzul"
import Titulo from "./Titulo"
import AgenteForm from "./AgenteForm"

const Agente = ({
  titulo = "¿QUÉ <span class='text-azul-dictuc'>NECESITAS?</span>",
  franja = true,
  backgroundColor = "bg-gray-100",
  padding = 6,
  marginTop = 8
}) => {

  return (
    <div
      id="agente"
      style={{
        marginTop: `${marginTop * 0.25}rem`,
        paddingTop: `${padding * 0.25}rem`,
        paddingBottom: `${padding * 0.25}rem`,
      }}
      className={backgroundColor}
    >
      {franja && <FranjaAzul />}
      <Titulo titulo={titulo} />
      <AgenteForm />
    </div>
  )
}

export default Agente