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
      <div className="my-8 text-center mx-auto pl-8 pr-8 mb-24">
        <FormularioDenuncia />
      </div>
    </PaginaInterior>
  );
}
