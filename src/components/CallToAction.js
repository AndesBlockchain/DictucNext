import React from "react";

const CallToAction = ({ url, colorFondo, colorTexto, ComoAbrir, texto }) => {
    // Validación de props requeridas
    if (!url || !texto) {
        return null;
    }
  
    // Construir className de forma segura
    const getClassName = () => {
        const baseClasses = "btn rounded-full";
        const colorFondoCodigo = colorFondo?.Codigo === "azul-dictuc" ? "primary" : colorFondo?.Codigo;
        const colorFondoClass = colorFondoCodigo ? `btn-${colorFondoCodigo}` : 'btn-primary';
        const colorTextoClass = colorTexto?.Codigo ? `text-${colorTexto.Codigo}` : 'text-azul-dictuc';
        
        return [baseClasses, colorFondoClass, colorTextoClass].filter(Boolean).join(' ');
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