import * as React from "react"

import Carrusel from "@/components/carrusel/Carrusel"
import SectoresPais from "@/components/SectoresPais"
import Agente from "@/components/Agente"
import TiposDeServicios from "@/components/TiposDeServicios"
import Noticias from "@/components/Noticias"
import useUltimasNoticias from "@/hooks/use-ultimas-noticias"
import useModals from "@/hooks/use-modals"
import BarraSuperior from "@/components/BarraSuperior"
import ModalContainer from "@/components/ModalContainer"
import FooterSuperior from "@/components/FooterSuperior"
import Footer from "@/components/Footer"

const IndexPage = async () => {

  const noticias = await useUltimasNoticias();
  const modals = await useModals();

  return (
    <main className="container m-auto max-w-6xl mb-4 font-montserrat bg-white text-gris-dictuc">
      <BarraSuperior />
      <Carrusel />
      <SectoresPais />
      <Agente
        titulo="¿Qué <span class='text-azul-dictuc'>Necesitas?</span>"
        franja={true}
      />
      <TiposDeServicios />
      <div className="flex justify-center mt-6">
        <a href="/servicios/todos-los-servicios" className="bg-azul-dictuc text-white px-4 py-2 m-4 text-xs rounded-full hover:bg-azul-dictuc/90 transition-all">Ver todos</a>
      </div>
      <Noticias noticias={noticias} titulo='<span class="text-azul-dictuc">Noticias</span> y Proyectos destacados' />
      <FooterSuperior />
      <Footer />

      {/* Modal de Alerta */}
      <ModalContainer modals={modals} />
    </main>
  )
}

export default IndexPage

export const metadata = {
  title: 'Sitio Web Dictuc',
}