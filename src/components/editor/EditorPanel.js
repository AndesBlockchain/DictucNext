"use client"
import React from "react"
import { useEditorMode } from "./EditorModeProvider"

const STRAPI_ADMIN_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || ""

const formatComponentName = (component) => {
  if (!component) return "desconocido"
  return component.replace("bloques.", "").replace(/-/g, " ")
}

export default function EditorPanel() {
  const { editorMode, panelOpen, setPanelOpen, bloques, documentId } = useEditorMode()

  if (!editorMode || !panelOpen) return null

  const adminPageUrl = documentId
    ? `${STRAPI_ADMIN_URL}/admin/content-manager/collection-types/api::pagina.pagina/${documentId}`
    : null

  const scrollToBlock = (blockId) => {
    const el = document.getElementById(`bloque-${blockId}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      el.classList.add("ring-4", "ring-purple-400", "ring-offset-2")
      setTimeout(() => {
        el.classList.remove("ring-4", "ring-purple-400", "ring-offset-2")
      }, 2000)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-[190]"
        onClick={() => setPanelOpen(false)}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[195] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-bold text-sm text-purple-700">Bloques de esta página</h2>
          <button
            onClick={() => setPanelOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {adminPageUrl && (
          <div className="px-4 py-2 border-b border-gray-100">
            <a
              href={adminPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-600 font-semibold hover:underline"
            >
              Abrir página en Strapi Admin →
            </a>
          </div>
        )}

        <div className="p-2">
          {bloques.length > 0 ? (
            bloques.map((bloque, index) => (
              <button
                key={bloque.id || index}
                onClick={() => scrollToBlock(bloque.id || index)}
                className="w-full text-left px-3 py-2 rounded hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className="text-xs font-bold text-purple-700 capitalize">
                  {formatComponentName(bloque.__component)}
                </div>
                <div className="text-[10px] text-gray-500">
                  ID: {bloque.id}
                  {bloque.Bloque?.Titulo && ` • ${bloque.Bloque.Titulo}`}
                </div>
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-400 p-3 text-center">No hay bloques en esta página</p>
          )}
        </div>
      </div>
    </>
  )
}
