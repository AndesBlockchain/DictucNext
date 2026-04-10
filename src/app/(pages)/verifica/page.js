import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import Noticias from "@/components/Noticias";
import VerificaForm from "@/components/VerificaForm";
import useUltimasNoticias from "@/hooks/use-ultimas-noticias";
import Titulo from "@/components/Titulo";
import FranjaAzul from "@/components/FranjaAzul";

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
<div className="container m-auto max-w-2xl">
  <FranjaAzul />
  <Titulo titulo="VERIFICA UN <span class='text-azul-dictuc'>CERTIFICADO</span>" />
      <p className="mb-4">
        Dictuc emite informes y certificados con distintos mecanismos de validación, según el tipo de servicio.<br /><br />
        <ul>
            <li>Servicios rutinarios: informes con firma digital y código de verificación.</li>
          <li>Estudios y peritajes: informes con dos firmas y sin código de verificación.</li>
        </ul><br /><br />
        Si el documento tiene firma digital, ingresa a continuación el código de verificación para comprobar su autenticidad.
      </p>
      </div>

      {/* Formulario de verificación (Client Component) */}
      <div className="container m-auto max-w-2xl mt-6 mb-6 border border-gray-200 rounded-md p-4">
          <VerificaForm verificacionUrl={verificacionUrl} />
    </div>
      
      <p className="container m-auto max-w-2xl text-sm text-gray-600 mt-4">
        <p className="text-sm text-gray-600 mt-2">Si el código es válido, podrás visualizar un documento en formato PDF para 
            cotejar su contenido. Este archivo no corresponde al documento oficial firmado electrónicamente, sino a una versión idéntica 
            emitida exclusivamente para efectos de verificación.</p><br />
        En el caso de informes con dos firmas, estos se emiten sin código de verificación.
        Si requieres confirmar su validez, contacta a{' '}
        <a
          href="mailto:informes@dictuc.cl"
          className="text-azul-dictuc hover:underline focus:outline-none focus:ring-2 focus:ring-azul-dictuc focus:ring-offset-2"
        >
          informes@dictuc.cl
        </a>
      </p>

      <div className="container m-auto max-w-12xl mt-16">
        {/* Sección de noticias */}
        <Noticias
          noticias={noticias}
          className="mt-6"
          titulo='<span class="text-azul-dictuc">EN QUÉ </span>ESTAMOS'
        />
      </div>
    </PaginaInterior>
  );
}
