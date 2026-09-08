import dynamic from "next/dynamic"
import Link from "next/link"

import Carrusel from "@/components/carrusel/Carrusel"
import SectoresPais from "@/components/SectoresPais"
import TiposDeServicios from "@/components/TiposDeServicios"
import Noticias from "@/components/Noticias"
import useUltimasNoticias from "@/hooks/use-ultimas-noticias"
import useModals from "@/hooks/use-modals"
import BarraSuperior from "@/components/BarraSuperior"
import FooterSuperior from "@/components/FooterSuperior"
import Footer from "@/components/Footer"
import CookieConsentModal from "@/components/CookieConsentModal"

const Agente = dynamic(() => import("@/components/Agente"))
const ModalContainer = dynamic(() => import("@/components/ModalContainer"))

export const revalidate = false

// Copia del home (ver src/app/(pages)/page.js) usada para demostrar al cliente
// el modal de consentimiento de cookies exigido por la Ley 21.719. El trackeo
// (GA / Amplitude) en esta ruta queda condicionado a la aceptación del modal;
// ver COOKIE_CONSENT_GATED_PATHS en src/lib/cookie-consent.js y TrackingGate.
const DemoCookiesPage = async () => {

  const [noticias, modals] = await Promise.all([
    useUltimasNoticias(),
    useModals()
  ]);

  const modalsNodes = modals?.nodes || modals?.data || [];

  const modalsFiltrados = modalsNodes.filter(modal => {
    const imagen = modal.imagen || modal.attributes?.imagen;
    return Boolean(imagen);
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
        <Link href="/servicios/todos-los-servicios" className="bg-azul-dictuc text-white font-bold px-4 py-2 m-4 text-xs rounded-full hover:bg-azul-dictuc/90 transition-all">Ver todos</Link>
      </div>
      <Noticias noticias={noticias} seccion="noticia-general" titulo='<span class="text-azul-dictuc">NOTICIAS</span> DESTACADAS' />
      <FooterSuperior />
      <Footer />
      <ModalContainer modals={{ data: modalsFiltrados }} />
      <CookieConsentModal />
    </main>
  )
}

export default DemoCookiesPage

export const metadata = {
  title: 'Sitio Web Dictuc',
  robots: {
    index: false,
    follow: false,
  },
  other: {
    'algolia-site-verification': '6E9033B7896E8107',
  },
}
