"use client"
import React, { useState, useEffect } from "react"

const ScrollSpy = ({ datosBloques = [] }) => {
  const [activeId, setActiveId] = useState(null)

  // Filtrar bloques que tienen título o alias visible
  const bloquesVisibles = datosBloques.filter((bloque) => {
    if (bloque.Alias && bloque.Alias.trim() !== '') return true
    if (bloque.Bloque?.Alias && bloque.Bloque.Alias.trim() !== '') return true
    if (!bloque.Bloque?.OcultarTitulo && bloque.Bloque?.Titulo) return true
    return false
  })

  useEffect(() => {
    if (bloquesVisibles.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    )

    bloquesVisibles.forEach((bloque) => {
      const el = document.getElementById(`bloque-${bloque.id}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [bloquesVisibles])

  if (bloquesVisibles.length === 0) return null

  return (
    <div className="fixed 2xl:right-10 invisible 2xl:visible right-0 z-50">
      <div className="mb-2 max-w-[200px] text-sm underline underline-offset-4 font-semibold">En esta página</div>
      {bloquesVisibles.map((bloque) => {
        const label = bloque.Alias?.trim() || bloque.Bloque?.Alias?.trim() || bloque.Bloque?.Titulo
        const bloqueId = `bloque-${bloque.id}`
        const isActive = activeId === bloqueId

        return (
          <div key={bloque.id} className="mb-2 max-w-[200px] text-sm">
            <a
              href={`#${bloqueId}`}
              className={`transition-colors ${isActive ? "text-azul-dictuc font-semibold" : "hover:text-azul-dictuc"}`}
            >
              {label}
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default ScrollSpy
