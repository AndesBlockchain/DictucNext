import React from "react";
import Bloque from "./Bloque";
import EstadoTicketForm from "@/components/EstadoTicketForm";

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
