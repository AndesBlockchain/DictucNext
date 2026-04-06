# Plan de Corrección: Componente Carrusel

**Fecha:** 2026-01-29
**Componentes afectados:** `Carrusel.js`, `CarruselClient.js`
**Tiempo estimado total:** 2-3 horas

---

## 🎯 Objetivos

Resolver 7 problemas identificados en el componente Carrusel:
- 🔴 3 Críticos (afectan funcionalidad/performance)
- 🟡 4 Importantes (afectan UX/mantenibilidad)

---

## 📋 Plan de Ejecución

### Fase 1: Problemas Críticos (1.5 horas)

#### ✅ Tarea 1.1: Migrar a strapi-fetcher y Agregar Manejo de Errores
**Archivo:** `src/components/carrusel/Carrusel.js`
**Tiempo:** 30 minutos
**Prioridad:** 🔴 CRÍTICA

**Problema actual:**
```javascript
async function getCarrusel() {
  const baseUrl = process.env.STRAPI_API_URL;
  const path = "/api/carruseles?populate=*";
  const res = await fetch(baseUrl + path, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch carruseles");
  const data = await res.json();
  console.log(data.data[0].Imagen);
  return data;
}
```

**Solución:**
```javascript
import { fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS } from '@/lib/strapi-fetcher';

async function getCarrusel() {
  const query = buildStrapiQuery({
    populate: '*'
  });

  return fetchFromStrapi({
    endpoint: `/api/carruseles${query}`,
    cache: CACHE_PRESETS.HOURLY, // Cache 1 hora
    fallback: { data: [] }, // Fallback seguro si falla
    errorContext: 'carrusel home'
  });
}
```

**Beneficios:**
- ✅ Manejo de errores automático
- ✅ Cache configurado correctamente
- ✅ Logs estructurados
- ✅ Fallback seguro (retorna array vacío)
- ✅ Elimina console.log olvidado

---

#### ✅ Tarea 1.2: Fortalecer Validación de Datos
**Archivo:** `src/components/carrusel/Carrusel.js`
**Tiempo:** 30 minutos
**Prioridad:** 🔴 CRÍTICA

**Problema actual:**
```javascript
const carruselData = carruselFetch.data.map(item => {
  const imagen = item.Imagen && item.Imagen[0] ? item.Imagen[0] : (item.Imagen || {});
  return {
    fraseSuperior: item.FraseSuperior || "",
    fraseInferior: item.FraseInferior || "",
    frasesVisibles: !item.OcultarFrases,
    imagen: imagen,
    url: imagen.url || "",
    alto: imagen.height || 0,
    ancho: imagen.width || 0,
  };
});
```

**Solución:**
```javascript
const Carrusel = async () => {
  const carruselFetch = await getCarrusel();

  // Validar que hay datos
  if (!carruselFetch?.data || !Array.isArray(carruselFetch.data) || carruselFetch.data.length === 0) {
    console.warn('[Carrusel] No hay datos para mostrar');
    return null; // O un placeholder
  }

  // Filtrar items válidos (que tengan imagen)
  const carruselData = carruselFetch.data
    .filter(item => {
      const hasImage = item.Imagen && (Array.isArray(item.Imagen) ? item.Imagen.length > 0 : item.Imagen.url);
      if (!hasImage) {
        console.warn('[Carrusel] Item sin imagen válida:', item);
      }
      return hasImage;
    })
    .map(item => {
      const imagen = Array.isArray(item.Imagen) && item.Imagen[0] ? item.Imagen[0] : item.Imagen;

      return {
        fraseSuperior: item.FraseSuperior || "",
        fraseInferior: item.FraseInferior || "",
        frasesVisibles: !item.OcultarFrases,
        imagen: imagen
        // Eliminar url, alto, ancho (no se usan)
      };
    });

  // Si después de filtrar no hay items, no renderizar
  if (carruselData.length === 0) {
    console.warn('[Carrusel] No hay items válidos después de filtrar');
    return null;
  }

  return <CarruselClient carruselData={carruselData} />;
}
```

