"use client"
import React, { useState, useRef, useEffect, useCallback } from "react"
import { liteClient as algoliasearch } from "algoliasearch/lite"

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
)

const INDICES = [
  { name: "development_api::servicio.servicio", label: "Servicios", urlPrefix: "/servicios/" },
  { name: "development_api::noticia.noticia", label: "Noticias", urlPrefix: "/noticias/" },
  { name: "development_api::pagina.pagina", label: "Páginas", urlPrefix: "/" },
  { name: "development_api::documento.documento", label: "Documentos", urlPrefix: "/documentos/" },
  { name: "frontend_dictuc_andesblockchain_com_6dxbncdc9x_pages", label: "Sitio", urlPrefix: "" },
]

const getHitTitle = (hit) =>
  hit.nombre || hit.titulo || hit.title || hit.Titulo || hit.Nombre || "Sin título"

const getHitUrl = (hit, index) => {
  if (hit.url || hit.path) return hit.url || hit.path
  if (hit.slug) return index.urlPrefix + hit.slug
  return "#"
}

const BuscadorAlgolia = () => {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef(null)

  // Debounce: buscar 300ms después de dejar de escribir
  useEffect(() => {
    if (!inputValue.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const timer = setTimeout(async () => {
      try {
        const { results: searchResults } = await searchClient.search({
          requests: INDICES.map((idx) => ({
            indexName: idx.name,
            query: inputValue,
            hitsPerPage: 5,
          })),
        })

        const grouped = searchResults
          .map((result, i) => ({
            index: INDICES[i],
            hits: result.hits || [],
          }))
          .filter((group) => group.hits.length > 0)

        setResults(grouped)
      } catch (error) {
        console.error("Error en búsqueda Algolia:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue])

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Cerrar con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const totalResults = results.reduce((sum, group) => sum + group.hits.length, 0)

  return (
    <div ref={containerRef} className="w-full lg:w-auto flex flex-col items-center gap-2 mt-4 lg:mt-0 relative">
      <input
        type="text"
        placeholder="Buscar en el sitio"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => {
          if (inputValue.trim()) setIsOpen(true)
        }}
        className="w-full max-w-xs lg:w-auto px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
      />
      <span className="block h-[2px] w-0 rounded-full mt-[1px]" />

      {/* Dropdown de resultados */}
      {isOpen && inputValue.trim().length > 0 && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[70] max-h-80 overflow-y-auto normal-case font-normal min-w-[280px]">
          {isLoading && (
            <div className="px-4 py-3 text-xs text-gray-500">Buscando...</div>
          )}

          {!isLoading && totalResults === 0 && (
            <div className="px-4 py-3 text-xs text-gray-500">Sin resultados</div>
          )}

          {!isLoading && results.map((group) => (
            <div key={group.index.name}>
              <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-semibold text-gray-500 uppercase tracking-wide border-b">
                {group.index.label}
              </div>
              {group.hits.map((hit) => (
                <a
                  key={hit.objectID}
                  href={getHitUrl(hit, group.index)}
                  className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-azul-dictuc border-b border-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {getHitTitle(hit)}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BuscadorAlgolia