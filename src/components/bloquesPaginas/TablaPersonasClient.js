"use client"
import React, { useState, useMemo } from "react"

const TablaPersonasClient = ({ personas, cantidadFilas }) => {
  const [busqueda, setBusqueda] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)

  const personasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return personas
    const termino = busqueda.toLowerCase()
    return personas.filter(
      (p) =>
        p.Nombre?.toLowerCase().includes(termino) ||
        p.especialidad?.toLowerCase().includes(termino) ||
        p.personas_departamentos?.some(d => d.Departamente?.toLowerCase().includes(termino))
    )
  }, [personas, busqueda])

  const totalPaginas = Math.ceil(personasFiltradas.length / cantidadFilas)
  const inicio = (paginaActual - 1) * cantidadFilas
  const personasPagina = personasFiltradas.slice(inicio, inicio + cantidadFilas)

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
          placeholder="Buscar por nombre, departamento o especialidad..."
          value={busqueda}
          onChange={handleBusqueda}
          className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azul-dictuc text-sm w-64"
        />
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-azul-dictuc text-white">
            <th className="px-4 py-3 text-center text-sm font-semibold">Nombre</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Departamento</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Especialidad</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Más información</th>
          </tr>
        </thead>
        <tbody>
          {personasPagina.length > 0 ? (
            personasPagina.map((persona, index) => (
              <tr
                key={persona.documentId || persona.id || index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                data-algolia="persona-tabla"
              >
                <td className="px-4 py-3 text-sm text-left border-b border-gray-200" data-algolia-name>
                  {persona.Nombre}
                </td>
                <td className="px-4 py-3 text-sm text-left border-b border-gray-200" data-algolia-department>
                  {persona.personas_departamentos?.length > 0
                    ? persona.personas_departamentos.map(d => d.Departamente).join(", ")
                    : <span className="text-gray-400">—</span>
                  }
                </td>
                <td className="px-4 py-3 text-sm text-left border-b border-gray-200" data-algolia-specialty>
                  {persona.especialidad || <span className="text-gray-400">—</span>}
                </td>
                <td className="px-4 py-3 text-sm border-b border-gray-200 text-center">
                  {persona.link_ver_mas_informacion ? (
                    <a
                      href={persona.link_ver_mas_informacion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-azul-dictuc font-semibold hover:underline"
                    >
                      Ver más
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
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

      {/* Datos completos ocultos para indexación Algolia */}
      <div className="hidden" aria-hidden="true">
        {personas.map((persona) => (
          <div key={persona.documentId || persona.id} data-algolia="persona-tabla">
            <span data-algolia-name>{persona.Nombre}</span>
            <span data-algolia-department>{persona.personas_departamentos?.map(d => d.Departamente).join(", ")}</span>
            <span data-algolia-specialty>{persona.especialidad}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablaPersonasClient
