import React from "react";
import Bloque from "./Bloque";
import EstadoTicketForm from "@/app/(pages)/estado-ticket/EstadoTicketForm";

const BloqueEstadoTicket = ({ datosBloque }) => {
  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="max-w-4xl mx-auto">
        <EstadoTicketForm />
      </div>
    </Bloque>
  );
};

export default BloqueEstadoTicket;
