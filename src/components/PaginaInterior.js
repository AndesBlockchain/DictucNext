import * as React from "react"
import { Slice } from "gatsby"

import Breadcrumbs from "./Breadcrumbs"
import BannerInterior from "./BannerInterior"


export default function PaginaInterior({children, breadcrum = [], banner, gatsbyImageData, fallback, titulo="", color_titulo="azul-dictuc", titulo_visible=true}) {

  return (
    <main className="container m-auto max-w-6xl mb-4 font-montserrat bg-white text-gris-dictuc">
      <Slice alias="barra-superior" />
      <BannerInterior banner={banner} gatsbyImageData={gatsbyImageData} fallback={fallback} titulo={titulo} titulo_visible={titulo_visible} color_titulo={color_titulo}  />
      <Breadcrumbs items={breadcrum} />

      {children}
      <Slice alias="footer-superior" />
      <Slice alias="footer" />
    </main>
  )
}