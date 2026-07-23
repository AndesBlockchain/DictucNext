import React from "react";
import StrapiImage from "./StrapiImage";

function CtaLink({ cta }) {
  if (!cta?.url) return null;
  return (
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
  );
}

export default function CardSmall({ titulo, callToAction, icono, contenido, color_fondo, color_texto }) {
  const cta = Array.isArray(callToAction) ? callToAction[0] : callToAction;
  const tieneImagen = icono?.url || icono?.formats;

  if (!tieneImagen) {
    return (
      <div className={`border rounded-lg shadow-xl p-2 grid grid-cols-1 w-full h-full bg-${color_fondo} ${color_texto}`}>
        <div className="p-4 flex flex-col">
          <h2 className="text-sm text-left font-bold">{titulo}</h2>
          <div className="text-xs text-left flex-grow mr-4 prose prose-xs max-w-none" dangerouslySetInnerHTML={{ __html: contenido }} />
          <CtaLink cta={cta} />
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg shadow-xl p-2 grid grid-cols-3 grid-rows-[auto_1fr] w-full h-full bg-${color_fondo} ${color_texto}`}>
      <h2 className="col-start-2 col-span-2 row-start-1 text-sm text-left font-bold">
        {titulo}
      </h2>

      <div className="col-start-1 row-start-2 p-4 pt-0 flex items-start">
        <StrapiImage
          imagen={icono}
          fallback={icono?.formats?.medium?.url || icono?.url}
          alt={titulo || "Icono"}
          maxWidth={245}
          className="w-full"
        />
      </div>

      <div className="col-start-2 col-span-2 row-start-2 flex flex-col">
        <div className="text-xs text-left flex-grow mr-4 prose prose-xs max-w-none" dangerouslySetInnerHTML={{ __html: contenido }} />
        <CtaLink cta={cta} />
      </div>
    </div>
  );
}
