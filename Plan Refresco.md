# Plan Refresco — Mejorar velocidad de refresco de contenido sin sacrificar performance

> **Propósito de este documento:** servir de input autónomo para una sesión de implementación (posiblemente con otro modelo/agente). Contiene todo el contexto necesario; no asumas conocimiento previo de la conversación que lo originó.

## Contexto del proyecto

Frontend Next.js 16 (App Router) para DICTUC que consume un CMS Strapi (`STRAPI_API_URL`, local en `http://127.0.0.1:1337`). El sitio es casi 100% estático:

- Las páginas declaran `export const revalidate = false` (en `src/app/(pages)/page.js`, `[seccion]/[...slug]/page.js`, `novedades/[seccion]/[slug]/page.js`, `servicios/[slug]/page.js`, `sectores-pais/[slug]/page.js`, `tipos-de-servicio/[slug]/page.js`, `ejecutor/[slug]/page.js`, `paginas/page.js`).
- Todos los fetch a Strapi pasan por `fetchFromStrapi()` en `src/lib/strapi-fetcher.js`, que usa `next: { revalidate: 3600 }` por defecto (preset `CACHE_PRESETS.FREQUENT` = 3600s, pese a su nombre).
- La frescura depende de un webhook de Strapi que llama a `POST /api/revalidate` (`src/app/api/revalidate/route.js`), autenticado con `Authorization: Bearer <REVALIDATION_SECRET>` (env var `REVALIDATION_SECRET`).

**Problema:** los cambios hechos en Strapi tardan demasiado en reflejarse en el sitio. Causas identificadas:

1. El webhook solo mapea 6 modelos (`servicio`, `pagina`, `sector-pais`, `tipo-de-servicio`, `unidad`, `noticia`); todo lo demás (menús, carruseles, documentos, redirecciones, etc.) cae al caso `default` que solo revalida `/`. Además no está verificado que el webhook esté configurado en Strapi para todos los content types.
2. La invalidación es por path (`revalidatePath(path, "layout")`); el caso `pagina` y el `default` purgan `/` con scope `layout`, lo que invalida el sitio completo (costoso) pero solo precalienta `/` (la primera visita a cualquier otra ruta paga la regeneración).
3. Si el webhook falla o el modelo no está mapeado, el único fallback es el `revalidate: 3600` de los fetch: hasta 1 hora de contenido viejo.

**Restricción clave:** no degradar el performance actual. El sitio debe seguir sirviendo páginas estáticas cacheadas; toda regeneración debe ser en segundo plano (stale-while-revalidate) u on-demand vía webhook.

---

## Fase 1 — Auditar y completar la cobertura del webhook en Strapi

*(No requiere cambios de código en el frontend, salvo logging opcional.)*

### 1.1 Verificar configuración del webhook en Strapi

En el admin de Strapi (**Settings → Webhooks**):

- Debe existir un webhook apuntando a `https://<dominio-frontend>/api/revalidate` con header `Authorization: Bearer <REVALIDATION_SECRET>` (mismo valor que la env var del frontend).
- Eventos habilitados: `entry.publish`, `entry.unpublish`, `entry.update`, `entry.delete` (y `entry.create` si se publican al crear). **Nota:** para content types con Draft & Publish activado, `entry.update` sobre borradores no debe importar; lo relevante es publish/unpublish. Si el content type NO usa Draft & Publish, `entry.update` y `entry.create` sí son necesarios.
- El webhook nativo de Strapi envía un body con `{ event, model, entry: {...} }` — el route handler actual ya lee `body.model` y `body.entry.slug`.

### 1.2 Inventario de content types que alimentan el frontend

Estos son los endpoints que el frontend consume (extraídos del código; el webhook debe cubrir sus content types):

| Endpoint Strapi | Content type (uid probable) | Usado en |
|---|---|---|
| `/api/noticias` | `noticia` | novedades, home, hooks de noticias |
| `/api/servicios` | `servicio` | servicios/[slug], buscador, sitemap |
| `/api/paginas` | `pagina` | [seccion]/[...slug] (páginas CMS) |
| `/api/sectores` | `sector-pais` (⚠️ nombre de modelo ≠ endpoint) | sectores-pais/[slug] |
| `/api/tipo-de-servicios` | `tipo-de-servicio` | tipos-de-servicio/[slug] |
| `/api/unidades` | `unidad` | ejecutor/[slug] |
| `/api/carruseles` | `carrusel` | Carrusel (home) y modales (`use-modals.js`) |
| `/api/menu-superiors` | `menu-superior` | header, todas las páginas |
| `/api/menu-secundarios` | `menu-secundario` | header, todas las páginas |
| `/api/menu-cajons` | `menu-cajon` | header, todas las páginas |
| `/api/menu-footers` | `menu-footer` | footer |
| `/api/menu-footer-superiors` | `menu-footer-superior` | footer |
| `/api/documentos` | `documento` | bloques de documentos |
| `/api/tipos-de-contactos` | `tipo-de-contacto` | formulario de cotización |
| `/api/agente` | `agente` (single type) | config del agente |
| `/api/redirecciones` | `redireccion` | `src/middleware.js` (cache propio de 60s — no necesita webhook) |

