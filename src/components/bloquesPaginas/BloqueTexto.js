import React from "react";
import Bloque from "./Bloque";
import CallToAction from "../CallToAction";

const BloqueTexto = ({ datosBloque }) => {
    const letra = datosBloque.Texto?.tipografia?.class || "text-sm";
    const colorLetra = datosBloque.Texto?.colorTexto?.Codigo || "black";
    const botones = datosBloque.CallToAction || [];


    // Obtener el texto de forma segura
    const textoHTML = datosBloque.Texto?.Texto || '';
    const textoBajada = datosBloque.Bajada?.Texto || '';
    
    return (
        <Bloque datosBloque={datosBloque.Bloque}>
            <div className="max-w-4xl m-auto">
                {textoBajada && (
                    <div
                        className={`${letra} font-semibold mb-2`}
                        style={{ color: colorLetra }}
                        dangerouslySetInnerHTML={{ __html: textoBajada }}
                    />
                )}
                <div
                    className={letra}
                    style={{ color: colorLetra }}
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
            </div>
        </Bloque>
    );
};

export default BloqueTexto;