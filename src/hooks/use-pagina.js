import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const usePagina = async (slug) => {
  if (!slug) return null;

  // populate=all trae también new_menu_principal, new_menu_secundario y
  // menu_cajon con sus componentes anidados (Items/Links). Efecto secundario
  // aceptado: cada relación arrastra su propia relación inversa `paginas`
  // (shallow) — se ignora, no se usa en frontend.
  const result = await fetchFromStrapi({
    endpoint: `/api/paginas?filters[slug][$eq]=${slug}&populate=all&status=published`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `pagina ${slug}`
  });

  return result?.data?.[0] || null;
};

export default usePagina;
