const useNoticia = async (slug) => {

  const baseUrl = process.env.STRAPI_API_URL;
  const path = `/api/noticias?filters[slug][$eq]=${slug}&status=published&populate=all`;

  const res = await fetch(baseUrl + path);

  if (!res.ok) throw new Error("Failed to fetch noticia");
  const data = await res.json();
  return data.data[0];
}

export default useNoticia;
