import React from "react";
import Bloque from "./Bloque";
import CallToAction from "../CallToAction";

const BloqueTexto = ({ datosBloque }) => {
    const letra = datosBloque.Texto?.tipografia?.class || "text-sm";
    const colorLetra = datosBloque.Texto?.colorTexto?.Codigo || "black";
    const botones = datosBloque.CallToAction || [];
    
    console.log(datosBloque);
    

    // Obtener el texto de forma segura
    const textoHTML = datosBloque.Texto?.Texto || '';
    const textoBajada = datosBloque.Bajada?.Texto || '';
    
    // Construir className de forma más limpia
    const textoClassName = `${letra} text-${colorLetra}`;
    const textoBajadaClassName = `${letra} text-${colorLetra} font-semibold mb-2`;
    return (
        <Bloque datosBloque={datosBloque.Bloque}>
            <div 
                className={textoBajadaClassName} 
                dangerouslySetInnerHTML={{ __html: textoBajada }} 
            />
            <div 
                className={textoClassName} 
                dangerouslySetInnerHTML={{ __html: textoHTML }} 
            />
            <div className="flex flex-row mt-4 items-center justify-center gap-4">
                {botones.map((item, index) => (
                    <CallToAction 
                        key={index}
                        url={item.url}
                        colorFondo={item.colorBoton}
                        colorTexto={item.colorTexto}
                        ComoAbrir={item.ComoAbrir}
                        texto={item.texto}
                    />
                ))}
            </div>
        </Bloque>
    );
};

export default BloqueTexto;