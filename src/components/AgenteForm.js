"use client"
import React, { useState } from "react"
import ModalAgente from "./ModalAgente"

const AgenteForm = () => {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [textoConsulta, setTextoConsulta] = useState("")
    const [placeholder, setPlaceholder] = useState("Describe lo que estas buscando, el servicio que necesitas o el problema en que necesitas de nuestra ayuda")

    const handleConsultar = () => {
        if (!textoConsulta.trim()) {
            setPlaceholder("Por favor ingresa tu pregunta.")
            return
        }
        setModalAbierto(true)
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col max-w-2xl w-full mx-2 sm:mx-0 sm:p-1 rounded-2xl border border-gray-300 bg-white overflow-hidden shadow-lg">
                    <textarea
                        rows={3}
                        value={textoConsulta}
                        onChange={(e) => setTextoConsulta(e.target.value)}
                        placeholder={placeholder}
                        className="flex-grow px-6 py-6 text-lg focus:outline-none resize-none"
                    />
                    <div className="flex justify-end">
                        <button
                            className="bg-azul-dictuc text-white px-4 py-2 m-4 text-xs rounded-full hover:bg-azul-dictuc/90 transition-all"
                            onClick={handleConsultar}
                        >
                            Consultar
                        </button>
                    </div>
                </div>
            </div>
            {modalAbierto && (
                <ModalAgente
                    onClose={() => {
                        setModalAbierto(false);
                        setTextoConsulta("");
                    }}
                    pregunta={textoConsulta}
                />
            )}
        </>
    )
}

export default AgenteForm
