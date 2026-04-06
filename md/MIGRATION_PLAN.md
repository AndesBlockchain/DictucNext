# Plan de Migración de Hooks a Strapi Fetcher

## 📊 Estado Actual

**Total de hooks:** 24
**Migrados:** 1 (use-ultimas-noticias.js) ✅
**Pendientes:** 23

---

## 🔍 Análisis de Hooks

### Categoría A: Legacy Gatsby (No Migrar) 🚫
Estos hooks usan `useStaticQuery` y `graphql` de Gatsby. No se usan en Next.js.

- ❌ `use-agente-config.js`
- ❌ `use-home-noticias.js`
- ❌ `use-noticias-por-agno.js`
- ❌ `use-noticias.js`
- ❌ `use-paginas.js`
- ❌ `use-servicios-by-tipo-and-sector.js`

**Acción:** Eliminar estos archivos (no se usan)

---

### Categoría B: Hooks Simples (Fácil) ⭐
Sin parámetros, endpoint directo, sin transformación compleja.

1. ✅ **use-ultimas-noticias.js** - COMPLETADO
2. 🔵 **use-modals.js** - `/api/carruseles`
3. 🔵 **use-menu-superior.js** - `/api/menu-superiors?sort=posicion`
4. 🔵 **use-menu-footer.js** - `/api/menu-footers?sort=sortOrder:asc&populate=*`
5. 🔵 **use-menu-footer-superior.js** - `/api/menu-footer-superiors?populate=all`
6. 🔵 **use-sectores-pais.js** - `/api/sectores?populate=all`
7. 🔵 **use-tipo-de-servicios.js** - `/api/tipo-de-servicios?populate=all`
8. 🔵 **use-tipo-de-contacto.js** - `/api/tipos-de-contactos`

**Prioridad:** Alta
**Tiempo estimado:** 2-3 horas
**Complejidad:** Baja

---

### Categoría C: Hooks con Parámetros (Media) ⭐⭐
Reciben parámetros (slug, id, etc.) y filtran resultados.

9. 🟡 **use-pagina.js** - Filtra por slug
10. 🟡 **use-servicio.js** - Filtra por slug
11. 🟡 **use-sector-by-slug.js** - Filtra por slug
12. 🟡 **use-tipo-de-servicio-by-slug.js** - Filtra por slug
13. 🟡 **use-noticias-by-tag.js** - Filtra por tag
14. 🟡 **use-menu-secundario.js** - Parámetro opcional

**Prioridad:** Alta
**Tiempo estimado:** 3-4 horas
**Complejidad:** Media

---

### Categoría D: Hooks con Filtros Complejos (Alta) ⭐⭐⭐
Múltiples parámetros, filtros anidados, o lógica compleja.

15. 🟠 **use-servicios-by-sector.js** - Filtro por sector + populate múltiple
16. 🟠 **use-servicios-by-tipo-de-servicio.js** - Filtro por tipo de servicio
17. 🟠 **use-servicios.js** - Endpoint complejo

**Prioridad:** Media
**Tiempo estimado:** 2-3 horas
**Complejidad:** Alta

---

### Categoría E: Hooks Especiales (Revisar) 🔴
Requieren análisis especial o tienen comportamiento único.

18. 🔴 **use-rutificador.js** - POST request (no GET)
19. 🔴 **use-site-metadata.js** - Metadata del sitio

**Prioridad:** Baja
**Tiempo estimado:** 1-2 horas
**Complejidad:** Variable

---

## 📅 Plan de Migración por Fases

### 🎯 Fase 1: Quick Wins (Día 1-2)
**Objetivo:** Migrar hooks simples y de uso frecuente

#### Sprint 1.1: Menús y Navegación (2 horas)
- [ ] use-menu-superior.js
- [ ] use-menu-footer.js
- [ ] use-menu-footer-superior.js

**Impacto:** Alto (se usan en todas las páginas)
**Riesgo:** Bajo

#### Sprint 1.2: Datos Maestros (2 horas)
- [ ] use-sectores-pais.js
- [ ] use-tipo-de-servicios.js
- [ ] use-tipo-de-contacto.js
- [ ] use-modals.js