**Acción:** confirmar en Strapi que el webhook dispara para TODOS estos content types (los webhooks de Strapi son globales por defecto, pero verificar que no haya filtros). Confirmar los uid reales de los modelos (columna 2 es inferencia; verificar contra el payload real del webhook o el schema de Strapi).

### 1.3 Prueba end-to-end y logging

- Probar manualmente: `curl -X POST https://<frontend>/api/revalidate -H "Authorization: Bearer $REVALIDATION_SECRET" -H "Content-Type: application/json" -d '{"model":"noticia","entry":{"slug":"test"}}'` → debe responder `{ revalidated: true, ... }`.
- Publicar un cambio real en Strapi y verificar en los logs del frontend que llegó el webhook (el route ya hace `console.error` en fallos; agregar un `console.log` de éxito con `model` y `paths`/`tags` es recomendable para diagnóstico).
- En Strapi, la pantalla del webhook muestra el historial de disparos y códigos de respuesta — revisar que no haya 401 (secret desalineado) ni timeouts.

---

## Fase 2 — Migrar de `revalidatePath` a cache tags (`revalidateTag`)

Objetivo: invalidación granular. Cuando cambia una noticia se invalidan exactamente los fetch de noticias (y las rutas que los usan), sin purgar el sitio completo.

### 2.1 Etiquetar los fetch en `src/lib/strapi-fetcher.js`

Modificar `fetchFromStrapi` para derivar automáticamente un tag desde el endpoint — así **no hay que tocar los ~40 call sites**:

```js
// Derivar tag desde el endpoint: '/api/noticias?...' → 'strapi-noticias'
function tagFromEndpoint(endpoint) {
  const match = endpoint.match(/^\/api\/([^/?]+)/);
  return match ? `strapi-${match[1]}` : "strapi";
}

// En fetchFromStrapi, dentro de fetchOptions (rama force-cache):
const fetchOptions = cache.mode === "no-store"
  ? { cache: "no-store" }
  : {
      next: {
        revalidate: cache.revalidate ?? 3600,
        tags: [tagFromEndpoint(endpoint), ...(cache.tags ?? [])],
      },
    };
```

- Aceptar `cache.tags` opcional para tags extra por call site (no es necesario usarlo de inmediato).
- Los fetch que NO pasan por `fetchFromStrapi` (si los hay) deben etiquetarse a mano — verificar con `grep -rn "fetch(" src/ --include="*.js"` que no queden fetch a Strapi sin tag. El fetch de `src/middleware.js` (redirecciones) queda fuera: el middleware tiene su propio cache in-memory de 60s y es suficiente.

### 2.2 Reescribir `src/app/api/revalidate/route.js` para usar tags

Reemplazar la lógica de `getPathsForModel` + `revalidatePath` por un mapa modelo→tags + `revalidateTag`:

```js
import { revalidateTag } from "next/cache";

// El modelo de Strapi (singular) no siempre coincide con el endpoint (plural).
// Verificar los uid reales contra el payload del webhook (Fase 1.2).
const MODEL_TO_TAGS = {
  "noticia": ["strapi-noticias"],
  "servicio": ["strapi-servicios"],
  "pagina": ["strapi-paginas"],
  "sector-pais": ["strapi-sectores"],
  "tipo-de-servicio": ["strapi-tipo-de-servicios"],
  "unidad": ["strapi-unidades"],
  "carrusel": ["strapi-carruseles"],
  "menu-superior": ["strapi-menu-superiors"],
  "menu-secundario": ["strapi-menu-secundarios"],
  "menu-cajon": ["strapi-menu-cajons"],
  "menu-footer": ["strapi-menu-footers"],
  "menu-footer-superior": ["strapi-menu-footer-superiors"],
  "documento": ["strapi-documentos"],
  "tipo-de-contacto": ["strapi-tipos-de-contactos"],
  "agente": ["strapi-agente"],
};

// Fallback si llega un modelo no mapeado: invalidar todo lo de Strapi.
// Requiere agregar un tag global 'strapi' a todos los fetch (ver 2.1,
// incluir siempre 'strapi' en el array de tags) — o mantener
// revalidatePath('/', 'layout') como fallback. Preferir el tag global.
```

Comportamiento del handler:

1. Autenticación igual que hoy (Bearer + `REVALIDATION_SECRET`).
2. Si `body.model` existe → `revalidateTag(tag)` para cada tag mapeado; si el modelo no está en el mapa → `revalidateTag('strapi')` (tag global) y loggear el modelo desconocido para agregarlo al mapa.
3. Mantener compatibilidad con el formato legado `{ "path": "/ruta" }` → `revalidatePath(path)`.
4. **Mantener el warming** (ver 2.3).
5. Responder `{ revalidated: true, tags: [...], model, timestamp }`.

Notas técnicas importantes para el implementador:

