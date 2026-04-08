import React from "react";
import useMenuSuperior from "../hooks/use-menu-superior";
import NavbarMenu from "./NavbarMenu";

const logoDictuc = "/images/logo_dictuc_interior.png"

const BarraSuperior = async () => {
  const data = await useMenuSuperior();

  return (
    <header className="navbar bg-transparent z-[100] px-6 lg:px-10 pt-6">
      {/* Logo */}
      <div className="shrink-0">
        <a href="/">
          <img src={logoDictuc} alt="Logo Dictuc" className="h-8" />
        </a>
      </div>

      {/* Menu */}
      <div className="flex-1 flex justify-end">
        <NavbarMenu items={data?.data} />
      </div>
    </header>
  )
}

export default BarraSuperior;
