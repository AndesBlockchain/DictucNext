import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useServicio = async (slug) => {
  if (!slug) return null;

  const params = [
    `filters[slug][$eq]=${slug}`,
    // Escalares directos
    'fields[0]=nombre', 'fields[1]=slug', 'fields[2]=utilidad',
    'fields[3]=experiencia', 'fields[4]=potenciales_clientes',
    'fields[5]=contenido', 'fields[6]=tabla_especificaciones',
    // Banner (imagen del encabezado)
    'populate[banner][fields][0]=url', 'populate[banner][fields][1]=formats',
    'populate[banner][fields][2]=width', 'populate[banner][fields][3]=height',
    // Imagen del cuerpo
    'populate[imagen][fields][0]=url', 'populate[imagen][fields][1]=formats',
    'populate[imagen][fields][2]=width', 'populate[imagen][fields][3]=height',
    // Tipo de servicio con su ícono
    'populate[tipo_de_servicio][fields][0]=nombre', 'populate[tipo_de_servicio][fields][1]=slug',
    'populate[tipo_de_servicio][populate][IconoFichaProducto][fields][0]=url',
    'populate[tipo_de_servicio][populate][IconoFichaProducto][fields][1]=formats',
    // Unidad ejecutora
    'populate[unidad][fields][0]=nombre', 'populate[unidad][fields][1]=CodigoSAPDictuc',
    // Sectores
    'populate[sectores_pais][fields][0]=nombre', 'populate[sectores_pais][fields][1]=slug',
  ].join('&');

  const result = await fetchFromStrapi({
    endpoint: `/api/servicios?${params}`,
    fallback: { data: [] },
    cache: CACHE_PRESETS.FREQUENT,
    errorContext: `servicio ${slug}`
  });

  return result?.data?.[0] || null;
};

export default useServicio;
