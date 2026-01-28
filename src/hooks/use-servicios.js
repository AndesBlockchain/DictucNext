
const useServicios = async () => {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/servicios?populate[0]=sectores_pais&populate[1]=tipo_de_servicio&pagination[limit]=1000`;

  const res = await fetch(baseUrl + path);
  if (!res.ok) {
    throw new Error(`Failed to fetch servicios (Status: ${res.status})`);
  }

  const data = await res.json();
  return data.data

};

export default useServicios;
