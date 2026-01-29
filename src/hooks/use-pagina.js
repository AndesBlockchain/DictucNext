/**
 * Hook async para obtener detalles de un sector por slug desde Strapi API
 * Retorna null si el sector no existe
 */

const usePagina = async (slug) => {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/paginas?filters[slug][$eq]=${slug}&populate=all`;

  const res = await fetch(baseUrl + path, {
    next: { revalidate: 3600 }, // Revalidar cada hora
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch pagina: ${slug} (Status: ${res.status})`);
  }

  const data = await res.json();

  // Validar que la respuesta tenga datos
  if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
    return null;
  }

  return data.data[0];
};

export default usePagina;
