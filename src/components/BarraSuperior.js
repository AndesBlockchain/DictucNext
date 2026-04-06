import React from "react";
const logoDictuc = "/images/logo_dictuc_interior.png"
import useMenuSuperior from "../hooks/use-menu-superior";

const BarraSuperior = async () => {

  const data = await useMenuSuperior();

  return (
    <header className="w-full items-start grid grid-cols-12 grid-row-1 z-100 uppercase relative">
      {/* Checkbox Hack: Global State control for Mobile Menu */}
      <input type="checkbox" id="menu-toggle" className="peer hidden" />

      {/* Mobile Toggle Button: Open (Hamburger) */}
      <label
        htmlFor="menu-toggle"
        className="lg:hidden fixed top-4 right-4 z-[60] bg-white p-2 rounded shadow-md cursor-pointer text-gray-600 hover:text-gray-800 transition-opacity peer-checked:hidden"
        aria-label="Abrir menú"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      {/* Mobile Toggle Button: Close (X) */}
      <label
        htmlFor="menu-toggle"
        className="lg:hidden fixed top-4 right-4 z-[60] bg-white p-2 rounded shadow-md cursor-pointer text-gray-600 hover:text-gray-800 transition-opacity hidden peer-checked:block"
        aria-label="Cerrar menú"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </label>

      {/* Logo */}
      <div id="logo" className="col-span-3">
        <a href="/"><img src={logoDictuc} alt="Logo Dictuc" className="h-8 pt-2 mt-16 lg:mt-6 mb-6 ml-10 pl-6" /></a>
      </div>

      {/* Menu Area */}
      <div id="menu-superior" className="col-span-9 items-start mt-8">
        {/* Navigation Wrapper */}
        <nav className="
          hidden peer-checked:flex 
          lg:flex flex-col lg:flex-row 
          fixed lg:relative inset-0 lg:inset-auto 
          bg-white lg:bg-transparent 
          items-center lg:items-center 
          justify-center lg:justify-end 
          gap-8 lg:gap-4 pt-4
          p-8 lg:p-0 lg:pt-1 lg:pr-20
          z-50 lg:z-auto
          font-semibold
          text-xs
          xl:text-sm
          2xl:text-md
        ">
          <a href="/" className="w-full lg:w-auto text-center lg:text-left py-2 lg:py-0 cursor-pointer group flex flex-col items-center" aria-label="Home">
            <svg className="w-5 h-5 inline group-hover:text-azul-dictuc transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="block h-[2px] w-0 group-hover:w-1/2 group-hover:max-w-[20px] bg-azul-dictuc rounded-full transition-all duration-300 mt-1" />
          </a>

          {data?.data?.map(item => {
            const esExterno = item.link?.startsWith("http");
            return (
            <a
              key={item.id || item.slug || item.Nombre}
              href={item.link}
              target={esExterno ? "_blank" : "_self"}
              rel={esExterno ? "noopener noreferrer" : ""}
              className="w-full lg:w-auto text-center lg:text-left py-2 lg:py-0 cursor-pointer group flex flex-col items-center hover:text-azul-dictuc transition-colors"
            >
              {item.Nombre}
              <span className="block h-[2px] w-0 group-hover:w-1/2 group-hover:max-w-[20px] bg-azul-dictuc rounded-full transition-all duration-300 mt-1" />
            </a>
          );
          })}

          {/* Search Bar */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-2 mt-4 lg:mt-0">
            <input
              type="text"
              placeholder="Buscar en el sitio"
              className="w-full max-w-xs lg:w-auto px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
            <span className="block h-[2px] w-0 rounded-full mt-[1px]" />
          </div>
        </nav>

        {/* Mobile Overlay Backdrop (Optional for better UX) */}
        <label htmlFor="menu-toggle" className="fixed inset-0 bg-black/40 z-40 hidden peer-checked:block lg:hidden backdrop-blur-[2px]" />
      </div>
    </header>
  )
}

export default BarraSuperior;