**Impacto:** Alto (se usan en múltiples páginas)
**Riesgo:** Bajo

**Checkpoint:** Probar todas las páginas principales

---

### 🎯 Fase 2: Páginas Dinámicas (Día 3-4)
**Objetivo:** Migrar hooks que reciben parámetros

#### Sprint 2.1: Páginas y Sectores (2 horas)
- [ ] use-pagina.js
- [ ] use-sector-by-slug.js
- [ ] use-tipo-de-servicio-by-slug.js

**Impacto:** Alto (páginas dinámicas)
**Riesgo:** Medio

#### Sprint 2.2: Servicios (2 horas)
- [ ] use-servicio.js
- [ ] use-noticias-by-tag.js
- [ ] use-menu-secundario.js

**Impacto:** Alto (funcionalidad core)
**Riesgo:** Medio

**Checkpoint:** Probar navegación de servicios y noticias

---

### 🎯 Fase 3: Filtros y Búsqueda (Día 5)
**Objetivo:** Migrar hooks con filtros complejos

#### Sprint 3.1: Servicios Filtrados (3 horas)
- [ ] use-servicios-by-sector.js
- [ ] use-servicios-by-tipo-de-servicio.js
- [ ] use-servicios.js

**Impacto:** Medio (funcionalidad avanzada)
**Riesgo:** Alto

**Checkpoint:** Probar filtros de servicios

---

### 🎯 Fase 4: Casos Especiales (Día 6)
**Objetivo:** Migrar hooks con comportamiento especial

#### Sprint 4.1: Utilidades (2 horas)
- [ ] use-rutificador.js (requiere POST)
- [ ] use-site-metadata.js (revisar si se usa)

**Impacto:** Bajo
**Riesgo:** Medio

---

### 🎯 Fase 5: Cleanup (Día 7)
**Objetivo:** Limpiar archivos legacy y documentar

#### Sprint 5.1: Eliminación de Legacy (1 hora)
- [ ] Eliminar hooks Gatsby no usados
- [ ] Eliminar archivos `*-v2.js` de ejemplo
- [ ] Eliminar archivos `*copy.js`

#### Sprint 5.2: Documentación (1 hora)
- [ ] Actualizar README si es necesario
- [ ] Verificar imports en todos los componentes
- [ ] Test de regresión completo

---

## 📝 Template de Migración

### Para Hooks Simples (Categoría B)

```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * [Descripción del hook]
 */
const useNombreHook = async () => {
  const query = buildStrapiQuery({
    // populate, sort, etc.
  });

  return fetchFromStrapi({
    endpoint: `/api/endpoint${query}`,
    cache: CACHE_PRESETS.HOURLY, // Ajustar según necesidad
    fallback: { data: [] },
    errorContext: 'descripción'
  });
}

export default useNombreHook;
```

### Para Hooks con Parámetros (Categoría C)

```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

/**
 * [Descripción del hook]
 * @param {string} parametro - Descripción
 */
const useNombreHook = async (parametro) => {
  // Validar parámetro
  if (!parametro) {
    console.error('useNombreHook: parametro is required');
    return null;
  }

  const query = buildStrapiQuery({
    filters: { campo: { $eq: parametro } },
    populate: 'all'
  });

  return fetchFromStrapi({
    endpoint: `/api/endpoint${query}`,
    cache: CACHE_PRESETS.HOURLY,
    fallback: { data: [] },
    errorContext: `nombre: ${parametro}`,
    transform: (data) => data.data?.[0] || null // Si retorna un solo item
  });
}

export default useNombreHook;
```

### Para Hooks con POST (use-rutificador)

```javascript
import { fetchFromStrapi, CACHE_PRESETS } from '@/lib/strapi-fetcher';

const useRutificador = async (rut) => {
  if (!rut) return null;

  const baseUrl = process.env.STRAPI_API_URL;

  if (!baseUrl) {
    console.error('STRAPI_API_URL is not defined');
    return null;
  }

  try {
    const res = await fetch(baseUrl + '/api/rutificador', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rut }),
      cache: 'no-store' // POST requests no se cachean
    });

    if (!res.ok) {
      console.error('Failed to fetch rutificador:', res.status);
      return null;
    }

    const data = await res.json();
    return data.data?.message || null;
  } catch (error) {
    console.error('Error fetching rutificador:', error);
    return null;
  }
}

export default useRutificador;
```

