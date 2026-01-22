/**
 * Hook async para obtener servicios de un sector desde Strapi API
 * Retorna servicios en formato compatible con Gatsby (nodes array)
 */

const useServiciosBySector = async (sectorSlug) => {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/servicios?filters[sectores_pais][slug][$eq]=${sectorSlug}&fields[0]=nombre&fields[1]=slug&fields[2]=contenido&pagination[limit]=1000&populate[0]=tipo_de_servicio&populate[1]=sectores_pais`;

  const res = await fetch(baseUrl + path);
  if (!res.ok) {
    throw new Error(`Failed to fetch servicios for sector: ${sectorSlug} (Status: ${res.status})`);
  }

  const data = await res.json();
  return data.data

};

export default useServiciosBySector;
