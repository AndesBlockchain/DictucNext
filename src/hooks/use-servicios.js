import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useServicios = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/servicios?fields[0]=nombre&fields[1]=slug&fields[2]=contenido&populate[sectores_pais][fields][0]=slug&populate[tipo_de_servicio][fields][0]=slug&populate[unidad][fields][0]=nombre&pagination[limit]=1000',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'servicios'
  });

  return result?.data || [];
};

export default useServicios;
