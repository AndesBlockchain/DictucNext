import React from "react";
import StrapiImage from "./StrapiImage";

export default function CardSmall({ titulo, callToAction, icono, contenido }) {
  const cta = Array.isArray(callToAction) ? callToAction[0] : callToAction;
  const tieneImagen = icono?.url || icono?.formats;

  return (
    <div className={`border rounded-lg shadow-xl p-2 grid w-full h-full ${tieneImagen ? "grid-cols-3" : "grid-cols-1"}`}>
      {tieneImagen && (
        <div className="col-span-1 p-4 flex items-center">
          <StrapiImage
            imagen={icono}
            fallback={icono?.formats?.medium?.url || icono?.url}
            alt={titulo || "Icono"}
            maxWidth={245}
            className="w-full"
          />
        </div>
      )}
      <div className={`${tieneImagen ? "col-span-2" : "col-span-1 p-4"} flex flex-col`}>
        <h2 className="text-sm text-left font-bold">{titulo}</h2>
        <div className="text-xs text-left flex-grow mr-4 prose prose-xs max-w-none" dangerouslySetInnerHTML={{__html: contenido}} />
        {cta?.url && (
          <div className="mt-4 text-xs text-right mr-4">
            <a
              className="text-azul-dictuc"
              href={cta.url}
              target={cta.ComoAbrir === "Ventana Nueva" ? "_blank" : "_self"}
              rel={cta.ComoAbrir === "Ventana Nueva" ? "noopener noreferrer" : undefined}
            >
              Ver detalle →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
