"use client"
import React, { useState } from "react";
import BarraFondoGris from "../BarraFondoGris";
import StrapiImage from "../StrapiImage";

const CarruselClient = ({ carruselData }) => {
    const [indiceCarrusel, setIndiceCarrusel] = useState(0);
    const anteriorImagen = () => {
        setIndiceCarrusel(prev => prev === 0 ? carruselData.length - 1 : prev - 1);
    };

    const siguienteImagen = () => {
        setIndiceCarrusel(prev => prev === carruselData.length - 1 ? 0 : prev + 1);
    };

    if (!carruselData || carruselData.length === 0) {
        return null;
    }

    const itemActual = carruselData[indiceCarrusel];

    return (
        <div className="relative z-0 isolate">
            <BarraFondoGris className={!itemActual.frasesVisibles ? " invisible" : ""}>
                {itemActual.fraseSuperior}
            </BarraFondoGris>
            <div id="texto-carrusel-2" className={"font-semibold absolute text-lg bottom-15 right-0 z-5 w-3/5 bg-gray-200 opacity-90 text-opacity-90 px-6 py-3 rounded-l-full" + (!itemActual.frasesVisibles ? " invisible" : "")}>
                {itemActual.fraseInferior}
            </div>
            <div className="w-full bg-gray-50 flex items-center justify-center shadow-md relative">
                <button onClick={anteriorImagen} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <StrapiImage
                    fallback={itemActual.url}
                    alt={itemActual.fraseSuperior || "Imagen Carrusel"}
                    fill={true}
                    className="object-cover h-full"
                    priority={true}
                />

                <button onClick={siguienteImagen} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
}

export default CarruselClient;
