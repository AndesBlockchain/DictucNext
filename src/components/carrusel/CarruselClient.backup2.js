"use client"
import React, { useState, useEffect } from "react";
import BarraFondoGris from "../BarraFondoGris";
import StrapiImage from "../StrapiImage";

/**
 * Componente Cliente del Carrusel
 * Maneja la interacción del usuario con el carrusel de imágenes
 * Incluye navegación con botones, teclado e indicadores visuales
 */
const CarruselClient = ({ carruselData }) => {
    const [indiceCarrusel, setIndiceCarrusel] = useState(0);

    const anteriorImagen = () => {
        setIndiceCarrusel(prev => prev === 0 ? carruselData.length - 1 : prev - 1);
    };

    const siguienteImagen = () => {
        setIndiceCarrusel(prev => prev === carruselData.length - 1 ? 0 : prev + 1);
    };

    // Navegación con teclado (flechas ← →)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                anteriorImagen();
            } else if (e.key === 'ArrowRight') {
                siguienteImagen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [carruselData.length]); // Solo recrear si cambia la longitud

    if (!carruselData || carruselData.length === 0) {
        return null;
    }

    const itemActual = carruselData[indiceCarrusel];

    return (
        <div
            className="relative z-0 isolate"
            role="region"
            aria-label="Carrusel de imágenes"
            aria-roledescription="carousel"
        >
            <BarraFondoGris className={!itemActual.frasesVisibles ? " invisible" : ""}>
                {itemActual.fraseSuperior}
            </BarraFondoGris>

            <div
                id="texto-carrusel-2"
                className={`font-semibold absolute text-lg bottom-15 right-0 w-3/5 bg-gray-900/80 text-white px-6 py-3 rounded-l-full shadow-lg backdrop-blur-sm z-20${!itemActual.frasesVisibles ? ' invisible' : ''}`}
                aria-live="polite"
            >
                {itemActual.fraseInferior}
            </div>

            <div className="w-full bg-gray-50 flex items-center justify-center shadow-md relative h-[300px] md:h-[400px] lg:h-[500px]">
                {/* Botón anterior */}
                <button
                    onClick={anteriorImagen}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-10"
                    aria-label="Imagen anterior"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Imagen actual */}
                <StrapiImage
                    imagen={itemActual.imagen}
                    alt={itemActual.fraseSuperior || `Imagen ${indiceCarrusel + 1} de ${carruselData.length}`}
                    fill={true}
                    className="object-cover"
                    priority={indiceCarrusel === 0} // Solo priority en la primera imagen
                />

                {/* Botón siguiente */}
                <button
                    onClick={siguienteImagen}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-10"
                    aria-label="Imagen siguiente"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Indicadores de paginación (dots) */}
                {carruselData.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {carruselData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setIndiceCarrusel(index)}
                                className={`h-2 rounded-full transition-all ${
                                    index === indiceCarrusel
                                        ? 'bg-white w-8'
                                        : 'bg-white/50 hover:bg-white/75 w-2'
                                }`}
                                aria-label={`Ir a imagen ${index + 1}`}
                                aria-current={index === indiceCarrusel ? 'true' : 'false'}
                                type="button"
                            />
                        ))}
                    </div>
                )}

                {/* Contador visual */}
                {carruselData.length > 1 && (
                    <div
                        className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-10"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {indiceCarrusel + 1} / {carruselData.length}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarruselClient;
