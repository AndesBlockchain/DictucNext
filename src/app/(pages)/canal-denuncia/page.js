import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import FranjaAzul from "@/components/FranjaAzul";
import FormularioDenuncia from "@/components/FormularioDenuncia";
const BannerTeclado = "/images/BannerTeclado.webp";

export const metadata = {
  title: 'Dictuc | Canal de Denuncia'
};

export default function FormularioDenunciaPage() {
  return (
    <PaginaInterior
      className="justify-center"
      titulo="Canal de Denuncia"
      fallback={BannerTeclado}
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Canal de Denuncia", link: "/canal-denuncia" }
      ]}
    >
      <div className="my-8 text-center mx-auto pl-8 pr-8">
        <FranjaAzul />
        <div className="text-center mb-4 mt-4 font-semibold">
          CANAL DE <span className="text-azul-dictuc">DENUNCIA</span>
        </div>
        <div className="max-w-4xl m-auto">
          <p className="text-sm mb-4">
            Dictuc cuenta con un Canal de Denuncia para que trabajadores, clientes, proveedores
            y cualquier persona de la comunidad pueda reportar situaciones que puedan constituir
            una falta a nuestros principios éticos y de integridad.
          </p>
          <p className="text-sm mb-8">
            Este canal garantiza la confidencialidad de la información y la protección del denunciante.
            Todas las denuncias son tratadas con la máxima seriedad y son investigadas de manera imparcial.
          </p>
          <FormularioDenuncia />
        </div>
      </div>
    </PaginaInterior>
  );
}
