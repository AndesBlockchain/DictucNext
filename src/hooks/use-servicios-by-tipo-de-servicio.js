import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useServiciosByTipoDeServicio = async (tipoSlug) => {
  if (!tipoSlug) return [];

  const result = await fetchFromStrapi({
    endpoint: `/api/servicios?filters[tipo_de_servicio][slug][$eq]=${tipoSlug}&fields[0]=nombre&fields[1]=slug&fields[2]=contenido&pagination[limit]=1000&populate[0]=tipo_de_servicio&populate[1]=sectores_pais&populate[2]=unidad`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `servicios by tipo ${tipoSlug}`
  });

  return result?.data || [];
};

export default useServiciosByTipoDeServicio;
