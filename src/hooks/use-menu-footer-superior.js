import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const CERTIFICACIONES = ['Certificacion1', 'Certificacion2', 'Certificacion3', 'Certificacion4'];

// Certificacion1-4 y EntidadRelacionada comparten la misma forma: Nombre/Link/ComoAbrir + Logotipo
const populateCertificacion = (campo) => [
  `populate[${campo}][fields][0]=Nombre`,
  `populate[${campo}][fields][1]=Link`,
  `populate[${campo}][fields][2]=ComoAbrir`,
  `populate[${campo}][populate][Logotipo][fields][0]=url`,
];

const QUERY = [
  'fields[0]=id',
  'populate[LogotipoIngUC][fields][0]=url',
  ...CERTIFICACIONES.flatMap(populateCertificacion),
  ...populateCertificacion('EntidadRelacionada'),
  'sort=publishedAt:desc',
  'pagination[limit]=1',
].join('&');

const useMenuFooterSuperior = async () => {
  const result = await fetchFromStrapi({
    endpoint: `/api/menu-footer-superiors?${QUERY}`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: 'menu footer superior'
  });

  return result?.data?.[0] || null;
};

export default useMenuFooterSuperior;
