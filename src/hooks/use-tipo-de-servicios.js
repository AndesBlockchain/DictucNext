import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useTipoDeServicio = async () => {
  return fetchFromStrapi({
    endpoint: '/api/tipo-de-servicios?populate=all',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'tipos de servicio'
  });
};

export default useTipoDeServicio;