**Beneficios:**
- ✅ Valida estructura de datos
- ✅ Filtra items inválidos (sin imagen)
- ✅ No crashea si data es null/undefined
- ✅ Logs útiles para debugging
- ✅ Elimina propiedades no usadas

---

#### ✅ Tarea 1.3: Remover Cache No-Store
**Archivo:** `src/components/carrusel/Carrusel.js`
**Tiempo:** 5 minutos (incluido en Tarea 1.1)
**Prioridad:** 🔴 CRÍTICA

**Ya resuelto en Tarea 1.1** al migrar a `strapi-fetcher` con `CACHE_PRESETS.HOURLY`

---

### Fase 2: Problemas Importantes (1 hora)

#### ✅ Tarea 2.1: Agregar Accesibilidad (A11y)
**Archivo:** `src/components/carrusel/CarruselClient.js`
**Tiempo:** 30 minutos
**Prioridad:** 🟡 IMPORTANTE

**Problema actual:**
```javascript
<button onClick={anteriorImagen} className="...">
  <svg>...</svg>
</button>
```

**Solución:**
```javascript
const CarruselClient = ({ carruselData }) => {
  const [indiceCarrusel, setIndiceCarrusel] = useState(0);

  const anteriorImagen = () => {
    setIndiceCarrusel(prev => prev === 0 ? carruselData.length - 1 : prev - 1);
  };

  const siguienteImagen = () => {
    setIndiceCarrusel(prev => prev === carruselData.length - 1 ? 0 : prev + 1);
  };

  // Navegación con teclado
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        anteriorImagen();
      } else if (e.key === 'ArrowRight') {
        siguienteImagen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carruselData.length]);

  if (!carruselData || carruselData.length === 0) {
    return null;
  }

  const itemActual = carruselData[indiceCarrusel];

  return (
    <div
      className="relative z-0 isolate"
      role="region"
      aria-label="Carrusel de imágenes"
      aria-roledescription="carousel"
    >
      <BarraFondoGris className={!itemActual.frasesVisibles ? " invisible" : ""}>
        {itemActual.fraseSuperior}
      </BarraFondoGris>

      <div
        id="texto-carrusel-2"
        className={`font-semibold absolute text-lg bottom-15 right-0 z-5 w-3/5 bg-gray-200 opacity-90 text-opacity-90 px-6 py-3 rounded-l-full${!itemActual.frasesVisibles ? ' invisible' : ''}`}
        aria-live="polite"
      >
        {itemActual.fraseInferior}
      </div>

      <div className="w-full bg-gray-50 flex items-center justify-center shadow-md relative h-[300px] md:h-[400px] lg:h-[500px]">
        <button
          onClick={anteriorImagen}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-10"
          aria-label="Imagen anterior"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <StrapiImage
          imagen={itemActual.imagen}
          alt={itemActual.fraseSuperior || `Imagen ${indiceCarrusel + 1} de ${carruselData.length}`}
          fill={true}
          className="object-cover"
          priority={indiceCarrusel === 0} // Solo priority en la primera
        />

        <button
          onClick={siguienteImagen}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition-all z-10"
          aria-label="Imagen siguiente"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores de paginación */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carruselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setIndiceCarrusel(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === indiceCarrusel
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
              aria-current={index === indiceCarrusel ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Contador visual */}
        <div
          className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-10"
          aria-live="polite"
        >
          {indiceCarrusel + 1} / {carruselData.length}
        </div>
      </div>
    </div>
  );
}
```

**Beneficios:**
- ✅ `aria-label` en botones
- ✅ `role="region"` en el carrusel
- ✅ `aria-live` para anunciar cambios
- ✅ Navegación con teclado (← →)
- ✅ Indicadores de paginación clickeables
- ✅ Contador visual (1/5)
- ✅ `type="button"` explícito
- ✅ `aria-hidden="true"` en SVG decorativos

