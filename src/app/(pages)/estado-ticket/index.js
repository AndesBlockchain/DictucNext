
import React, {useState} from "react";
import PaginaInterior from "../../components/PaginaInterior";
import BannerNoticias from "../../images/BannerMicrofonos.webp"
import Instagram from "../../components/Instagram"

export default function EstadoTicketPage() {

  const [ticket,setTicket] = useState("")
  const [estadoTicket,setEstadoTicket] = useState("")

  const handleTicketChange= (e) => {
    console.log(e.target.value)
    setTicket(e.target.value)
  }

  const handleVerificarTicket = async () => {
    if (!ticket.trim()) {
      alert('Por favor ingrese un número de ticket');
      return;
    }

    try {
      const response = await fetch(process.env.STRAPI_API_URL + '/api/estado-cotizacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_ticket: ticket
        })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      setEstadoTicket("Asigando a: " + result.data.nombre_unidad + ", Estado: " + result.data.nombre_estado)
      
      
      
    } catch (error) {
      console.error('Error al verificar el ticket:', error);
      alert('Error al verificar el estado del ticket. Por favor, inténtelo nuevamente.');
    }
  }

  return (
    <PaginaInterior fallback={BannerNoticias}
                    titulo="Estado Ticket"
                    breadcrum={[{ label: "Home", link: "/" }, { label: "Estado de Ticket", link: "/noticias" }]}> 
    <div>
      <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mb-8">
        <legend className="fieldset-legend">Ingrese el Nº de Ticket</legend>
        <input type="text" className="input" onChange={handleTicketChange}/>
        <button className="btn btn-primary rounded-full" onClick={handleVerificarTicket}>Verificar Estado</button>
      </fieldset>
      
      {estadoTicket && (
        <div role="alert" className="alert alert-success mb-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{estadoTicket}</span>
        </div>
      )}

    </div>
          
  
    </PaginaInterior>
  );
}

export const Head = () => <title>Dictuc | Noticias</title>