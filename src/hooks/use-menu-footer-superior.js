import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

// Certificacion5 y Certificacion6 aún no existen en el content-type de Strapi (error 400 "Invalid key").
// Agregar 'Certificacion5' y 'Certificacion6' aquí en cuanto se creen esos campos en el backend.
const CERTIFICACIONES = ['Certificacion1', 'Certificacion2', 'Certificacion3', 'Certificacion4'];

// Certificacion1-4 (y a futuro 5-6) y EntidadRelacionada comparten la misma forma: Nombre/Link/ComoAbrir + Logotipo
const populateCertificacion = (campo) => [
  `populate[${campo}][fields][0]=Nombre`,
  `populate[${campo}][fields][1]=Link`,
  `populate[${campo}][fields][2]=ComoAbrir`,
  `populate[${campo}][populate][Logotipo][fields][0]=url`,
  `populate[${campo}][populate][Logotipo][fields][1]=width`,
  `populate[${campo}][populate][Logotipo][fields][2]=height`,
];

const QUERY = [
  'fields[0]=id',
  'populate[LogotipoIngUC][fields][0]=url',
  'populate[LogotipoIngUC][fields][1]=width',
  'populate[LogotipoIngUC][fields][2]=height',
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