---

#### ✅ Tarea 2.2: Mejorar Contraste de Texto
**Archivo:** `src/components/carrusel/CarruselClient.js`
**Tiempo:** 15 minutos
**Prioridad:** 🟡 IMPORTANTE

**Problema actual:**
```javascript
className="... bg-gray-200 opacity-90 text-opacity-90 ..."
```

**Solución:**
```javascript
// Cambiar de:
className="font-semibold absolute text-lg bottom-15 right-0 z-5 w-3/5 bg-gray-200 opacity-90 text-opacity-90 px-6 py-3 rounded-l-full"

// A:
className="font-semibold absolute text-lg bottom-15 right-0 w-3/5 bg-gray-900/80 text-white px-6 py-3 rounded-l-full shadow-lg backdrop-blur-sm"

// O si prefieres fondo claro:
className="font-semibold absolute text-lg bottom-15 right-0 w-3/5 bg-white/90 text-gray-900 px-6 py-3 rounded-l-full shadow-lg backdrop-blur-sm"
```

**Alternativa con z-index correcto:**
```javascript
className={`font-semibold absolute text-lg bottom-15 right-0 w-3/5 bg-gray-900/80 text-white px-6 py-3 rounded-l-full shadow-lg backdrop-blur-sm z-20${!itemActual.frasesVisibles ? ' invisible' : ''}`}
```

**Beneficios:**
- ✅ Mejor contraste (cumple WCAG 2.1 AA)
- ✅ `backdrop-blur-sm` mejora legibilidad
- ✅ `shadow-lg` separa visualmente del fondo
- ✅ Eliminada la confusión de `opacity-90` + `text-opacity-90`
- ✅ Z-index corregido a valor válido de Tailwind

---

#### ✅ Tarea 2.3: Limpiar Código (className y props)
**Archivo:** `src/components/carrusel/CarruselClient.js` y `Carrusel.js`
**Tiempo:** 15 minutos
**Prioridad:** 🟡 IMPORTANTE

**Ya resuelto en tareas anteriores:**
- Propiedades no usadas (url, alto, ancho) → Eliminadas en Tarea 1.2
- console.log → Eliminado en Tarea 1.1
- className con template literals → Mejorado en Tarea 2.2

---

### Fase 3: Testing y Validación (30 minutos)

#### ✅ Tarea 3.1: Testing Manual
**Tiempo:** 20 minutos

**Checklist de pruebas:**

1. **Funcionamiento básico:**
   - [ ] El carrusel se muestra correctamente
   - [ ] Las imágenes cambian al hacer click en los botones
   - [ ] Los indicadores de paginación funcionan
   - [ ] El contador muestra el número correcto

2. **Navegación con teclado:**
   - [ ] Flecha izquierda cambia a imagen anterior
   - [ ] Flecha derecha cambia a imagen siguiente
   - [ ] Tab permite navegar a los botones
   - [ ] Enter/Space activan los botones enfocados

3. **Accesibilidad:**
   - [ ] Screen reader anuncia los cambios
   - [ ] Botones tienen labels descriptivos
   - [ ] Contador es accesible

4. **Edge cases:**
   - [ ] Funciona con 1 sola imagen
   - [ ] Funciona con muchas imágenes (10+)
   - [ ] No crashea si no hay imágenes (debe ocultarse)
   - [ ] No crashea si Strapi está caído

5. **Performance:**
   - [ ] Primera imagen carga rápido (priority)
   - [ ] Cache funciona (verificar en Network tab)
   - [ ] No hay console.logs

6. **Responsive:**
   - [ ] Se ve bien en mobile
   - [ ] Se ve bien en tablet
   - [ ] Se ve bien en desktop
   - [ ] Texto legible en todos los tamaños

---

#### ✅ Tarea 3.2: Testing de Accesibilidad
**Tiempo:** 10 minutos

