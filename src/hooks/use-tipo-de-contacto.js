import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useTipoDeContacto = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/tipos-de-contactos',
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'tipos de contacto'
  });

  return result?.data || [];
};

export default useTipoDeContacto;
