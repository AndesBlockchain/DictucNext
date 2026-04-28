"use client"
import React, { useState, useRef, useEffect } from "react"

const MenuSecundarioItem = ({ item, isActive }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const tieneLinks = item.Links && item.Links.length > 0

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const baseClasses = `font-semibold text-xs md:text-sm px-2 md:px-4 transition-colors hover:text-azul-dictuc ${
    isActive ? 'border-azul-dictuc border-b-2 text-azul-dictuc' : 'border-black border-b-1'
  }`

  if (!tieneLinks) {
    return (
      <div className={baseClasses}>
        <a href={item.Link}>{item.Titulo}</a>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${baseClasses}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-1"
      >
        {item.Titulo}
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[70] min-w-[200px]">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg">
            {item.Links.map((sublink) => (
              <a
                key={sublink.id}
                href={sublink.url}
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-azul-dictuc transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {sublink.texto}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuSecundarioItem
