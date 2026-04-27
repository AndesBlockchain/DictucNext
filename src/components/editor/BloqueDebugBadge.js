"use client"
import React from "react"
import { useEditorMode } from "./EditorModeProvider"

const STRAPI_ADMIN_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || ""

const formatComponentName = (component) => {
  if (!component) return "desconocido"
  return component.replace("bloques.", "").replace(/-/g, " ")
}

export default function BloqueDebugBadge({ component, blockId, title }) {
  const { editorMode } = useEditorMode()

  if (!editorMode) return null

  return (
    <div className="absolute top-1 right-1 z-[100] flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
      <div className="bg-purple-600 text-white text-[10px] px-2 py-1 rounded shadow-md font-mono leading-tight max-w-[200px]">
        <div className="font-bold">{formatComponentName(component)}</div>
        <div className="opacity-80">ID: {blockId}</div>
        {title && <div className="opacity-80 truncate">{title}</div>}
      </div>
    </div>
  )
}
