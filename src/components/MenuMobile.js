"use client"
import React, { useState } from "react"

const MenuMobile = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`lg:hidden fixed top-4 right-4 z-[60] bg-white p-2 rounded shadow-md cursor-pointer text-gray-600 hover:text-gray-800 transition-opacity ${isOpen ? "hidden" : ""}`}
        aria-label="Abrir menú"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed top-4 right-4 z-[60] bg-white p-2 rounded shadow-md cursor-pointer text-gray-600 hover:text-gray-800 transition-opacity ${isOpen ? "" : "hidden"}`}
        aria-label="Cerrar menú"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Nav */}
      <nav className={`
        ${isOpen ? "flex" : "hidden"}
        lg:flex flex-col lg:flex-row
        fixed lg:relative lg:inset-auto
        top-0 right-0 w-64
        lg:w-auto
        bg-white lg:bg-transparent
        items-start lg:items-center
        justify-start lg:justify-end
        gap-4 lg:gap-4 pt-16
        p-6 lg:p-0 lg:pt-1 lg:pr-20
        z-50 lg:z-auto
        font-semibold
        text-xs
        xl:text-sm
        2xl:text-md
        h-full lg:h-auto
        shadow-lg lg:shadow-none
        overflow-y-auto
      `}>
        {children}
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-[2px]"
        />
      )}
    </>
  )
}

export default MenuMobile