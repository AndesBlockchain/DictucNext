import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import FormularioDenuncia from "@/components/FormularioDenuncia";
const BannerTeclado = "/images/BannerTeclado.webp";

export const metadata = {
  title: 'Dictuc | Canal de Denuncia'
};

export default function FormularioDenunciaPage() {
  return (
    <PaginaInterior
      className="justify-center"
      fallback={BannerTeclado}
      titulo="Canal de Denuncia"
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Canal de Denuncia", link: "/paginas/canal-denuncia" }
      ]}
    >
      <div className="ml-auto mr-auto xl:w-3/5 lg:w-4/5 md:w-4/5 sm:w-full px-4 justify-center items-center mb-6">
        <div className="prose max-w-none mb-8">
          <p className="text-center text-lg">
            Dictuc cuenta con un Canal de Denuncia para que trabajadores, clientes, proveedores
            y cualquier persona de la comunidad pueda reportar situaciones que puedan constituir
            una falta a nuestros principios éticos y de integridad.
          </p>
          <p className="text-center text-lg">
            Este canal garantiza la confidencialidad de la información y la protección del denunciante.
            Todas las denuncias son tratadas con la máxima seriedad y son investigadas de manera imparcial.
          </p>
        </div>
        <FormularioDenuncia />
      </div>
    </PaginaInterior>
  );
}
