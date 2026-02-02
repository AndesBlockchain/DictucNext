import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import Noticias from "@/components/Noticias";
import VerificaForm from "@/components/VerificaForm";
import useUltimasNoticias from "@/hooks/use-ultimas-noticias";

const BannerVerificarInforme = "/images/BannerVerificarInforme.webp";

/**
 * Metadata de la página
 */
export const metadata = {
  title: 'Dictuc | Verifica un Certificado'
};

/**
 * Página de verificación de certificados DICTUC
 * Server Component que obtiene noticias y renderiza formulario de verificación
 */
export default async function VerificaPage() {
  // Obtener noticias server-side
  const noticias = await useUltimasNoticias();

  // Obtener URL de verificación de variable de entorno
  const verificacionUrl = process.env.VERIFICACION_URL || 'https://xnet.dictuc.cl/xnet/dictuc/firma_elect/descarga_doc.phtml';

  return (
    <PaginaInterior
      fallback={BannerVerificarInforme}
      titulo="Verifica un Certificado"
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Verifica", link: "/verifica" }
      ]}
    >
      {/* Formulario de verificación (Client Component) */}
      <VerificaForm verificacionUrl={verificacionUrl} />

      {/* Sección de noticias */}
      <Noticias
        noticias={noticias}
        className="mt-6"
        titulo='<span class="text-azul-dictuc">En qué </span>estamos'
      />
    </PaginaInterior>
  );
}
