const useSectoresPais = async() => {

  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    console.error('STRAPI_API_URL is not defined');
    return { data: [], totalCount: 0 }; // Retornar estructura vacía válida
  }

  const path = "/api/sectores?populate=all&sort=nombre";

  try {
    const res = await fetch(baseUrl + path, {
      next: { revalidate: 3600 }, // Revalidar cada hora
      cache: 'force-cache'
    });

    if (!res.ok) {
      console.error("Failed to fetch sectores pais:", res.status);
      return { data: [], totalCount: 0 }; // Retornar estructura vacía válida
    }

    const data = await res.json();

    // Asegurar que data tenga la estructura correcta
    if (!data || !data.data) {
      console.warn('Invalid sectores data structure');
      return { data: [], totalCount: 0 };
    }

    // Añadir totalCount si no existe
    return {
      data: data.data,
      totalCount: data.data.length || 0
    };
  } catch (error) {
    console.error('Error fetching sectores pais:', error);
    return { data: [], totalCount: 0 }; // Retornar estructura vacía válida
  }
}

export default useSectoresPais;
