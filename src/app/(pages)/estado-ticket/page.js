import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
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
      <div className="ml-auto mr-auto xl:w-2/5 lg:w-2/5 md:w-3/5 sm:w-4/5  justify-center items-center mb-6">
        <p className="mb-4">Aquí puedes consultar el estado de tu ticket y hacer seguimiento al avance de tu solicitud.
          Ingresa los datos requeridos para conocer su estado actual y la información disponible.</p>
        <EstadoTicketForm />
      </div>
    </PaginaInterior>
  );
}
