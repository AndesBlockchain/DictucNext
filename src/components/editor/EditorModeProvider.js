"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

const EditorModeContext = createContext({ editorMode: false, toggleEditorMode: () => {} })

export const useEditorMode = () => useContext(EditorModeContext)

export default function EditorModeProvider({ children, bloques = [], documentId = null }) {
  const [editorMode, setEditorMode] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("modo") === "editor") {
      setEditorMode(true)
      sessionStorage.setItem("editorMode", "true")
    } else if (sessionStorage.getItem("editorMode") === "true") {
      setEditorMode(true)
    }
  }, [])

  const toggleEditorMode = () => {
    const next = !editorMode
    setEditorMode(next)
    if (next) {
      sessionStorage.setItem("editorMode", "true")
    } else {
      sessionStorage.removeItem("editorMode")
      setPanelOpen(false)
    }
  }

  return (
    <EditorModeContext.Provider value={{ editorMode, toggleEditorMode, panelOpen, setPanelOpen, bloques, documentId }}>
      {children}
      {editorMode && (
        <div className="fixed bottom-4 right-4 z-[200] flex gap-2">
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="bg-purple-600 text-white px-3 py-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors text-xs font-semibold"
            title="Panel de bloques"
          >
            📋 Bloques
          </button>
          <button
            onClick={toggleEditorMode}
            className="bg-red-500 text-white px-3 py-2 rounded-full shadow-lg hover:bg-red-600 transition-colors text-xs font-semibold"
            title="Desactivar modo editor"
          >
            ✕ Editor
          </button>
        </div>
      )}
    </EditorModeContext.Provider>
  )
}
