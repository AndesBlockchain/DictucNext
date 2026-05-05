import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useAgenteConfig = async () => {
  const result = await fetchFromStrapi({
    endpoint: '/api/agente?fields[0]=Activado&fields[1]=TextoExplicativo',
    fallback: { data: null },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'agente config'
  });

  return result?.data || null;
};

export default useAgenteConfig;
