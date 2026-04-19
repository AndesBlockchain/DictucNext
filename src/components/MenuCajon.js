"use client"
import React from "react"

const MenuCajon = ({ menuCajon, children }) => {
  const drawerId = "drawer-menu-cajon"

  return (
    <div className="drawer">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Botón fijo costado izquierdo */}
        <label
          htmlFor={drawerId}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-azul-dictuc text-white px-2 py-4 rounded-r-lg cursor-pointer hover:bg-azul-dictuc/90 transition-all shadow-lg flex items-center gap-1 writing-vertical-lr text-xs font-semibold"
          aria-label="Abrir menú lateral"
        >
          <span className="hidden lg:inline">{menuCajon.nombre}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </label>

        {children}
      </div>

      <div className="drawer-side z-[110]">
        <label htmlFor={drawerId} aria-label="Cerrar menú" className="drawer-overlay"></label>
        <div className="bg-white min-h-full w-72 p-6 pt-24">
          <ul className="menu menu-vertical gap-1">
            <li className="menu-title text-lg text-azul-dictuc uppercase">
              {menuCajon.nombre}
            </li>
            {menuCajon.links?.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="text-sm text-gris-dictuc hover:text-gris-dictuc hover:no-underline hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {
                    document.getElementById(drawerId).checked = false
                  }}
                >
                  {link.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MenuCajon