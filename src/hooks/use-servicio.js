/**
 * Hook async para obtener servicios de un sector desde Strapi API
 * Retorna servicios en formato compatible con Gatsby (nodes array)
 */

const useServicio = async (slug) => {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/servicios?filters[slug][$eq]=${slug}&populate=all`;

  const res = await fetch(baseUrl + path);
  if (!res.ok) {
    throw new Error(`Failed to fetch servicios for servicio: ${slug} (Status: ${res.status})`);
  }

  const data = await res.json();
  
  return data.data[0]

};

export default useServicio;
