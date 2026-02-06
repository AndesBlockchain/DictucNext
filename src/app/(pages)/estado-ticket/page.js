import React from "react";
import PaginaInterior from "@/components/PaginaInterior";
import EstadoTicketForm from "./EstadoTicketForm";
const BannerNoticias = "/images/BannerMicrofonos.webp";

export const metadata = {
  title: 'Dictuc | Estado de Ticket'
};

export default async function EstadoTicketPage() {
  const strapiApiUrl = process.env.STRAPI_API_URL;

  return (
    <PaginaInterior
      fallback={BannerNoticias}
      titulo="Estado Ticket"
      breadcrum={[
        { label: "Home", link: "/" },
        { label: "Estado de Ticket", link: "/estado-ticket" }
      ]}
    >
      <EstadoTicketForm strapiApiUrl={strapiApiUrl} />
    </PaginaInterior>
  );
}
