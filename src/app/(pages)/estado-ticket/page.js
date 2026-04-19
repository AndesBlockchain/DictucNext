import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import FranjaAzul from "@/components/FranjaAzul";
import EstadoTicketForm from "./EstadoTicketForm";
const BannerNoticias = "/images/BannerMicrofonos.webp";

export const metadata = {
  title: 'Dictuc | Estado de Ticket'
};

export default async function EstadoTicketPage() {
  return (
    <PaginaInterior
      fallback={BannerNoticias}
      titulo="Estado Ticket"
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Estado de Ticket", link: "/estado-ticket" }
      ]}
    >
      <div className="my-8 text-center mx-auto pl-8 pr-8">
        <FranjaAzul />
        <div className="text-center mb-4 mt-4 font-semibold">
          ESTADO DE <span className="text-azul-dictuc">TICKET</span>
        </div>
        <div className="max-w-4xl m-auto">
          <p className="text-sm text-gris-dictuc mb-6">Aquí puedes consultar el estado de tu ticket y hacer seguimiento al avance de tu solicitud.
            Ingresa los datos requeridos para conocer su estado actual y la información disponible.</p>
          <EstadoTicketForm />
        </div>
      </div>
    </PaginaInterior>
  );
}
