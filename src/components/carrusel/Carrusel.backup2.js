import React from "react";
import CarruselClient from "./CarruselClient";
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * Obtiene los datos del carrusel desde Strapi
 * Usa strapi-fetcher para manejo robusto de errores y cache
 */
async function getCarrusel() {
  const query = buildStrapiQuery({
    populate: '*'
  });

  return fetchFromStrapi({
    endpoint: `/api/carruseles${query}`,
    cache: CACHE_PRESETS.HOURLY, // Cache 1 hora - los carruseles no cambian frecuentemente
    fallback: { data: [] }, // Fallback seguro si falla
    errorContext: 'carrusel home'
  });
}

/**
 * Componente Carrusel - Server Component
 * Obtiene datos del carrusel y renderiza el cliente
 */
const Carrusel = async () => {
  const carruselFetch = await getCarrusel();

  // Validar que hay datos antes de procesar
  if (!carruselFetch?.data || !Array.isArray(carruselFetch.data) || carruselFetch.data.length === 0) {
    console.warn('[Carrusel] No hay datos para mostrar');
    return null; // No mostrar nada si no hay datos
  }

  // Filtrar items válidos (que tengan imagen) y mapear a estructura del cliente
  const carruselData = carruselFetch.data
    .filter(item => {
      // Verificar que el item tenga una imagen válida
      const hasImage = item.Imagen && (
        Array.isArray(item.Imagen)
          ? item.Imagen.length > 0 && item.Imagen[0]?.url
          : item.Imagen?.url
      );

      if (!hasImage) {
        console.warn('[Carrusel] Item sin imagen válida:', item.id || 'unknown');
      }

      return hasImage;
    })
    .map(item => {
      // Normalizar la estructura de la imagen (array o objeto)
      const imagen = Array.isArray(item.Imagen) && item.Imagen[0]
        ? item.Imagen[0]
        : item.Imagen;

      return {
        fraseSuperior: item.FraseSuperior || "",
        fraseInferior: item.FraseInferior || "",
        frasesVisibles: !item.OcultarFrases,
        imagen: imagen // Pasar el objeto de imagen completo a StrapiImage
        // Propiedades url, alto, ancho eliminadas - no se usan
      };
    });

  // Si después de filtrar no hay items válidos, no renderizar
  if (carruselData.length === 0) {
    console.warn('[Carrusel] No hay items válidos después de filtrar');
    return null;
  }

  return <CarruselClient carruselData={carruselData} />;
}

export default Carrusel;