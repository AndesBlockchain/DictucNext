import React from "react"
import StrapiImage from "./StrapiImage"

export function AcortarNoticia(html, largo = 100) {
  if (!html) return html;
  // Remover tags HTML para truncar solo texto
  const texto = html.replace(/<[^>]*>/g, '');
  if (texto.length <= largo) return texto;
  const corte = texto.slice(0, largo);
  const ultimoEspacio = corte.lastIndexOf(" ");
  if (ultimoEspacio === -1) return corte + "...";
  return corte.slice(0, ultimoEspacio) + "...";
}

const formatearFecha = (fecha) => {
  if (!fecha) return '';
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const CardNoticia = ({ titulo, imagen, fecha, bajada, slug, mostrarFecha = true, fallback = null, seccion = null }) => {
  const seccionFinal = seccion === "proyectos-seleccionados" ? "proyectos-destacados" : seccion;

  return(
  <div className="flex flex-col w-72 bg-white rounded-xl shadow-lg overflow-hidden mt-4">
    <StrapiImage
      imagen={imagen}
      fallback={fallback}
      alt={titulo}
      className="w-full h-44 object-cover"
    />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-base font-semibold mb-2">{titulo}</h3>
      <div className="text-xs leading-relaxed mb-3 flex-grow">{AcortarNoticia(bajada)}</div>
      <div className="flex justify-between items-center mt-auto">
        {mostrarFecha ? <span className="text-xs">{formatearFecha(fecha)}</span> : <span></span>}
        <a href={"/novedades/" + seccionFinal + "/" + slug} className="text-azul-dictuc text-xs hover:text-blue-800 font-medium">Ver más</a>
      </div>
    </div>
  </div>
  )
}

export default CardNoticia
