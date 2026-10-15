"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { liteClient as algoliasearch } from "algoliasearch/lite"

let searchClient = null
const getSearchClient = () => {
  if (!searchClient) {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
    console.log('[Algolia Debug] appId:', appId ? `${appId.substring(0, 4)}...` : 'UNDEFINED');
    console.log('[Algolia Debug] searchKey:', searchKey ? `${searchKey.substring(0, 4)}...` : 'UNDEFINED');
    if (appId && searchKey) {
      searchClient = algoliasearch(appId, searchKey);
    }
  }
  return searchClient
}

const INDICES = [
  { name: "sitio_web_ejecutores", label: "Ejecutores", urlPrefix: "/ejecutor/" },
  { name: "development_api::servicio.servicio", label: "Servicios", urlPrefix: "/servicios/" },
  { name: "development_api::noticia.noticia", label: "Noticias", urlPrefix: "/noticias/" },
  { name: "development_api::etiqueta-persona.etiqueta-persona", label: "Personas", urlPrefix: "/" },
  { name: "sitio_web_dictuc_pages", label: "Sitio Web", urlPrefix: "/" },
  { name: "manual-records", label: "Sitio Web", urlPrefix: "/" },
]

const humanizeSlug = (url) => {
  const slug = url.replace(/\/$/, "").split("/").pop() || ""
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const getHitTitle = (hit) => {
  const title = hit.nombre || hit.titulo || hit.title || hit.Titulo || hit.Nombre || "Sin título"

  if (title === "Dictuc" && hit.url) {
    return humanizeSlug(hit.url)
  }

  return title
}

const getHitUrl = (hit, index) => {
  if (hit.full_url) return hit.full_url
  if (hit.url || hit.path) return hit.url || hit.path
  if (hit.slug) return index.urlPrefix + hit.slug
  return "#"
}

// Clave para detectar si dos hits representan la misma página, incluso si su URL difiere
// (ej: dominio absoluto vs relativo, o rutas distintas para el mismo slug)
const getDedupeKey = (hit, index) => {
  if (hit.slug) return hit.slug.toLowerCase()
  const url = getHitUrl(hit, index)
  return url.replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "").toLowerCase()
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
        const client = getSearchClient()
        if (!client) return
        const { results: searchResults } = await client.search({
          requests: INDICES.map((idx) => ({
            indexName: idx.name,
            query: inputValue,
            hitsPerPage: 5,
          })),
        })

        const grouped = searchResults
          .map((result, i) => ({
            index: INDICES[i],
            hits: (result.hits || []).map((hit) => ({ hit, index: INDICES[i] })),
          }))
          .filter((group) => group.hits.length > 0)
          .reduce((acc, group) => {
            const existing = acc.find((g) => g.label === group.index.label)
            if (existing) {
              existing.hits.push(...group.hits)
            } else {
              acc.push({ label: group.index.label, hits: group.hits })
            }
            return acc
          }, [])

        // Deduplicar por página: se mantiene solo la primera aparición (la más significativa según el orden de índices)
        const seenKeys = new Set()
        const deduped = grouped
          .map((group) => ({
            ...group,
            hits: group.hits.filter(({ hit, index }) => {
              const key = getDedupeKey(hit, index)
              if (seenKeys.has(key)) return false
              seenKeys.add(key)
              return true
            }),
          }))
          .filter((group) => group.hits.length > 0)

        setResults(deduped)
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
            <div key={group.label}>
              <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-semibold text-gray-500 uppercase tracking-wide border-b">
                {group.label}
              </div>
              {group.hits.map(({ hit, index }) => (
                <a
                  key={hit.objectID}
                  href={getHitUrl(hit, index)}
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