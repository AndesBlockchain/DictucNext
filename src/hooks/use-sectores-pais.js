const useSectoresPais = async() => {

  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/sectores?populate=all";


  const res = await fetch(baseUrl + path);

  if (!res.ok) throw new Error("Failed to fetch sectores pais");

  const data = await res.json();
  return data;
}

export default useSectoresPais;
