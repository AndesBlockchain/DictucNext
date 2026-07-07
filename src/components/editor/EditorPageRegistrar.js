"use client"
import { useEffect } from "react"
import { useEditorMode } from "./EditorModeProvider"

export default function EditorPageRegistrar({ bloques = [], documentId = null }) {
  const { registerPageData } = useEditorMode()

  useEffect(() => {
    registerPageData(bloques, documentId)
    return () => registerPageData([], null)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
