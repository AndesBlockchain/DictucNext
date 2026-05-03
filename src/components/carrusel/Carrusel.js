import React from "react";
import CarruselClient from "./CarruselClient";
import { fetchFromStrapi, CACHE_PRESETS } from "@/lib/strapi-fetcher";

const Carrusel = async () => {
  const carruselFetch = await fetchFromStrapi({
    endpoint: "/api/carruseles?populate=*",
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: "carrusel"
  });

  const carruselData = (carruselFetch.data || []).map(item => {
    const imagen = item.Imagen && item.Imagen[0] ? item.Imagen[0] : (item.Imagen || {});
    return {
      fraseSuperior: item.FraseSuperior || "",
      fraseInferior: item.FraseInferior || "",
      frasesVisibles: !item.OcultarFrases,
      imagen: imagen,
      url: process.env.STRAPI_API_URL + imagen.url || "",
      alto: imagen.height || 0,
      ancho: imagen.width || 0,
    };
  });

  return <CarruselClient carruselData={carruselData} />;
}

export default Carrusel;
