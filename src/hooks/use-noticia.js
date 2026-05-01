import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useNoticia = async (slug) => {
  if (!slug) return null;

  const result = await fetchFromStrapi({
    endpoint: `/api/noticias?filters[slug][$eq]=${slug}&status=published&populate[foto][fields][0]=url&populate[foto][fields][1]=width&populate[foto][fields][2]=height&populate[foto][fields][3]=formats&populate[foto][fields][4]=alternativeText&populate[galeria][fields][0]=url&populate[etiqueta_noticias][populate][Banner][fields][0]=url`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `noticia ${slug}`
  });

  return result?.data?.[0] || null;
}

export default useNoticia;
