import React from "react"
import FranjaAzul from "./FranjaAzul"
import Titulo from "./Titulo"
import AgenteForm from "./AgenteForm"

const Agente = ({
  titulo = "¿Qué Necesitas?",
  franja = true,
  backgroundColor = "bg-gray-100",
  padding = 8,
  marginTop = 12
}) => {

  // Note: These class maps are not used in the original return JSX for the container div
  // The container div has hardcoded "mt-8 pt-6 pb-6"
  // If we wanted to use them, we should apply them.
  // For now, preserving existing functionality which ignored them or applied basics.
  // Actually, checking original code, it ignored `marginTop` and `padding` props in the returned JSX,
  // using hardcoded classes instead. I will stick to what was rendered basically, but logically injecting AgenteForm.

  return (
    <div
      id="agente"
      className="mt-8 pt-6 bg-gray-100 pb-6"
    >
      {franja && <FranjaAzul />}
      <Titulo titulo="¿Qué <span class='text-azul-dictuc'>necesitas?</span>" />
      <AgenteForm />
    </div>
  )
}

export default Agente 