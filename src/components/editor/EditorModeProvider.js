"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

const EditorModeContext = createContext({
  editorMode: false,
  toggleEditorMode: () => {},
  panelOpen: false,
  setPanelOpen: () => {},
  bloques: [],
  documentId: null,
  registerPageData: () => {},
})

export const useEditorMode = () => useContext(EditorModeContext)

export default function EditorModeProvider({ children }) {
  const [editorMode, setEditorMode] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [bloques, setBloques] = useState([])
  const [documentId, setDocumentId] = useState(null)

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

  const registerPageData = useCallback((newBloques, newDocumentId) => {
    setBloques(newBloques || [])
    setDocumentId(newDocumentId || null)
  }, [])

  return (
    <EditorModeContext.Provider value={{ editorMode, toggleEditorMode, panelOpen, setPanelOpen, bloques, documentId, registerPageData }}>
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
