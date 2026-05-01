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

  // Filtrar modals por fecha vigente en el servidor para evitar problemas de hidratación
  const modalsNodes = modals?.nodes || modals?.data || [];
  const hoy = new Date();

  const modalsFiltrados = modalsNodes.filter(modal => {
    const publication = modal.Publicacion || modal.attributes?.Publicacion;
    if (!publication) return false;

    const desde = new Date(publication.fechaDesde);
    const hasta = new Date(publication.fechaHasta);

    return hoy >= desde && hoy <= hasta;
  });

  return (
    <main className="w-full m-auto mb-4 font-montserrat bg-white text-gris-dictuc">
      <BarraSuperior />
      <Carrusel />
      <SectoresPais botonHollow={true} />
      <Agente
        titulo="¿QUÉ <span class='text-azul-dictuc'>NECESITAS?</span>"
        franja={true}
      />
      <TiposDeServicios/>
      <div className="flex justify-center mt-6 mb-10">
        <a href="/servicios/todos-los-servicios" className="bg-azul-dictuc text-white font-bold px-4 py-2 m-4 text-xs rounded-full hover:bg-azul-dictuc/90 transition-all">Ver todos</a>
      </div>
      <Noticias noticias={noticias} seccion="noticias-general" titulo='<span class="text-azul-dictuc">NOTICIAS</span> DESTACADAS' />
      <FooterSuperior />
      <Footer />
      <ModalContainer modals={{ data: modalsFiltrados }} />
    </main>
  )
}

export default IndexPage

export const metadata = {
  title: 'Sitio Web Dictuc',
}