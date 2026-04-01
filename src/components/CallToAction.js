import React from "react";

const CallToAction = ({ url, colorFondo, colorTexto, ComoAbrir, texto }) => {
    // Validación de props requeridas
    if (!url || !texto) {
        return null;
    }
  
    // Construir className de forma segura
    const getClassName = () => {
        const baseClasses = "bg-azul-dictuc font-bold rounded-full px-4 py-2 text-xs hover:bg-azul-dictuc/90 transition-all";
        const bgOverride = colorFondo?.Codigo && colorFondo.Codigo !== "azul-dictuc" ? `bg-${colorFondo.Codigo}` : '';
        const textOverride = colorTexto?.Codigo ? `text-${colorTexto.Codigo}` : '';

        return [baseClasses, bgOverride, textOverride].filter(Boolean).join(' ');
    };

    return (
        <a 
            href={url} 
            className={getClassName()}
            target={ComoAbrir === "Ventana Nueva" ? "_blank" : "_self"}
            rel={ComoAbrir === "Ventana Nueva" ? "noopener noreferrer" : ""}
        >
            {texto}
        </a>
    );
};

export default CallToAction; 