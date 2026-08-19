"use client"
import dynamic from "next/dynamic"
import Link from "next/link"

const BuscadorAlgolia = dynamic(() => import("./BuscadorAlgolia"), { ssr: false })

const hoverClasses = "hover:!bg-transparent hover:text-azul-dictuc hover:no-underline transition-colors flex flex-col items-center after:block after:h-[2px] after:w-0 after:bg-azul-dictuc after:rounded-full after:transition-all after:duration-300 hover:after:w-[20px]"

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const MenuItem = ({ item, seccionActiva }) => {
  const isActive = seccionActiva ? item.url === seccionActiva : false
  const href = item.url || "/"
  const tieneItems = item.Links && item.Links.length > 0

  if (!tieneItems) {
    return (
      <li>
        <Link href={href} className={`${hoverClasses} ${isActive ? "text-azul-dictuc" : ""}`}>
          {item.Texto}
        </Link>
      </li>
    )
  }

  return (
    <li>
      <details>
        <summary className={`hover:!bg-transparent hover:text-azul-dictuc transition-colors lg:-mt-[10px] ${isActive ? "text-azul-dictuc" : ""}`}>
          {item.Texto}
        </summary>
        <ul className="min-w-[280px] rounded-md z-[70] normal-case font-normal">
          {item.Links.map((sublink, index) => (
            <li key={sublink.id || index}>
              <a
                href={sublink.url}
                target={sublink.ComoAbrir === "Nueva Ventana" ? "_blank" : "_self"}
                rel={sublink.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-xs text-gray-700 hover:!bg-transparent hover:text-azul-dictuc hover:no-underline transition-colors"
              >
                {sublink.Texto}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </li>
  )
}

const NavbarMenu = ({ items, seccionActiva }) => {
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
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[70] mt-3 w-[336px] p-4 shadow-lg uppercase font-semibold text-xs gap-1 [&_a]:!items-start"
        >
          <li>
            <Link href="/" aria-label="Home" className={hoverClasses}>
              Inicio
            </Link>
          </li>
          {items?.map(item => (
            <MenuItem key={item.id || item.url} item={item} seccionActiva={seccionActiva} />
          ))}
          <li className="mt-2">
            <BuscadorAlgolia />
          </li>
        </ul>
      </div>

      {/* Desktop: horizontal menu */}
      <ul className="menu menu-horizontal hidden lg:flex flex-nowrap items-center gap-0 uppercase font-semibold text-xs xl:text-sm px-1 whitespace-nowrap">
        <li className="hidden xl:block">
          <Link href="/" aria-label="Home" className={hoverClasses}>
            <HomeIcon />
          </Link>
        </li>
        {items?.map(item => (
          <MenuItem key={item.id || item.url} item={item} seccionActiva={seccionActiva} />
        ))}
        <li>
          <BuscadorAlgolia />
        </li>
      </ul>
    </>
  )
}

export default NavbarMenu
