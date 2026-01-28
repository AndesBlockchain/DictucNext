# Guía de Migración: Hooks a Strapi Fetcher

Esta guía explica cómo migrar los hooks existentes a la nueva utilidad centralizada `strapi-fetcher`.

## Tabla de Contenidos
- [Beneficios](#beneficios)
- [Ejemplos de Migración](#ejemplos-de-migración)
- [API Reference](#api-reference)
- [Presets de Cache](#presets-de-cache)
- [Construcción de Queries](#construcción-de-queries)

---

## Beneficios

✅ **Código más limpio**: Menos repetición, más legible
✅ **Manejo de errores consistente**: Todos los hooks fallan de la misma manera
✅ **Configuración centralizada**: Cache, revalidación, y fallbacks en un solo lugar
✅ **Mejor logging**: Logs estructurados para debugging
✅ **Transformaciones**: Procesar datos antes de retornarlos
✅ **Type safety**: Preparado para TypeScript si decides migrarlo

---

## Ejemplos de Migración

### Ejemplo 1: Hook Simple (Noticias)

**❌ Antes:**
```javascript
const useUltimasNoticias = async () => {
  const baseUrl = process.env.STRAPI_API_URL;

  if (!baseUrl) {
    console.error('STRAPI_API_URL is not defined');
    return { data: [] };
  }

  const path = "/api/noticias?status=published&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6";

  try {
    const res = await fetch(baseUrl + path, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });

    if (!res.ok) {
      console.error("Failed to fetch ultimas noticias:", res.status);
      return { data: [] };
    }

    const data = await res.json();

    if (!data || !data.data) {
      console.warn('Invalid noticias data structure');
      return { data: [] };
    }

    return data;
  } catch (error) {
    console.error('Error fetching ultimas noticias:', error);
    return { data: [] };
  }
}
```

**✅ Después:**
```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useUltimasNoticias = async () => {
  const query = buildStrapiQuery({
    custom: { status: 'published' },
    sort: 'publishedAt:desc',
    pagination: { page: 1, pageSize: 6 }
  });

  return fetchFromStrapi({
    endpoint: `/api/noticias${query}`,
    cache: CACHE_PRESETS.FREQUENT,
    fallback: { data: [] },
    errorContext: 'ultimas noticias'
  });
}
```

**Reducción:** De ~40 líneas a ~15 líneas (62% menos código)

---

### Ejemplo 2: Hook con Transformación (Sectores)

**❌ Antes:**
```javascript
const useSectoresPais = async() => {
  const baseUrl = process.env.STRAPI_API_URL;

  if (!baseUrl) {
    console.error('STRAPI_API_URL is not defined');
    return { data: [], totalCount: 0 };
  }

  const path = "/api/sectores?populate=all";

  try {
    const res = await fetch(baseUrl + path, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });

    if (!res.ok) {
      console.error("Failed to fetch sectores pais:", res.status);
      return { data: [], totalCount: 0 };
    }

    const data = await res.json();

    if (!data || !data.data) {
      console.warn('Invalid sectores data structure');
      return { data: [], totalCount: 0 };
    }

    return {
      data: data.data,
      totalCount: data.data.length || 0
    };
  } catch (error) {
    console.error('Error fetching sectores pais:', error);
    return { data: [], totalCount: 0 };
  }
}
```

**✅ Después:**
```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useSectoresPais = async () => {
  const query = buildStrapiQuery({ populate: 'all' });

  return fetchFromStrapi({
    endpoint: `/api/sectores${query}`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [], totalCount: 0 },
    errorContext: 'sectores pais',
    transform: (data) => ({
      data: data.data || [],
      totalCount: data.data?.length || 0
    })
  });
}
```

---

### Ejemplo 3: Hook con Parámetro (Página por Slug)

**❌ Antes:**
```javascript
const usePagina = async (slug) => {
  const baseUrl = process.env.STRAPI_API_URL;

  if (!baseUrl) {
    throw new Error('STRAPI_API_URL environment variable is not defined');
  }

  const path = `/api/paginas?filters[slug][$eq]=${slug}&populate=all`;

  try {
    const res = await fetch(baseUrl + path, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch pagina ${slug} (Status: ${res.status})`);
    }

    const data = await res.json();

    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error('Error fetching pagina:', error);
    throw error;
  }
};
```

**✅ Después:**
```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const usePagina = async (slug) => {
  if (!slug) {
    console.error('usePagina: slug is required');
    return null;
  }

  const query = buildStrapiQuery({
    filters: { slug: { $eq: slug } },
    populate: 'all'
  });

  return fetchFromStrapi({
    endpoint: `/api/paginas${query}`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [] },
    errorContext: `pagina: ${slug}`,
    transform: (data) => data.data?.[0] || null
  });
}
```

---

## API Reference

### `fetchFromStrapi(options)`

Función principal para hacer fetches a Strapi.

**Parámetros:**

| Nombre | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `endpoint` | `string` | **required** | Endpoint de la API (ej: `/api/noticias`) |
| `cache` | `Object` | `CACHE_PRESETS.HOURLY` | Configuración de cache |
| `cache.revalidate` | `number` | `3600` | Segundos antes de revalidar |
| `cache.mode` | `string` | `'force-cache'` | Modo de cache Next.js |
| `fallback` | `any` | `{ data: [] }` | Valor por defecto si falla |
| `transform` | `Function` | `null` | Función para transformar respuesta |
| `errorContext` | `string` | `endpoint` | Contexto para logs de error |
| `throwOnError` | `boolean` | `false` | Si debe lanzar error o retornar fallback |

**Retorna:** `Promise<any>` - Datos de Strapi o fallback

---

### `buildStrapiQuery(params)`

Construye query strings para Strapi API v4.

**Parámetros:**

```javascript
buildStrapiQuery({
  // Filtros
  filters: {
    slug: { $eq: 'mi-slug' },
    titulo: { $containsi: 'búsqueda' },
    fecha: { $gte: '2024-01-01' }
  },

  // Populate (varias formas)
  populate: 'all',  // Todas las relaciones
  populate: '*',    // Alias de 'all'
  populate: ['campo1', 'campo2'],  // Array de campos
  populate: { relacion: 'campo' }, // Object

  // Ordenamiento
  sort: 'fecha:desc',  // Un campo
  sort: ['fecha:desc', 'titulo:asc'],  // Múltiples

  // Paginación
  pagination: {
    page: 1,
    pageSize: 20
  },

  // Campos específicos
  fields: ['titulo', 'slug', 'fecha'],

  // Parámetros custom (no soportados por Strapi filters)
  custom: {
    status: 'published',
    locale: 'es'
  }
})
```

**Retorna:** `string` - Query string (ej: `?filters[slug][$eq]=mi-slug&populate=all`)

---

## Presets de Cache

Configuraciones predefinidas para diferentes casos de uso:

```javascript
import { CACHE_PRESETS } from '@/lib/strapi-fetcher';

