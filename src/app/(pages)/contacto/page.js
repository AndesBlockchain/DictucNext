import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import Contacto from "@/components/Contacto";
const BannerTeclado =  "/images/BannerTeclado.webp";
import useTipoDeContacto from "@/hooks/use-tipo-de-contacto";

export const metadata = {
  title: 'Dictuc | Formulario de Contacto'
};

export default async function ContactoPage({ searchParams }) {

  const params = await searchParams;
  const accion = params?.accion || null;
  const esReclamo = accion === "reclamo";
  const tituloPagina = esReclamo ? "Canal de Reclamos" : "Formulario de Contacto";
  const tiposDeContacto = await useTipoDeContacto();
  const strapiApiUrl = process.env.STRAPI_API_URL;

  return (
    <PaginaInterior className="justify-center" fallback={BannerTeclado} titulo={tituloPagina} breadcrum={[{ label: "Home", link: "/" }, { label: tituloPagina, link: "/contacto" }]}>
    <div className="ml-auto mr-auto xl:w-2/5 lg:w-2/5 md:w-3/5 sm:w-4/5  justify-center items-center mb-6">
      <Contacto border={true} tiposDeContacto={tiposDeContacto} titulo="¿En qué podemos ayudarte?" strapiApiUrl={strapiApiUrl} accionInicial={accion} />
    </div>
    </PaginaInterior>
  );
}