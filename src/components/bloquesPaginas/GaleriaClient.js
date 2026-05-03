"use client"
import React, { useState } from "react"
import StrapiImage from "../StrapiImage"

const GaleriaClient = ({ fotos }) => {
  const [actual, setActual] = useState(0)
  const total = fotos.length

  const anterior = () => setActual((prev) => (prev - 1 + total) % total)
  const siguiente = () => setActual((prev) => (prev + 1) % total)

  if (total === 0) return null

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="relative mx-auto">
        <StrapiImage
          imagen={{ url: fotos[actual].url }}
          alt={fotos[actual].alt}
          className="h-[350px] w-auto object-contain rounded-lg"
        />

        <button
          onClick={anterior}
          className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-white/80 hover:bg-white border-none shadow"
          aria-label="Anterior"
        >
          ❮
        </button>
        <button
          onClick={siguiente}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-white/80 hover:bg-white border-none shadow"
          aria-label="Siguiente"
        >
          ❯
        </button>
      </div>

      {fotos[actual].texto && (
        <div className="text-sm text-gris-dictuc mt-2 text-center max-w-md">
          {fotos[actual].texto}
        </div>
      )}
      <div className="text-xs text-gray-400 mt-1">
        {actual + 1} / {total}
      </div>
    </div>
  )
}

export default GaleriaClient
