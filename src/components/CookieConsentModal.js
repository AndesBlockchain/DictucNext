"use client";

import { useEffect, useState } from "react";
import { readConsentCookie, writeConsentCookie } from "@/lib/cookie-consent";

export default function CookieConsentModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readConsentCookie();
    if (consent !== "accepted" && consent !== "rejected") {
      setVisible(true);
    }
  }, []);

  const handleDecision = (value) => {
    writeConsentCookie(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 px-4 py-6"
    >
      <div className="bg-white text-gris-dictuc rounded-2xl shadow-xl max-w-lg w-full p-6 font-montserrat">
        <h2 id="cookie-consent-title" className="text-lg font-bold mb-2 text-center">
          Uso de cookies
        </h2>
        <p className="text-sm mb-4">
          Utilizamos cookies propias y de terceros para analizar la navegación y mejorar
          tu experiencia, conforme a la Ley N.º 21.719 sobre Protección de Datos Personales
          de Chile. Puedes aceptar o rechazar su uso; si rechazas, no se activará ningún
          trackeo en esta página. Tu decisión se recordará por 3 meses.
        </p>
        <p className="text-sm mb-4">
          Puedes revisar acá nuestra{" "}
          <a
            href="https://backendweb.dictuc.cl/uploads/Politica_de_Tratamiento_de_Datos_Personales_Dictuc_406721e9e7.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azul-dictuc underline hover:no-underline"
          >
            política de protección de datos
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => handleDecision("accepted")}
            className="px-4 py-2 rounded-full bg-azul-dictuc text-white text-sm font-semibold hover:bg-azul-dictuc/90 transition-all"
          >
            Aceptar cookies
          </button>
          <button
            type="button"
            onClick={() => handleDecision("rejected")}
            className="px-4 py-2 rounded-full bg-gris-dictuc text-white text-sm font-semibold hover:bg-gris-dictuc/90 transition-all"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
