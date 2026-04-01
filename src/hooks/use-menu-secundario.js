/**
 * Hook async para obtener detalles de un sector por slug desde Strapi API
 * Retorna null si el sector no existe
 */

const useMenuSecundario = async (seccion, slug) => {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/menu-secundarios?sort=sortOrder&filters[seccion][slug][$eq]=${seccion}`;

  console.log(baseUrl + path);
  const res = await fetch(baseUrl + path);

  if (!res.ok) {
    throw new Error(`Failed to fetch menu secundario: ${slug} (Status: ${res.status})`);
  }

  const data = await res.json();

  console.log("data menu secundario", data);
  return data.data;
};

export default useMenuSecundario;