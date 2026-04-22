import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useServiciosBySector = async (sectorSlug) => {
  if (!sectorSlug) return [];

  const result = await fetchFromStrapi({
    endpoint: `/api/servicios?filters[sectores_pais][slug][$eq]=${sectorSlug}&fields[0]=nombre&fields[1]=slug&fields[2]=contenido&pagination[limit]=1000&populate[0]=tipo_de_servicio&populate[1]=sectores_pais&populate[2]=unidad`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `servicios by sector ${sectorSlug}`
  });

  return result?.data || [];
};

export default useServiciosBySector;
