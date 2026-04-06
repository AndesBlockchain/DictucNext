# Guía Rápida: Migración de Hooks

## 🎯 Inicio Rápido

### 1. Migrar un Hook
```bash
./scripts/migrate-hook.sh use-menu-superior
```

### 2. Template Básico
```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useNombre = async () => {
  const query = buildStrapiQuery({
    populate: 'all',
    sort: 'campo:desc'
  });

  return fetchFromStrapi({
    endpoint: `/api/endpoint${query}`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [] },
    errorContext: 'nombre descriptivo'
  });
}

export default useNombre;
```

### 3. Template con Parámetro
```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useNombre = async (slug) => {
  if (!slug) return null;

  const query = buildStrapiQuery({
    filters: { slug: { $eq: slug } },
    populate: 'all'
  });

  return fetchFromStrapi({
    endpoint: `/api/endpoint${query}`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [] },
    errorContext: `nombre: ${slug}`,
    transform: (data) => data.data?.[0] || null
  });
}

export default useNombre;
```

---

## 🔧 Configuración de Cache

```javascript
CACHE_PRESETS.HOURLY    // 1 hora - Default para datos estables
CACHE_PRESETS.FREQUENT  // 5 minutos - Para noticias, datos dinámicos
CACHE_PRESETS.DAILY     // 1 día - Para menús, configuración
CACHE_PRESETS.NO_CACHE  // Sin cache - Para debugging
```

---

## 🔍 Construcción de Queries

### Populate
```javascript
populate: 'all'                              // Todo
populate: ['campo1', 'campo2']               // Campos específicos
populate: { relacion: 'campo' }              // Object notation
```

### Filtros
```javascript
filters: {
  slug: { $eq: 'valor' },                    // Igual
  titulo: { $containsi: 'busqueda' },        // Contiene (case-insensitive)
  fecha: { $gte: '2024-01-01' },             // Mayor o igual
  estado: { $in: ['activo', 'publicado'] },  // En lista
  $or: [                                      // OR
    { campo1: { $eq: 'valor1' } },
    { campo2: { $eq: 'valor2' } }
  ]
}
```

### Sort
```javascript
sort: 'fecha:desc'                           // Un campo
sort: ['fecha:desc', 'titulo:asc']           // Múltiples
```

### Paginación
```javascript
pagination: {
  page: 1,
  pageSize: 20
}
```

### Custom (parámetros fuera de Strapi filters)
```javascript
custom: {
  status: 'published',
  locale: 'es'
}
```

---

## 🧪 Testing

```bash
# 1. Hacer backup
mv src/hooks/use-nombre.js src/hooks/use-nombre-old.js

# 2. Crear nueva versión
# ... editar archivo ...

# 3. Probar
npm run dev

# 4. Si funciona, eliminar backup
rm src/hooks/use-nombre-old.js

# 5. Si falla, restaurar
mv src/hooks/use-nombre-old.js src/hooks/use-nombre.js
```

---

## 📋 Checklist Rápido

Por cada hook:
- [ ] Crear backup
- [ ] Copiar template apropiado
- [ ] Ajustar endpoint
- [ ] Configurar query (filters, populate, sort)
- [ ] Seleccionar preset de cache
- [ ] Agregar transform si es necesario
- [ ] Probar en desarrollo
- [ ] Verificar logs
- [ ] Eliminar backup

---

## 🎨 Ejemplos Reales

### Hook Simple (Menú)
```javascript
const useMenuSuperior = async () => {
  const query = buildStrapiQuery({
    sort: 'posicion:asc'
  });

  return fetchFromStrapi({
    endpoint: `/api/menu-superiors${query}`,
    cache: CACHE_PRESETS.DAILY,
    fallback: { data: [] },
    errorContext: 'menu superior'
  });
}
```

### Hook con Slug (Página)
```javascript
const usePagina = async (slug) => {
  if (!slug) return null;

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

### Hook con Filtros Complejos (Servicios por Sector)
```javascript
const useServiciosBySector = async (sectorSlug) => {
  if (!sectorSlug) return { data: [] };

  const query = buildStrapiQuery({
    filters: {
      sectores_pais: { slug: { $eq: sectorSlug } }
    },
    fields: ['nombre', 'slug', 'contenido'],
    populate: ['tipo_de_servicio', 'sectores_pais'],
    pagination: { limit: 1000 }
  });

  return fetchFromStrapi({
    endpoint: `/api/servicios${query}`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [] },
    errorContext: `servicios by sector: ${sectorSlug}`
  });
}
```

---

## 🚨 Errores Comunes

### "STRAPI_API_URL is not defined"
**Solución:** Verifica `.env.local` y Vercel

### Los datos no se actualizan
**Solución:** Usa `CACHE_PRESETS.NO_CACHE` temporalmente

### Hook retorna undefined
**Solución:** Verifica el `fallback` y `transform`

### Query no funciona
**Solución:** Revisa sintaxis de filtros en docs de Strapi v4

---

## 📚 Recursos

- **Plan completo:** `MIGRATION_PLAN.md`
- **Guía detallada:** `MIGRATION_GUIDE.md`
- **Ejemplo migrado:** `src/hooks/use-ultimas-noticias.js`
- **Utilidad:** `src/lib/strapi-fetcher.js`

---

## 🎯 Orden Recomendado de Migración

1. ✅ use-ultimas-noticias.js (COMPLETADO)
2. use-menu-superior.js
3. use-menu-footer.js
4. use-menu-footer-superior.js
5. use-sectores-pais.js
6. use-tipo-de-servicios.js
7. use-tipo-de-contacto.js
8. use-modals.js
9. use-pagina.js
10. use-servicio.js

**Tiempo estimado:** 1-2 horas por día durante 1 semana
