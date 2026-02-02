"use client"
import React, { useState } from "react";

/**
 * Componente Cliente para verificar certificados DICTUC
 * Maneja el formulario y envío a sistema de verificación externo
 */
export default function VerificaForm({ verificacionUrl }) {
  const [codigo, setCodigo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verificarCertificado = () => {
    // Validar que el código no esté vacío
    if (!codigo.trim()) {
      return;
    }

    // Prevenir doble submit
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Crear un formulario temporal para enviar los datos por POST
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = verificacionUrl;
      form.target = '_blank'; // Abrir en nueva ventana

      // Crear campo cod_val
      const codValInput = document.createElement('input');
      codValInput.type = 'hidden';
      codValInput.name = 'cod_val';
      codValInput.value = codigo.trim();

      // Crear campo btnSubmitFormValidDoc
      const btnSubmitInput = document.createElement('input');
      btnSubmitInput.type = 'hidden';
      btnSubmitInput.name = 'btnSubmitFormValidDoc';
      btnSubmitInput.value = 'Verificar';

      // Agregar campos al formulario
      form.appendChild(codValInput);
      form.appendChild(btnSubmitInput);

      // Agregar formulario al DOM, enviarlo y removerlo
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Limpiar código después de enviar
      setCodigo("");
    } catch (error) {
      console.error('[VerificaForm] Error al verificar certificado:', error);
    } finally {
      // Reset loading state después de un breve delay
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      verificarCertificado();
    }
  };

  return (
    <div className="pl-12 pr-12 pt-12 pb-6">
      <p className="mb-4">
        Dictuc actualmente genera informes con una firma digital, en el caso de servicios rutinarios,
        y con dos firmas tradicionales en el caso de estudios y peritajes.
      </p>

      <p className="mb-6">
        Acá puedes verificar la autenticidad de un certificado emitido por Dictuc. Ingresa el código
        de verificación del documento y revisa si es genuino.
      </p>

      <fieldset className="fieldset mt-6">
        <legend className="fieldset-legend">Ingresa el código de verificación</legend>
        <input
          type="text"
          className="input"
          placeholder="Ej: yrt439k"
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={handleKeyDown}
          value={codigo}
          disabled={isSubmitting}
          aria-required="true"
          aria-label="Código de verificación"
        />
      </fieldset>

      <button
        className="btn btn-primary mb-6 mt-4 rounded-full"
        onClick={verificarCertificado}
        disabled={!codigo.trim() || isSubmitting}
        type="button"
        aria-label="Verificar la autenticidad del certificado"
      >
        {isSubmitting ? 'Verificando...' : 'Verificar la autenticidad'}
      </button>

      <p className="text-sm text-gray-600 mt-4">
        En el caso de informes con dos firmas, estos se emiten sin código de verificación.
        Si requieres confirmar su validez, contacta a{' '}
        <a href="mailto:informes@dictuc.cl" className="text-azul-dictuc hover:underline">
          informes@dictuc.cl
        </a>
      </p>
    </div>
  );
}
