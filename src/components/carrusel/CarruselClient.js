"use client"
import React, { useState, useEffect, useCallback } from "react";
import BarraFondoGris from "../BarraFondoGris";
import StrapiImage from "../StrapiImage";

const CarruselClient = ({ carruselData }) => {
    const [indiceCarrusel, setIndiceCarrusel] = useState(0);

    const avanzarSlide = useCallback(() => {
        setIndiceCarrusel((prev) => (prev + 1) % carruselData.length);
    }, [carruselData.length]);

    useEffect(() => {
        if (!carruselData || carruselData.length <= 1) return;
        const intervalo = setInterval(avanzarSlide, 3000);
        return () => clearInterval(intervalo);
    }, [carruselData, avanzarSlide]);

    if (!carruselData || carruselData.length === 0) {
        return null;
    }

    const itemActual = carruselData[indiceCarrusel];

    return (
        <div className="relative z-0 isolate">
            <BarraFondoGris className={!itemActual.frasesVisibles ? " invisible" : ""}>
                {itemActual.fraseSuperior}
            </BarraFondoGris>
            <div id="texto-carrusel-2" className={"absolute font-semibold text-sm xl:text-xl 2xl:text-xl bottom-15 right-0 z-5 w-2/5 bg-gray-200 opacity-90 pl-8 text-opacity-90 px-6 py-3" + (!itemActual.frasesVisibles ? " invisible" : "")}>
                {itemActual.fraseInferior}
            </div>
            <div className="w-full bg-gray-50 flex items-center justify-center shadow-md relative">
                <StrapiImage
                    fallback={itemActual.url}
                    alt={itemActual.fraseSuperior || "Imagen Carrusel"}
                    fill={true}
                    className="object-cover w-full"
                    priority={true}
                />

                <div className="absolute bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {carruselData.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndiceCarrusel(i)}
                            className={`w-5.5 h-1.5 rounded-full transition-all ${i === indiceCarrusel ? "bg-white opacity-100" : "bg-white opacity-50"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarruselClient;
