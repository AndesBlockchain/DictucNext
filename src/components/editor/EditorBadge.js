"use client"
import React from "react"
import { useEditorMode } from "./EditorModeProvider"

const STRAPI_ADMIN_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || ""

export default function EditorBadge({ contentType, documentId, label }) {
  const { editorMode } = useEditorMode()

  if (!editorMode || !documentId) return null

  const adminUrl = `${STRAPI_ADMIN_URL}/admin/content-manager/collection-types/${contentType}/${documentId}`

  return (
    <div className="fixed top-20 right-4 z-[200]">
      <a
        href={adminUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-1"
      >
        ✏️ Editar {label || "contenido"} en Strapi
      </a>
    </div>
  )
}
