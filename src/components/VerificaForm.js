"use client"
import React, { useState, useRef, useEffect } from "react";

/**
 * Componente Cliente para verificar certificados DICTUC
 * Maneja el formulario y envío a sistema de verificación externo
 * Incluye validación avanzada, manejo de errores y feedback visual
 */
export default function VerificaForm({ verificacionUrl }) {
  const [codigo, setCodigo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const formRef = useRef(null);

  // Regex para validar formato de código (alfanumérico, 4-20 caracteres)
  const CODIGO_REGEX = /^[a-zA-Z0-9]{4,20}$/;

  // Cleanup del toast
  useEffect(() => {
    let timeoutId;
    if (toast.show) {
      timeoutId = setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
      }, 4000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [toast.show]);

  /**
   * Sanitiza el input del usuario
   * Remueve espacios y caracteres especiales peligrosos
   */
  const sanitizarCodigo = (valor) => {
    return valor
      .trim()
      .replace(/[<>'"]/g, '') // Remover caracteres peligrosos para XSS
      .substring(0, 20); // Limitar longitud
  };

  /**
   * Valida el formato del código
   * @returns {Object} { valido: boolean, mensaje: string }
   */
  const validarCodigo = (valor) => {
    const codigoLimpio = sanitizarCodigo(valor);

    if (!codigoLimpio) {
      return {
        valido: false,
        mensaje: "Por favor ingresa un código de verificación"
      };
    }

    if (codigoLimpio.length < 4) {
      return {
        valido: false,
        mensaje: "El código debe tener al menos 4 caracteres"
      };
    }

    if (!CODIGO_REGEX.test(codigoLimpio)) {
      return {
        valido: false,
        mensaje: "El código solo puede contener letras y números"
      };
    }

    return {
      valido: true,
      mensaje: "",
      codigoLimpio
    };
  };

  /**
   * Maneja el cambio del input
   * Valida en tiempo real y muestra errores
   */
  const handleCambiarCodigo = (e) => {
    const valor = e.target.value;
    setCodigo(valor);

    // Limpiar error anterior
    if (error) {
      setError("");
    }
  };

  /**
   * Verifica el certificado usando el formulario HTML nativo
   * Método mejorado que evita manipulación directa del DOM
   */
  const verificarCertificado = () => {
    // Validar código
    const validacion = validarCodigo(codigo);

    if (!validacion.valido) {
      setError(validacion.mensaje);
      setToast({
        show: true,
        message: validacion.mensaje,
        type: "error"
      });
      return;
    }

    // Prevenir doble submit
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Usar el formulario ref para enviar
      if (formRef.current) {
        // El formulario se envía automáticamente al target _blank
        formRef.current.submit();

        // Mostrar feedback de éxito
        setToast({
          show: true,
          message: "Abriendo verificación en nueva ventana...",
          type: "success"
        });

        // Limpiar código después de enviar
        setTimeout(() => {
          setCodigo("");
          setIsSubmitting(false);
        }, 500);
      } else {
        throw new Error("Formulario no disponible");
      }
    } catch (error) {
      console.error('[VerificaForm] Error al verificar certificado:', error);
      setError("Ocurrió un error al verificar el certificado. Por favor intenta nuevamente.");
      setToast({
        show: true,
        message: "Error al verificar. Por favor intenta nuevamente.",
        type: "error"
      });
      setIsSubmitting(false);
    }
  };

  /**
   * Maneja el submit del formulario (Enter key)
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    verificarCertificado();
  };

  /**
   * Maneja la tecla Enter en el input
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      verificarCertificado();
    }
  };

  return (
    <div className="pl-12 pr-12 pt-12 pb-6">
      {/* Toast de notificaciones */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            {toast.type === "error" ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <p className="mb-4">
        Dictuc actualmente genera informes con una firma digital, en el caso de servicios rutinarios,
        y con dos firmas tradicionales en el caso de estudios y peritajes.
      </p>

      <p className="mb-6">
        Acá puedes verificar la autenticidad de un certificado emitido por Dictuc. Ingresa el código
        de verificación del documento y revisa si es genuino.
      </p>

      {/* Formulario oculto para POST tradicional */}
      <form
        ref={formRef}
        method="POST"
        action={verificacionUrl}
        target="_blank"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <input
          type="hidden"
          name="cod_val"
          value={sanitizarCodigo(codigo)}
        />
        <input
          type="hidden"
          name="btnSubmitFormValidDoc"
          value="Verificar"
        />
      </form>

      {/* Formulario visible para el usuario */}
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset mt-6">
          <legend className="fieldset-legend">Ingresa el código de verificación</legend>

          <div className="relative">
            <input
              type="text"
              className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Ej: yrt439k"
              onChange={handleCambiarCodigo}
              onKeyDown={handleKeyDown}
              value={codigo}
              disabled={isSubmitting}
              aria-required="true"
              aria-label="Código de verificación"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "codigo-error" : "codigo-hint"}
              maxLength={20}
              autoComplete="off"
            />

            {/* Indicador de validación */}
            {codigo && !error && CODIGO_REGEX.test(sanitizarCodigo(codigo)) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Mensaje de ayuda */}
          {!error && (
            <p id="codigo-hint" className="text-sm text-gray-600 mt-2">
              El código debe tener entre 4 y 20 caracteres alfanuméricos
            </p>
          )}

          {/* Mensaje de error */}
          {error && (
            <p
              id="codigo-error"
              className="text-sm text-red-600 mt-2 flex items-center gap-1"
              role="alert"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </fieldset>

        <button
          className="btn btn-primary mb-6 mt-4 rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={verificarCertificado}
          disabled={!codigo.trim() || isSubmitting || !!error}
          type="button"
          aria-label="Verificar la autenticidad del certificado"
        >
          {/* Spinner de loading */}
          {isSubmitting && (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}

          <span>
            {isSubmitting ? 'Verificando...' : 'Verificar la autenticidad'}
          </span>
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        En el caso de informes con dos firmas, estos se emiten sin código de verificación.
        Si requieres confirmar su validez, contacta a{' '}
        <a
          href="mailto:informes@dictuc.cl"
          className="text-azul-dictuc hover:underline focus:outline-none focus:ring-2 focus:ring-azul-dictuc focus:ring-offset-2"
        >
          informes@dictuc.cl
        </a>
      </p>
    </div>
  );
}
