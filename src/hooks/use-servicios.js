import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useServicios = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/servicios?populate[0]=sectores_pais&populate[1]=tipo_de_servicio&populate[2]=unidad&pagination[limit]=1000',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'servicios'
  });

  return result?.data || [];
};

export default useServicios;
