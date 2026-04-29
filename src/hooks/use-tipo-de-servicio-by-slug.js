import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useTipoDeServicioBySlug = async (slug) => {
  if (!slug) return null;

  const result = await fetchFromStrapi({
    endpoint: `/api/tipo-de-servicios?filters[slug][$eq]=${slug}&populate[0]=Icono&populate[1]=BannerBuscadorServicios`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `tipo de servicio ${slug}`
  });

  return result?.data?.[0] || null;
};

export default useTipoDeServicioBySlug;
