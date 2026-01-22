const useModals = async() => {

  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/carruseles";

  //const url = new URL(path, baseUrl);

  const res = await fetch("http://127.0.0.1:1337/api/carruseles");

  if (!res.ok) throw new Error("Failed to fetch carruseles");

  const data = await res.json();

  return data;
}

export default useModals;