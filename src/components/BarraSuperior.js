import { headers } from "next/headers";
import Link from "next/link";
import useMenuSuperior from "../hooks/use-menu-superior";
import NavbarMenu from "./NavbarMenu";

const logoDictuc = "/images/logo_dictuc_interior.png"

const BarraSuperior = async ({ seccionActiva = null }) => {
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") || "/";
  const primerSegmento = pathname.split("/").filter(Boolean)[0] || null;

  const data = await useMenuSuperior(primerSegmento);

  return (
    <header className="navbar bg-transparent z-[100] px-6 lg:px-10 pt-6">
      {/* Logo */}
      <div className="shrink-0">
        <Link href="/">
          <img src={logoDictuc} alt="Logo Dictuc" className="h-8" />
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 flex justify-end">
        <NavbarMenu items={data?.data} seccionActiva={seccionActiva} />
      </div>
    </header>
  )
}

export default BarraSuperior;
