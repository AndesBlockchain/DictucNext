const useTipoDeServicio = async() => {

  const baseUrl = process.env.STRAPI_API_URL;

  const res = await fetch(baseUrl + "/api/tipo-de-servicios?populate=all");

  if (!res.ok) throw new Error("Failed to fetch sectores pais");

  const data = await res.json();
  return data;
}

export default useTipoDeServicio;