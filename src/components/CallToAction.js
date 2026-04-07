import React from "react";

const CallToAction = ({ url, colorFondo, colorTexto, ComoAbrir, texto }) => {
    // Validación de props requeridas
    if (!url || !texto) {
        return null;
    }
  
    const bgClass = colorFondo?.Codigo ? `bg-${colorFondo.Codigo}` : "bg-azul-dictuc";
    const txtClass = colorTexto?.Codigo ? `text-${colorTexto.Codigo}` : "text-white";

    return (
        <a
            href={url}
            className={`${bgClass} ${txtClass} font-bold rounded-full px-4 py-2 text-xs hover:opacity-90 transition-all`}
            target={ComoAbrir === "Ventana Nueva" ? "_blank" : "_self"}
            rel={ComoAbrir === "Ventana Nueva" ? "noopener noreferrer" : ""}
        >
            {texto}
        </a>
    );
};

export default CallToAction; 