- `revalidateTag` invalida las entradas del Data Cache con ese tag Y el Full Route Cache de toda ruta que usó esos fetch. Las páginas con `revalidate = false` se regeneran en la siguiente visita — el comportamiento estático se conserva.
- La primera visita tras la invalidación regenera la página on-demand (el visitante puede recibir la versión stale mientras se regenera, según la versión de Next; verificar comportamiento). Por eso el warming importa.
- No eliminar `export const revalidate = false` de las páginas.

### 2.3 Warming dirigido (corrige el hueco actual)

Hoy `warmPath()` solo precalienta los paths purgados, y para `pagina` solo `/`. Mejorar:

- Construir la lista de paths a precalentar según el modelo y el `entry` del webhook:
  - `noticia` con slug → `/novedades/<seccion>/<slug>` si la sección viene en el entry (verificar shape del payload; si no viene, precalentar `/novedades` y `/`).
  - `servicio` con slug → `/servicios/<slug>`, `/servicios/todos-los-servicios`.
  - `pagina` con slug → la ruta real de la página. Las páginas CMS viven bajo `[seccion]/[...slug]`; revisar `src/hooks/use-pagina-v2.js` y el page component para deducir cómo se compone la URL desde el entry (probablemente el entry tenga campos `seccion`/`slug`).
  - `sector-pais` → `/sectores-pais/<slug>`; `tipo-de-servicio` → `/tipos-de-servicio/<slug>`; `unidad` → `/ejecutor/<slug>`.
  - Menús/carrusel/footer → precalentar `/` (aparecen en todas las páginas; el resto se regenera on-demand).
- Mantener el patrón fire-and-forget actual (no bloquear la respuesta al webhook).
- El warming debe ejecutarse DESPUÉS de `revalidateTag`. Ojo: `revalidateTag`/`revalidatePath` marcan como stale; el fetch de warming dispara la regeneración.

### 2.4 Limpieza

- Eliminar `getPathsForModel` si queda sin uso.
- Hay archivos legacy que no deben tocarse ni usarse como referencia: `src/hooks/use-pagina copy.js`, `src/components/carrusel/Carrusel.backup2.js`, `src/hooks/use-sectores-pais.new.js` (verificar cuál versión está en uso antes de asumir).

---

## Fase 3 — Red de seguridad: bajar el `revalidate` de los fetch

Con ISR, bajar el intervalo NO degrada el tiempo de respuesta al usuario (sirve stale y regenera en background); solo agrega carga a Strapi. Es el seguro para cuando un webhook falle o un modelo no esté mapeado.

En `src/lib/strapi-fetcher.js`, ajustar `CACHE_PRESETS`:

```js
export const CACHE_PRESETS = {
  HOURLY: { revalidate: 3600, mode: "force-cache" },
  FREQUENT: { revalidate: 300, mode: "force-cache" }, // antes 3600 — ahora sí es "frecuente"
  DAILY: { revalidate: 86400, mode: "force-cache" },
  NO_CACHE: { revalidate: 0, mode: "no-store" },
  INFINITE: { mode: "force-cache" },
};
```

- El default de `fetchFromStrapi` (`cache.revalidate ?? 3600`) puede quedarse en 3600: los call sites críticos ya usan `FREQUENT`.
- **No** bajar a menos de 300s: con ~40 tipos de fetch, intervalos muy cortos multiplican la carga sobre Strapi sin beneficio real (el camino rápido de frescura es el webhook, no el polling).
- Revisar que Strapi soporte la carga: los fetch se regeneran escalonadamente, no en ráfaga, así que 300s es seguro para un CMS local/pequeño.

---

## Orden de implementación y verificación

1. **Fase 1** primero (es diagnóstico y config de Strapi; puede revelar que el problema principal era un webhook mal configurado).
2. **Fase 2** después (cambio de código principal). Commit separado.
3. **Fase 3** al final (una línea). Commit separado o junto a Fase 2.

### Checklist de verificación final

- [ ] `npm run build` pasa sin errores.
- [ ] `npm run lint` pasa.
- [ ] `curl` manual al webhook con cada modelo del mapa responde `revalidated: true` con los tags correctos.
- [ ] Prueba end-to-end: editar y publicar una noticia en Strapi → el cambio se ve en `/novedades` y en la home en segundos (no minutos).
- [ ] Prueba end-to-end con un menú: cambiar un ítem del menú superior → se refleja tras el webhook.
- [ ] Prueba de modelo no mapeado: enviar `{"model":"inventado"}` → cae al tag global `strapi` y queda loggeado.
- [ ] Verificar que la home y páginas de servicios siguen sirviéndose estáticas (header `x-nextjs-cache: HIT` o equivalente en la versión de Next usada) — el performance no debe cambiar.
- [ ] `REVALIDATION_SECRET` presente en el entorno de producción del frontend y alineado con el header del webhook en Strapi.

### Fuera de alcance (no hacer)

- No tocar `src/middleware.js` (las redirecciones ya refrescan cada 60s).
- No cambiar `export const revalidate = false` de las páginas.
- No modificar la configuración de imágenes ni Sentry en `next.config.mjs`.
- No introducir `experimental.staleTimes` ni cambios de CDN (estrategias válidas pero fuera de este plan).
