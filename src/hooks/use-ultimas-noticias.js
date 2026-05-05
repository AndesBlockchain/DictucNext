import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useUltimasNoticias = async () => {
  return fetchFromStrapi({
    endpoint: '/api/noticias?status=published&sort=fecha:desc&pagination[page]=1&pagination[pageSize]=6&fields[0]=titulo&fields[1]=slug&fields[2]=fecha&fields[3]=cuerpo&fields[4]=url_foto&populate[foto][fields][0]=url&populate[foto][fields][1]=formats&populate[foto][fields][2]=width&populate[foto][fields][3]=height&populate[foto][fields][4]=alternativeText',
    cache: CACHE_PRESETS.FREQUENT,
    fallback: { data: [] },
    errorContext: 'ultimas noticias'
  });
}

export default useUltimasNoticias;