**Herramientas:**
```bash
# Instalar axe DevTools (extensión de Chrome)
# https://chrome.google.com/webstore/detail/axe-devtools/lhdoppojpmngadmnindnejefpokejbdd

# O usar Lighthouse en Chrome DevTools
```

**Checklist:**
- [ ] Ejecutar Lighthouse Accessibility audit
- [ ] Score >= 90
- [ ] No hay errores críticos de contraste
- [ ] Todos los botones tienen labels

---

## 📦 Archivos a Modificar

### 1. `src/components/carrusel/Carrusel.js`
```javascript
// ANTES: 38 líneas
// DESPUÉS: ~35 líneas (más limpio, con manejo de errores)
```

**Cambios:**
- Migrar a `strapi-fetcher`
- Agregar validación de datos
- Filtrar items sin imagen
- Eliminar propiedades no usadas
- Eliminar console.log

---

### 2. `src/components/carrusel/CarruselClient.js`
```javascript
// ANTES: 53 líneas
// DESPUÉS: ~90 líneas (más funcionalidad)
```

**Cambios:**
- Agregar `aria-labels`
- Agregar navegación con teclado
- Agregar indicadores de paginación
- Agregar contador visual
- Mejorar contraste de texto
- Mejorar className

---

## 🎯 Resultado Esperado

### Antes
- ❌ Crashea si Strapi falla
- ❌ Sin cache (lento)
- ❌ No es accesible
- ❌ Contraste pobre
- ❌ Console.log olvidado
- ❌ Props no usadas

### Después
- ✅ Manejo de errores robusto
- ✅ Cache optimizado (1 hora)
- ✅ Totalmente accesible (teclado + screen reader)
- ✅ Contraste WCAG 2.1 AA
- ✅ Código limpio
- ✅ Indicadores visuales
- ✅ Mejor UX

---

## 📊 Estimación de Tiempo

| Fase | Tareas | Tiempo |
|------|--------|--------|
| Fase 1: Críticos | 3 tareas | 1.5h |
| Fase 2: Importantes | 3 tareas | 1h |
| Fase 3: Testing | 2 tareas | 0.5h |
| **TOTAL** | **8 tareas** | **3h** |

---

## 🚀 Orden de Ejecución Recomendado

### Día 1 (2 horas)
1. Tarea 1.1: Migrar a strapi-fetcher (30 min)
2. Tarea 1.2: Validación de datos (30 min)
3. Tarea 2.1: Accesibilidad (30 min)
4. Tarea 2.2: Contraste (15 min)
5. Testing básico (15 min)

### Día 2 (1 hora) - Opcional si no se completa Día 1
6. Tarea 3.1: Testing completo (20 min)
7. Tarea 3.2: Testing A11y (10 min)
8. Ajustes finales (30 min)

---

## 🔄 Plan de Rollback

Si algo sale mal:

```bash
# 1. Backup antes de empezar
cp src/components/carrusel/Carrusel.js src/components/carrusel/Carrusel.backup.js
cp src/components/carrusel/CarruselClient.js src/components/carrusel/CarruselClient.backup.js

# 2. Si algo falla, restaurar
mv src/components/carrusel/Carrusel.backup.js src/components/carrusel/Carrusel.js
mv src/components/carrusel/CarruselClient.backup.js src/components/carrusel/CarruselClient.js

# 3. Reiniciar servidor
npm run dev
```

---

## 📝 Notas Adicionales

### Performance
- Primera imagen con `priority={true}`
- Resto de imágenes lazy load automático
- Cache de 1 hora reduce carga en Strapi

### Accesibilidad
- Compatible con JAWS, NVDA, VoiceOver
- Navegación completa con teclado
- Anuncios de cambios con `aria-live`

### Browser Support
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- IE11: ❌ (no soportado por Next.js 13+)

---

**¿Listo para empezar?** Comienza con la Fase 1 (Tarea 1.1) 🚀
