const useUltimasNoticias = async () => {

  const baseUrl = process.env.STRAPI_API_URL;
  const path = "api/noticias?status=published&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6";
  //const url = new URL(path, baseUrl);

  const res = await fetch("http://127.0.0.1:1337/api/noticias?status=published&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6");

  if (!res.ok) throw new Error("Failed to fetch ultimas noticias");
  const data = await res.json();
  return data;
}

export default useUltimasNoticias;