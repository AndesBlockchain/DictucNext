/**
 * Hook async para obtener servicios de un sector desde Strapi API
 * Retorna servicios en formato compatible con Gatsby (nodes array)
 */

const useRutificador = async (rut) => {
  const baseUrl = process.env.STRAPI_API_URL;

  // Validar que STRAPI_API_URL esté definida
  if (!baseUrl) {
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/rutificador`;

  const res = await fetch(baseUrl + path,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rut: rut
        })
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch rutificador: ${rut} (Status: ${res.status})`);
  }

  const data = await res.json();
  
  return data

};

export default useRutificador;
