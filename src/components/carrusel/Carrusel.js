import React from "react";
import CarruselClient from "./CarruselClient";

async function getCarrusel() {
  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/carruseles?populate=*";

  const res = await fetch(baseUrl + path, { cache: 'no-store' });

  if (!res.ok) throw new Error("Failed to fetch carruseles");

  const data = await res.json();
  console.log(data.data[0].Imagen);
  return data;
}

const Carrusel = async () => {

  const carruselFetch = await getCarrusel();

  // Creamos el array carruselData con objetos itemCarrusel
  const carruselData = carruselFetch.data.map(item => {
    const imagen = item.Imagen && item.Imagen[0] ? item.Imagen[0] : (item.Imagen || {}); // Handle array or single object if Strapi structure varies
    return {
      fraseSuperior: item.FraseSuperior || "",
      fraseInferior: item.FraseInferior || "",
      frasesVisibles: !item.OcultarFrases,
      imagen: imagen, // Pass the raw Strapi image object/array to StrapiImage
      url: imagen.url || "",
      alto: imagen.height || 0,
      ancho: imagen.width || 0,
    };
  });

  return <CarruselClient carruselData={carruselData} />;
}

export default Carrusel;