import React from "react";
const logoDictuc = "/images/logo_dictuc.png"
import useSiteMetadata from "../hooks/use-site-metadata";
import useMenuSuperior from "../hooks/use-menu-superior";

const BarraSuperior = async () => {

  const data = await useMenuSuperior();
  const siteMetadata = useSiteMetadata();
  console.log(data.data);

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
        <a href="/"><img src={logoDictuc} alt="Logo Dictuc" className="h-20 mt-16 lg:mt-4 mb-4 ml-2" /></a>
      </div>

      {/* Menu Area */}
      <div id="menu-superior" className="col-span-9 items-start">
        {/* Navigation Wrapper */}
        <nav className="
          hidden peer-checked:flex 
          lg:flex flex-col lg:flex-row 
          fixed lg:relative inset-0 lg:inset-auto 
          bg-white lg:bg-transparent 
          items-center lg:items-center 
          justify-center lg:justify-end 
          gap-8 lg:gap-4 
          p-8 lg:p-0 lg:pt-1 lg:pr-2 
          z-50 lg:z-auto
          text-sm lg:text-xs 
        ">
          <a href="/" className="w-full lg:w-auto text-center lg:text-left py-2 lg:py-0 hover:text-blue-600 cursor-pointer font-bold lg:font-normal">
            HOME
          </a>

          {data?.data?.map(item => (
            <a
              key={item.id || item.slug || item.Nombre}
              href={item.link}
              className="w-full lg:w-auto text-center lg:text-left py-2 lg:py-0 hover:text-blue-600 text-[12px] lg:text-[10px] cursor-pointer font-bold lg:font-normal"
            >
              {item.Nombre}
            </a>
          ))}

          {/* Search Bar */}
          <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-2 mt-4 lg:mt-0">
            <input
              type="text"
              placeholder="Buscar en el sitio"
              className="w-full max-w-xs lg:w-auto px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>
        </nav>

        {/* Mobile Overlay Backdrop (Optional for better UX) */}
        <label htmlFor="menu-toggle" className="fixed inset-0 bg-black/40 z-40 hidden peer-checked:block lg:hidden backdrop-blur-[2px]" />
      </div>
    </header>
  )
}

export default BarraSuperior;