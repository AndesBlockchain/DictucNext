"use client"
import React, { useState, useRef, useEffect } from "react"

const MenuItemDropdown = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const esExterno = item.link?.startsWith("http")
  const tieneLinks = item.LInks && item.LInks.length > 0

  // Cerrar al hacer click fuera (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Item simple sin sub-links
  if (!tieneLinks) {
    return (
      <a
        href={item.link}
        target={esExterno ? "_blank" : "_self"}
        rel={esExterno ? "noopener noreferrer" : undefined}
        className="w-full lg:w-auto text-center lg:text-left py-2 lg:py-0 cursor-pointer group flex flex-col items-center hover:text-azul-dictuc transition-colors"
      >
        {item.Nombre}
        <span className="block h-[2px] w-0 group-hover:w-1/2 group-hover:max-w-[20px] bg-azul-dictuc rounded-full transition-all duration-300 mt-1" />
      </a>
    )
  }

  // Item con dropdown
  return (
    <div
      ref={containerRef}
      className="relative w-full lg:w-auto"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full lg:w-auto text-center lg:text-left py-2 lg:py-0 cursor-pointer group flex flex-col items-center hover:text-azul-dictuc transition-colors"
      >
        <span className="flex items-center gap-1">
          {item.Nombre}
          <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        <span className="block h-[2px] w-0 group-hover:w-1/2 group-hover:max-w-[20px] bg-azul-dictuc rounded-full transition-all duration-300 mt-1" />
      </button>

      {isOpen && (
        <div className="lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:pt-2 z-[70] min-w-[280px] normal-case font-normal">
          <div className="bg-white lg:border lg:border-gray-200 lg:rounded-md lg:shadow-lg">
          {item.LInks.map((sublink, index) => {
            const esSubExterno = sublink.url?.startsWith("http")
            return (
              <a
                key={index}
                href={sublink.url}
                target={esSubExterno ? "_blank" : "_self"}
                rel={esSubExterno ? "noopener noreferrer" : undefined}
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-azul-dictuc transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {sublink.texto}
              </a>
            )
          })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuItemDropdown