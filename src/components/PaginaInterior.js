import * as React from "react"
import BarraSuperior from "./BarraSuperior"
import Breadcrumbs from "./Breadcrumbs"
import BannerInterior from "./BannerInterior"
import FooterSuperior from "./FooterSuperior"
import Footer from "./Footer"
import MenuCajon from "./MenuCajon"
import { getBlurDataURL } from "@/lib/get-blur-data-url"

export default async function PaginaInterior({children, breadcrum = [], banner, gatsbyImageData, fallback, titulo="", color_titulo="azul-dictuc", titulo_visible=true,icono_secundario="", menuCajon=null}) {

  const blurDataURL = banner ? await getBlurDataURL(banner) : null;

  const contenido = (
    <>
      <BarraSuperior />
      <BannerInterior banner={banner} gatsbyImageData={gatsbyImageData} fallback={fallback} titulo={titulo} titulo_visible={titulo_visible} color_titulo={color_titulo} icono_secundario={icono_secundario} blurDataURL={blurDataURL} />
      <Breadcrumbs items={breadcrum} />
      {children}
      <FooterSuperior />
      <Footer />
    </>
  );

  return (
    <main className="m-auto mb-4 font-montserrat bg-white text-gris-dictuc">
      {menuCajon ? (
        <MenuCajon menuCajon={menuCajon}>{contenido}</MenuCajon>
      ) : (
        contenido
      )}
    </main>
  )
}