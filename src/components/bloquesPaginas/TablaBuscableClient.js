"use client"
import React, { useState, useMemo } from "react"

const ITEMS_PER_PAGE = 8

const TablaBuscableClient = ({ datos }) => {
  const [busqueda, setBusqueda] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)

  const datosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return datos
    const termino = busqueda.toLowerCase()
    return datos.filter((item) =>
      item.Titulo?.toLowerCase().includes(termino)
    )
  }, [datos, busqueda])

  const totalPaginas = Math.ceil(datosFiltrados.length / ITEMS_PER_PAGE)
  const inicio = (paginaActual - 1) * ITEMS_PER_PAGE
  const datosPagina = datosFiltrados.slice(inicio, inicio + ITEMS_PER_PAGE)

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value)
    setPaginaActual(1)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Buscador */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={handleBusqueda}
          className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azul-dictuc text-sm w-64"
        />
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse">
        <tbody>
          {datosPagina.length > 0 ? (
            datosPagina.map((item, index) => (
              <tr
                key={item.documentId || item.id || index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 align-middle text-center border-b border-gray-200">
                  <div className="font-semibold text-sm text-azul-dictuc">{item.Titulo}</div>
                  {item.Bajada && (
                    <div className="text-xs text-gray-500 mt-1">{item.Bajada}</div>
                  )}
                </td>
                <td className="px-4 py-3 align-top border-b border-gray-200 text-xs" dangerouslySetInnerHTML={{ __html: item.Contenido || "" }} />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="px-4 py-6 text-center text-sm text-gray-500">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-40 hover:bg-gray-100 transition-colors"
          >
            Anterior
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPaginaActual(num)}
              className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                paginaActual === num
                  ? "bg-azul-dictuc text-white border-azul-dictuc"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-40 hover:bg-gray-100 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default TablaBuscableClient