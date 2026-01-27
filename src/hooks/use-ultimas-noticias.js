const useUltimasNoticias = async () => {

  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    console.error('STRAPI_API_URL is not defined');
    return { data: [] }; // Retornar estructura vacía válida
  }

  const path = "/api/noticias?status=published&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6";

  try {
    const res = await fetch(baseUrl + path, {
      next: { revalidate: 3600 }, // Revalidar cada hora
      cache: 'force-cache'
    });

    if (!res.ok) {
      console.error("Failed to fetch ultimas noticias:", res.status, res.statusText);
      return { data: [] }; // Retornar estructura vacía válida
    }

    const data = await res.json();

    // Asegurar que data tenga la estructura correcta
    if (!data || !data.data) {
      console.warn('Invalid noticias data structure');
      return { data: [] };
    }

    return data;
  } catch (error) {
    console.error('Error fetching ultimas noticias:', error);
    return { data: [] }; // Retornar estructura vacía válida
  }
}

export default useUltimasNoticias;