"use client"
import React, { useState, useEffect } from "react";

export default function EstadoTicketForm({ strapiApiUrl }) {
  const [ticket, setTicket] = useState("");
  const [estadoTicket, setEstadoTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({ show: false, message: "", type: "" });
  const [inputError, setInputError] = useState("");

  // Auto-hide de errores después de 4 segundos
  useEffect(() => {
    let timeoutId;

    if (error.show) {
      timeoutId = setTimeout(() => {
        setError({ show: false, message: "", type: "" });
      }, 4000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error.show]);

  const handleTicketChange = (e) => {
    setTicket(e.target.value);
    // Limpiar error de input cuando el usuario escribe
    if (inputError) {
      setInputError("");
    }
  };

  const handleVerificarTicket = async () => {
    // Validación de input vacío
    if (!ticket.trim()) {
      setInputError("Por favor ingrese un número de ticket");
      return;
    }

    // Prevenir doble submit
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError({ show: false, message: "", type: "" });
    setEstadoTicket(null);
    setInputError("");

    try {
      const response = await fetch(strapiApiUrl + '/api/estado-cotizacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_ticket: ticket
        })
      });

      if (response.status === 404) {
        // Ticket no encontrado
        setError({
          show: true,
          message: "Ticket no encontrado. Verifique el número ingresado.",
          type: "warning"
        });
      } else if (!response.ok) {
        // Otros errores HTTP
        throw new Error(`Error HTTP: ${response.status}`);
      } else {
        // Éxito
        const result = await response.json();
        setEstadoTicket({
          unidad: result.data.nombre_unidad,
          estado: result.data.nombre_estado
        });
      }
    } catch (error) {
      console.error('Error al verificar el ticket:', error);
      setError({
        show: true,
        message: "Error al verificar el estado del ticket. Por favor, inténtelo nuevamente.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Soporte para tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerificarTicket();
    }
  };

  return (
    <div>
      <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 mb-8">
        <legend className="fieldset-legend">Ingrese el Nº de Ticket</legend>
        <input
          type="text"
          className="input"
          value={ticket}
          onChange={handleTicketChange}
          onKeyPress={handleKeyPress}
          disabled={isSubmitting}
          aria-invalid={inputError ? "true" : "false"}
          placeholder="Ej: 12345"
        />
        {inputError && (
          <p className="text-red-500 mt-2" role="alert">{inputError}</p>
        )}
        <button
          className="btn btn-primary rounded-full mt-4"
          onClick={handleVerificarTicket}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Verificando...
            </>
          ) : (
            'Verificar Estado'
          )}
        </button>
      </fieldset>

      {/* Alert de éxito */}
      {estadoTicket && (
        <div role="alert" className="alert alert-success mb-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Asignado a: {estadoTicket.unidad}, Estado: {estadoTicket.estado}</span>
        </div>
      )}

      {/* Alert de error/warning */}
      {error.show && (
        <div role="alert" className={`alert ${error.type === 'warning' ? 'alert-warning' : 'alert-error'} mb-12`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
}
