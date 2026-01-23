
import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import Contacto from "@/components/Contacto";
const BannerTeclado =  "/images/BannerTeclado.webp";
import useTipoDeContacto from "@/hooks/use-tipo-de-contacto";

export default async function ContactoPage() {

  const tiposDeContacto = await useTipoDeContacto();

  return (
    <PaginaInterior className="justify-center" fallback={BannerTeclado} titulo="Formulario de Contacto" breadcrum={[{ label: "Home", link: "/" }, { label: "Contacto", link: "/contacto" }]}> 
    <div className="ml-auto mr-auto xl:w-2/5 lg:w-2/5 md:w-3/5 sm:w-4/5  justify-center items-center mb-6">
      <Contacto border={false} tiposDeContacto={tiposDeContacto} titulo="¿En qué podemos ayudarte?"/>
    </div>  
    </PaginaInterior>
  );
}

export const Head = () => <title>Dictuc | Formulario de Contacto</title>