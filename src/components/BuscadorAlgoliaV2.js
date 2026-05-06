"use client"
import React, { useState, useRef, useEffect } from "react"
import { liteClient as algoliasearch } from "algoliasearch/lite"
import { InstantSearch, SearchBox, Index, useHits, useInstantSearch } from "react-instantsearch"

const INDICES = [
  { name: "development_api::servicio.servicio", label: "Servicios", urlPrefix: "/servicios/" },
  { name: "development_api::noticia.noticia", label: "Noticias", urlPrefix: "/noticias/" },
  { name: "development_api::pagina.pagina", label: "Páginas", urlPrefix: "/" },
  { name: "development_api::documento.documento", label: "Documentos", urlPrefix: "/documentos/" },
  { name: "frontend_dictuc_andesblockchain_com_6dxbncdc9x_pages", label: "Sitio", urlPrefix: "" },
]

const getHitTitle = (hit) =>
  hit.nombre || hit.titulo || hit.title || hit.Titulo || hit.Nombre || "Sin título"

const getHitUrl = (hit, urlPrefix) => {
  if (hit.url || hit.path) return hit.url || hit.path
  if (hit.slug) return urlPrefix + hit.slug
  return "#"
}

// Componente que renderiza los hits de un índice
const IndexHits = ({ label, urlPrefix, onSelect }) => {
  const { hits } = useHits()

  if (hits.length === 0) return null

  return (
    <div>
      <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-semibold text-gray-500 uppercase tracking-wide border-b">
        {label}
      </div>
      {hits.map((hit) => (
        <a
          key={hit.objectID}
          href={getHitUrl(hit, urlPrefix)}
          className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-azul-dictuc border-b border-gray-100 transition-colors"
          onClick={onSelect}
        >
          <HighlightedTitle hit={hit} />
        </a>
      ))}
    </div>
  )
}

// Componente que resalta el término buscado en el título
const HighlightedTitle = ({ hit }) => {
  const title = getHitTitle(hit)
  const highlighted = hit._highlightResult

  // Buscar el campo que tiene highlight
  const highlightField = highlighted?.nombre || highlighted?.titulo || highlighted?.title || highlighted?.Titulo || highlighted?.Nombre

  if (highlightField?.value) {
    return <span dangerouslySetInnerHTML={{ __html: highlightField.value }} />
  }

  return <span>{title}</span>
}

// Componente que muestra el estado vacío o los resultados
const ResultsPanel = ({ isOpen, onSelect }) => {
  const { status, indexUiState } = useInstantSearch()

  if (!isOpen) return null

  const isSearching = status === "stalled" || status === "loading"

  return (
    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[70] max-h-80 overflow-y-auto normal-case font-normal min-w-[280px]">
      {isSearching && (
        <div className="px-4 py-3 text-xs text-gray-500">Buscando...</div>
      )}

      {INDICES.map((idx) => (
        <Index key={idx.name} indexName={idx.name}>
          <IndexHits label={idx.label} urlPrefix={idx.urlPrefix} onSelect={onSelect} />
        </Index>
      ))}

      {!isSearching && (
        <NoResultsBoundary />
      )}
    </div>
  )
}

// Muestra "Sin resultados" si no hay hits en ningún índice
const NoResultsBoundary = () => {
  const { results } = useInstantSearch()

  // Verificar si hay resultados en algún índice
  if (results?.nbHits > 0) return null

  return (
    <div className="px-4 py-3 text-xs text-gray-500">Sin resultados</div>
  )
}

let searchClient = null
const getSearchClient = () => {
  if (!searchClient) {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
    const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
    if (appId && searchKey) {
      searchClient = algoliasearch(appId, searchKey)
    }
  }
  return searchClient
}

const BuscadorAlgoliaV2 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const containerRef = useRef(null)
  const client = getSearchClient()

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

  if (!client) return null

  return (
    <div ref={containerRef} className="w-full lg:w-auto flex flex-col items-center gap-2 mt-4 lg:mt-0 relative">
      <InstantSearch
        searchClient={client}
        indexName={INDICES[0].name}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <SearchBox
          placeholder="Buscar en el sitio"
          onFocus={() => { if (query.trim()) setIsOpen(true) }}
          onChange={(e) => {
            setQuery(e.target.value || "")
            setIsOpen(true)
          }}
          onResetCapture={() => {
            setQuery("")
            setIsOpen(false)
          }}
          classNames={{
            root: "w-full lg:w-auto",
            form: "relative",
            input: "w-full max-w-xs lg:w-auto px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs",
            submit: "hidden",
            reset: "hidden",
            loadingIndicator: "hidden",
          }}
        />
        <span className="block h-[2px] w-0 rounded-full mt-[1px]" />

        {isOpen && query.trim().length > 0 && (
          <ResultsPanel isOpen={isOpen} onSelect={() => setIsOpen(false)} />
        )}
      </InstantSearch>
    </div>
  )
}

export default BuscadorAlgoliaV2
