const useNoticiasByTag = async (tag) => {

  const baseUrl = process.env.STRAPI_API_URL;
  const path = `/api/noticias?filters[etiqueta_noticias][$eq]=${tag}&status=published&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6`;

  const res = await fetch(baseUrl + path);

  if (!res.ok) throw new Error("Failed to fetch ultimas noticias");
  const data = await res.json();
  return data;
}

export default useNoticiasByTag;
