import * as React from "react"
import BarraSuperior from "./BarraSuperior"
import Breadcrumbs from "./Breadcrumbs"
import BannerInterior from "./BannerInterior"
import FooterSuperior from "./FooterSuperior"
import Footer from "./Footer"

export default function PaginaInterior({children, breadcrum = [], banner, gatsbyImageData, fallback, titulo="", color_titulo="azul-dictuc", titulo_visible=true,icono_secundario=""}) {

  return (
    <main className="m-auto mb-4 font-montserrat bg-white text-gris-dictuc">
      <BarraSuperior />
      <BannerInterior banner={banner} gatsbyImageData={gatsbyImageData} fallback={fallback} titulo={titulo} titulo_visible={titulo_visible} color_titulo={color_titulo} icono_secundario={icono_secundario} />
      <Breadcrumbs items={breadcrum} />

      {children}
      <FooterSuperior />
      <Footer />
    </main>
  )
}