---

## ✅ Checklist por Hook

Para cada hook que migres:

- [ ] Crear backup (`mv hook.js hook-old.js`)
- [ ] Escribir nueva versión con strapi-fetcher
- [ ] Verificar imports en componentes
- [ ] Probar en desarrollo
- [ ] Verificar logs en consola
- [ ] Confirmar que los datos se muestran correctamente
- [ ] Eliminar backup si todo funciona

---

## 🧪 Testing por Fase

### Fase 1: Menús
- [ ] Navegar por todas las páginas
- [ ] Verificar que los menús se muestran
- [ ] Probar links del footer

### Fase 2: Páginas Dinámicas
- [ ] Abrir varias páginas dinámicas
- [ ] Verificar breadcrumbs
- [ ] Probar navegación entre páginas

### Fase 3: Filtros
- [ ] Usar filtros de servicios
- [ ] Probar diferentes combinaciones
- [ ] Verificar resultados de búsqueda

### Fase 4: Utilidades
- [ ] Probar formulario de contacto (RUT)
- [ ] Verificar metadata del sitio

---

## 📊 Métricas de Progreso

### Por Categoría
- [ ] Categoría A: 6 hooks → **Eliminar** (0% código migrado)
- [ ] Categoría B: 8 hooks → **Migrar** (1/8 = 12.5% completado)
- [ ] Categoría C: 6 hooks → **Migrar** (0/6 = 0% completado)
- [ ] Categoría D: 3 hooks → **Migrar** (0/3 = 0% completado)
- [ ] Categoría E: 2 hooks → **Revisar** (0/2 = 0% completado)

### Total
**Progreso:** 1/24 = 4.2% completado

---

## 🎯 Objetivos de Éxito

Al completar la migración:

✅ **Código:** 65% menos líneas de código
✅ **Consistencia:** 100% de hooks usan la misma utilidad
✅ **Logs:** Todos los hooks tienen logs estructurados
✅ **Cache:** Configuración centralizada y documentada
✅ **Mantenibilidad:** Cambios futuros requieren editar 1 archivo en vez de 24
✅ **Tests:** Todos los hooks probados en desarrollo

---

## 🚀 Inicio Rápido

### Hoy: Migrar Menús (Sprint 1.1)

```bash
# 1. Menu Superior
code src/hooks/use-menu-superior.js

# 2. Menu Footer
code src/hooks/use-menu-footer.js

# 3. Menu Footer Superior
code src/hooks/use-menu-footer-superior.js

# 4. Probar
npm run dev
```

**Tiempo estimado:** 2 horas
**Impacto:** Inmediato (se verá en todas las páginas)

---

## 💡 Tips para Migración Eficiente

1. **Migra en grupos pequeños** (2-3 hooks a la vez)
2. **Prueba inmediatamente** después de cada grupo
3. **Mantén backups** hasta confirmar que funciona
4. **Copia el patrón** de use-ultimas-noticias-v2.js
5. **Ajusta el cache** según la frecuencia de actualización
6. **Usa transform** solo cuando sea necesario
7. **Documenta casos especiales** en comentarios

---

## 🆘 Rollback Plan

Si algo sale mal:

```bash
# Restaurar un hook
mv src/hooks/use-nombre-old.js src/hooks/use-nombre.js

# Restaurar todos los hooks
git checkout src/hooks/

# Verificar que la app funciona
npm run dev
```

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa `MIGRATION_GUIDE.md` para ejemplos
2. Compara con `use-ultimas-noticias.js` (ya migrado)
3. Revisa logs en la consola del navegador
4. Verifica que STRAPI_API_URL esté configurada

---

**¿Listo para empezar?** Comienza con Sprint 1.1 (Menús) 🚀
