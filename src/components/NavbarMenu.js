"use client"
import React from "react"
import BuscadorAlgolia from "./BuscadorAlgolia"

const hoverClasses = "hover:!bg-transparent hover:text-azul-dictuc hover:no-underline transition-colors flex flex-col items-center after:block after:h-[2px] after:w-0 after:bg-azul-dictuc after:rounded-full after:transition-all after:duration-300 hover:after:w-[20px]"

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const MenuItem = ({ item }) => {
  const esExterno = item.link?.startsWith("http")
  const tieneLinks = item.LInks && item.LInks.length > 0

  if (!tieneLinks) {
    return (
      <li>
        <a
          href={item.link}
          target={esExterno ? "_blank" : "_self"}
          rel={esExterno ? "noopener noreferrer" : undefined}
          className={hoverClasses}
        >
          {item.Nombre}
        </a>
      </li>
    )
  }

  return (
    <li>
      <details>
        <summary className="hover:!bg-transparent hover:text-azul-dictuc transition-colors flex justify-center">
          {item.Nombre}
        </summary>
        <ul className="min-w-[280px] rounded-md z-[70] normal-case font-normal">
          {item.LInks.map((sublink, index) => {
            const esSubExterno = sublink.url?.startsWith("http")
            return (
              <li key={index}>
                <a
                  href={sublink.url}
                  target={esSubExterno ? "_blank" : "_self"}
                  rel={esSubExterno ? "noopener noreferrer" : undefined}
                  className="text-xs text-gray-700 hover:!bg-transparent hover:text-azul-dictuc hover:no-underline transition-colors"
                >
                  {sublink.texto}
                </a>
              </li>
            )
          })}
        </ul>
      </details>
    </li>
  )
}

const NavbarMenu = ({ items }) => {
  return (
    <>
      {/* Mobile: hamburger dropdown */}
      <div className="dropdown dropdown-end lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost" aria-label="Abrir menú">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-box z-[70] mt-3 w-64 p-4 shadow-lg uppercase font-semibold text-xs gap-1 max-h-[80vh] overflow-y-auto"
        >
          <li>
            <a href="/" aria-label="Home" className={hoverClasses}>
              <HomeIcon />
              Inicio
            </a>
          </li>
          {items?.map(item => (
            <MenuItem key={item.id || item.slug || item.Nombre} item={item} />
          ))}
          <li className="mt-2">
            <BuscadorAlgolia />
          </li>
        </ul>
      </div>

      {/* Desktop: horizontal menu */}
      <ul className="menu menu-horizontal hidden lg:flex flex-nowrap items-center gap-0 uppercase font-semibold text-xs xl:text-sm 2xl:text-md px-1 whitespace-nowrap">
        <li>
          <a href="/" aria-label="Home" className={hoverClasses}>
            <HomeIcon />
          </a>
        </li>
        {items?.map(item => (
          <MenuItem key={item.id || item.slug || item.Nombre} item={item} />
        ))}
        <li>
          <BuscadorAlgolia />
        </li>
      </ul>
    </>
  )
}

export default NavbarMenu
