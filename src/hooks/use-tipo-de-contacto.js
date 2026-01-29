/**
 * Hook async para obtener detalles de un sector por slug desde Strapi API
 * Retorna null si el sector no existe
 */

const useTipoDeContacto = async () => {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    console.error('STRAPI_API_URL is not defined');
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/tipos-de-contactos`;
  const fullUrl = baseUrl + path;

  try {
    const res = await fetch(fullUrl, {
      next: { revalidate: 3600 }, // Revalidar cada hora
      cache: 'force-cache'
    });


    if (!res.ok) {
      const errorText = await res.text();
      console.error('Response error:', errorText);
      throw new Error(`Failed to fetch tipos de contacto (Status: ${res.status}): ${errorText}`);
    }

    const data = await res.json();

    // Validar que la respuesta tenga datos
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.warn('No tipos de contacto data found');
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching tipos de contacto:', error);
    throw error;
  }
};

export default useTipoDeContacto;
