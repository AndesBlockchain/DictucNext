const useModals = async() => {

  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/carruseles";

  const res = await fetch(baseUrl + path);

  if (!res.ok) throw new Error("Failed to fetch carruseles");

  const data = await res.json();

  return data;
}

export default useModals;