// Revalidar cada hora (default)
cache: CACHE_PRESETS.HOURLY

// Revalidar cada 5 minutos (datos que cambian frecuentemente)
cache: CACHE_PRESETS.FREQUENT

// Revalidar cada día
cache: CACHE_PRESETS.DAILY

// Sin cache (siempre fetch fresco)
cache: CACHE_PRESETS.NO_CACHE

// Cache indefinido (datos estáticos)
cache: CACHE_PRESETS.INFINITE

// Custom
cache: { revalidate: 1800, mode: 'force-cache' } // 30 minutos
```

---

## Construcción de Queries

### Operadores de Filtro Strapi v4

```javascript
filters: {
  // Igualdad
  campo: { $eq: 'valor' },

  // Desigualdad
  campo: { $ne: 'valor' },

  // Contiene (case-insensitive)
  campo: { $containsi: 'búsqueda' },

  // Comparación
  numero: { $gt: 100 },      // mayor que
  numero: { $gte: 100 },     // mayor o igual
  numero: { $lt: 100 },      // menor que
  numero: { $lte: 100 },     // menor o igual

  // Entre valores
  fecha: { $between: ['2024-01-01', '2024-12-31'] },

  // En lista
  estado: { $in: ['activo', 'pendiente'] },

  // NOT IN
  estado: { $notIn: ['eliminado', 'archivado'] },

  // Null
  campo: { $null: true },
  campo: { $notNull: true },

  // OR (debe estar en raíz de filters)
  $or: [
    { titulo: { $containsi: 'texto' } },
    { descripcion: { $containsi: 'texto' } }
  ],

  // AND (debe estar en raíz de filters)
  $and: [
    { estado: { $eq: 'activo' } },
    { fecha: { $gte: '2024-01-01' } }
  ]
}
```

---

## Patrón de Migración Recomendado

### Paso 1: Migrar hooks uno por uno
No migres todo de una vez. Migra y prueba cada hook individualmente.

### Paso 2: Mantén ambas versiones temporalmente
```javascript
// hooks/use-noticias.js (versión antigua)
// hooks/use-noticias-v2.js (versión nueva)
```

### Paso 3: Actualiza las importaciones gradualmente
```javascript
// Cambia de:
import useNoticias from '@/hooks/use-noticias'

// A:
import useNoticias from '@/hooks/use-noticias-v2'
```

### Paso 4: Una vez verificado, elimina la versión antigua
```bash
rm hooks/use-noticias.js
mv hooks/use-noticias-v2.js hooks/use-noticias.js
```

---

## Testing

Para probar los hooks migrados:

```javascript
// Ejemplo de prueba manual
const testHook = async () => {
  try {
    const result = await useUltimasNoticias();
    console.log('✅ Hook funciona:', result);
  } catch (error) {
    console.error('❌ Hook falló:', error);
  }
};
```

---

## Troubleshooting

### Error: "STRAPI_API_URL is not defined"
**Solución:** Verifica que la variable de entorno esté configurada en `.env.local` y Vercel.

### Los datos no se actualizan
**Solución:** Ajusta el `revalidate` o usa `CACHE_PRESETS.NO_CACHE` temporalmente para debugging.

### Transformación retorna undefined
**Solución:** Verifica que la función `transform` siempre retorne un valor, incluso con datos vacíos.

---

## Próximos Pasos

1. ✅ Crear la utilidad `strapi-fetcher.js`
2. ✅ Crear ejemplos de hooks migrados
3. 🔄 Migrar hooks existentes gradualmente
4. 📝 Agregar tests (opcional)
5. 🎯 Considerar migrar a TypeScript para type safety

---

**¿Preguntas?** Consulta los ejemplos en `src/hooks/*-v2.js`
