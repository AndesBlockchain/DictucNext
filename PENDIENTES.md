# Pendientes Sitio Dictuc — Documento de Ejecución

> Generado: 2026-03-21 | Basado en revisión del 09-03-2026
> Convención: `[ ]` pendiente · `[x]` completado · `[~]` en progreso · `[!]` bloqueado (requiere info externa)

---

## Sprint 1 — Quick Wins

### S1.1 — Menú secundario: tipografía bold (A4)
- **Tipo:** CSS | **Complejidad:** Baja
- **Archivo:** `src/components/MenuSecundario.js:9`
- [ ] Cambiar `font-medium` → `font-bold` en las clases del `<div>` de cada ítem del menú

### S1.2 — Componente Texto: ancho desbordante (A5)
- **Tipo:** CSS | **Complejidad:** Baja
- **Archivo:** `src/components/bloquesPaginas/Bloque.js:26`
- [ ] Agregar `max-w-5xl mx-auto` al contenedor de bloques para alinear con menú secundario
- [ ] Verificar visualmente que no corte contenido en ninguna sección

### S1.3 — BloqueHero: eliminar uppercase forzado (A8)
- **Tipo:** CSS | **Complejidad:** Baja
- **Archivo:** `src/components/bloquesPaginas/BloqueHero.js:17`
- [ ] Eliminar `uppercase` de `tituloClasses` (línea 17) para respetar capitalización original del CMS
- [ ] Verificar en secciones: Política Dictuc, Lo que somos, etc.

### S1.4 — Tilde en "estás" del agente IA (B3)
- **Tipo:** Contenido | **Complejidad:** Baja
- **Archivo:** `src/components/AgenteForm.js`
- [ ] Buscar texto "estas" y corregir a "estás" (con tilde)
- [ ] Verificar si el texto viene del CMS o está hardcodeado

### S1.5 — Sección Servicios HOME: márgenes laterales (B4)
- **Tipo:** CSS | **Complejidad:** Baja
- **Archivo:** `src/components/TiposDeServicios.js:9`
- [ ] Cambiar `max-w-12xl` → `max-w-6xl` (o agregar `px-8`) para márgenes laterales consistentes

### S1.6 — Título Noticias HOME (B5 parcial)
- **Tipo:** Contenido | **Complejidad:** Baja
- **Archivo:** `src/app/(pages)/page.js:47`
- [ ] Cambiar `'Noticias y Proyectos destacados'` → `'<span class="text-azul-dictuc">Noticias</span> destacadas'`

### S1.7 — Acceso clientes y Carreras: target="_blank" (C15, C16)
- **Tipo:** Lógica frontend | **Complejidad:** Baja
- **Archivos:** Buscar en menú superior/CMS los links de "Acceso clientes" y "Carreras"
- [ ] Agregar `target="_blank" rel="noopener noreferrer"` a ambos links
- [ ] Si vienen de Strapi via `CallToAction.js`, verificar que `ComoAbrir === "Ventana Nueva"` esté configurado en el CMS

### S1.8 — Limpiar console.log
- **Tipo:** Código | **Complejidad:** Baja
- [ ] Eliminar `console.log` en `BloquePersonas.js:11`
- [ ] Eliminar `console.log` en `SectoresPais.js:33`
- [ ] Eliminar `console.log` en `[seccion]/[slug]/page.js:17`

---

## Sprint 2 — Estilos Globales

### S2.1 — Uniformar estilo de botones (A3)
- **Tipo:** CSS | **Complejidad:** Baja-Media
- **Archivos:**
  - `src/app/(pages)/globals.css`
  - `src/components/CallToAction.js`
  - `src/app/(pages)/page.js` (botones inline)
  - `src/components/Noticias.js` (botón "Ver más noticias")
  - `src/components/SectoresPais.js` (botón "Ver todos los Servicios")
- **Estilo objetivo:** fondo sólido, `font-bold`, sin borde, `rounded-full`
- [ ] Definir clase utilitaria `.btn-dictuc` en `globals.css` o estandarizar uso de `btn btn-primary rounded-full font-bold`
- [ ] Actualizar `CallToAction.js` — eliminar variantes con `btn-outline`, unificar estilo base
- [ ] Reemplazar estilos inline de botones en `page.js:45` (agregar `font-bold`)
- [ ] Reemplazar en `Noticias.js:39,43` (agregar `font-bold`)
- [ ] Reemplazar en `SectoresPais.js:87` — eliminar `btn-outline`, usar estilo sólido

### S2.2 — Menú principal HOME (B1)
- **Tipo:** CSS + Lógica frontend | **Complejidad:** Media
- **Archivo:** `src/components/BarraSuperior.js`
- [ ] **Área de seguridad superior:** Agregar `pt-4` al `<header>` (línea 12)
- [ ] **Padding lateral logo:** Verificar áreas seguras en costados del logo (línea 40)
- [ ] **Logo HOME vs Interior:**
  - HOME (`BarraSuperior.js`): usar logo completo con isotipo ✓ (ya lo usa)
  - Interior (`BarraSuperiorInterior.js`): cambiar a logo sin isotipo — **requiere asset del diseñador**
- [ ] **Ícono Home:** Reemplazar texto "HOME" (línea 62) por ícono SVG de casita
  ```jsx
  <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
  </svg>
  ```
- [ ] **Hover/activo menú:** Agregar estilos de estado activo según maqueta (ej: `hover:border-b-2 hover:border-azul-dictuc`)

### S2.3 — Footer completo (B6)
- **Tipo:** Lógica frontend + Contenido + CMS | **Complejidad:** Media
- **Archivo:** `src/components/Footer.js`
- [ ] **Logos institucionales:** Agregar sección con links + logos de:
  - Escuela de Ingeniería: `https://www.ing.uc.cl/`
  - Chile GBC: `https://www.chilegbc.cl/`
- [ ] **Logos borrosos:** Reemplazar logos actuales del footer por SVG o PNG @2x — **requiere assets**
- [ ] **Texto "Estrategias":** Corregir en Strapi → "Estrategia de Sostenibilidad" (sin 's')
- [ ] **Links rotos — verificar/crear en Strapi:**
  - [ ] Canal de Denuncias → `/canal-denuncia` (la ruta existe)
  - [ ] Canal de Reclamos → verificar ruta
  - [ ] Certificaciones → verificar ruta
  - [ ] Acreditaciones → verificar ruta
  - [ ] Términos y Condiciones → verificar ruta
- [!] **Columna Contacto:** "Nuestras instalaciones" y "Entrega de muestras" — **pendiente contenido del cliente**

### S2.4 — Responsividad general (A1)
- **Tipo:** CSS | **Complejidad:** Alta
- **Componentes a auditar por breakpoints (375px, 768px, 1024px, 1440px):**
- [ ] `BloqueHero.js` — Cambiar `flex-row` a `flex-col lg:flex-row`, `w-2/5`/`w-3/5` a `w-full lg:w-2/5` / `w-full lg:w-3/5`
- [ ] `BloquePersonas.js` — Cambiar `grid-cols-2` a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [ ] `Contacto.js:200` — Cambiar `w-[500px]` a `w-full max-w-lg`
- [ ] `BarraSuperior.js` — Verificar menú mobile (ya tiene toggle, confirmar que funciona bien)
- [ ] `SectoresPais.js` — Verificar que íconos de sectores se adapten en mobile
- [ ] `FiltroServicios.js` — Verificar layout mobile del buscador (filtros + resultados en columna)
- [ ] Verificación general de todos los bloques en mobile

---

## Sprint 3 — Componentes Interiores

### S3.1 — Formulario de contacto (C7)
- **Tipo:** CSS + Lógica | **Complejidad:** Media
- **Archivo:** `src/components/Contacto.js`
- [ ] **Bordes invisibles:** Agregar `border border-gray-300` a cada `<input className="input validator">` y al `<textarea>`
- [ ] **Layout doble columna:** Cambiar `<form className="w-[500px]">` a:
  ```jsx
  <form className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
  ```
  Con campos que ocupen `col-span-2` para Consulta y checkboxes
- [ ] **Alinear contacto y cotización:** Verificar que `isCotizacion=true` use el mismo layout
- [ ] **Limpiar tipos de contacto:** Filtrar `<select>` para mostrar solo tipos con correo configurado
- [ ] **Campo estado ticket en email:** Agregar campo al body del POST hacia `comercial@dictuc.cl` — verificar dirección

### S3.2 — Buscador de servicios (C8)
- **Tipo:** Lógica + CSS | **Complejidad:** Alta
- **Archivos:**
  - `src/components/FiltroServicios.js`
  - `src/components/FilaServicios.js`
  - `src/components/Servicios.js`
  - `src/app/(pages)/servicios/todos-los-servicios/page.js`
  - `src/app/(pages)/sectores-pais/[slug]/page.js`
  - `src/app/(pages)/tipos-de-servicio/[slug]/page.js`
- [ ] **Hover en resultados:** En `FilaServicios.js:11`, agregar al `<a>`:
  ```
  hover:text-azul-dictuc hover:font-semibold transition-colors
  ```
- [ ] **Header fijo:** Cuando se accede filtrado por sector/tipo, usar siempre el banner del buscador general (imagen fija). Solo cambian los filtros pre-seleccionados
- [ ] **Mostrar todos los filtros siempre:** En las páginas de sector/tipo, pasar `tiposDeServicioVisibles={true}`, `sectoresPaisVisibles={true}`, `unidadesVisibles={true}`
- [ ] **Mostrar campos con 0 elementos:** En `FiltroServicios.js`, eliminar las 3 líneas `if (count === 0) return null;` (líneas ~249, ~281, ~312)
- [ ] **Ordenar alfabéticamente:** En `FiltroServicios.js:246`, agregar `.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))` antes del `.map()`
- [ ] **Tipos faltantes (CMS):** Agregar en Strapi: Calibraciones, Ensayos en terreno, Desarrollo de software
- [!] **Imagen header buscador:** Pendiente hacer editable desde CMS

### S3.3 — Menú lateral tapa contenido (A2)
- **Tipo:** CSS | **Complejidad:** Media
- **Archivo:** `src/components/ScrollSpy.js`
- [ ] Revisar z-index del ScrollSpy
- [ ] Agregar margen izquierdo al contenido principal cuando ScrollSpy está visible
- [ ] En mobile: ocultar o colapsar ScrollSpy con toggle

### S3.4 — Componente Hero: opciones avanzadas (A6)
- **Tipo:** CSS + Lógica | **Complejidad:** Media
- **Archivo:** `src/components/bloquesPaginas/BloqueHero.js`
- [ ] **Color gris franja:** Leer nuevo campo `datosBloque.colorFranja` del CMS, pasar como prop a `DegradeBase`
- [ ] **Sin degradé:** Leer `datosBloque.sinDegrade`, si es true no renderizar `<DegradeBase>`
- [ ] **Sin franja:** Leer `datosBloque.sinFranja`, condicionar render completo de la franja
- [ ] **Restringir ancho texto:** Agregar `max-w-5xl mx-auto` al contenedor `contenidoFlexClasses`
- [!] **Rayita divisoria:** Consultar con diseñador si el diseño la lleva

### S3.5 — BloqueHero: rayita cortada (A8 parcial)
- **Tipo:** CSS | **Complejidad:** Baja
- **Archivo:** `src/components/bloquesPaginas/BloqueHero.js`
- [ ] Verificar si el contenedor padre tiene `overflow-hidden` que corta la `FranjaAzul`/`DegradeBase`
- [ ] Si es así, cambiar a `overflow-visible` o ajustar height del contenedor

---

## Sprint 4 — Secciones Específicas

### S4.1 — Noticias HOME: query + fotos (B5 completo)
- **Tipo:** Lógica + CMS | **Complejidad:** Media
- **Archivo:** `src/hooks/use-ultimas-noticias.js`
- [ ] Verificar que la query ordena por `fecha:desc` y trae las más recientes
- [ ] Verificar que el `populate` incluye el campo `foto` con formatos
- [ ] En Strapi: verificar que las noticias recientes tengan imagen asignada

### S4.2 — Íconos de sectores como texto HTML (B2)
- **Tipo:** Lógica + CMS | **Complejidad:** Media
- **Archivo:** `src/components/ItemSectoresPais.js`
- [ ] Verificar si los textos vienen embebidos como parte de la imagen
- [ ] Si es así, separar: ícono como `<img>` + nombre como `<span>` debajo
- [ ] Corregir color azul: asegurar que usen `text-azul-dictuc` (#307fe2)

### S4.3 — Lo que somos: orden menú + fixes (C1)
- **Tipo:** CMS + CSS | **Complejidad:** Baja
- [ ] Verificar en Strapi el orden del menú secundario para "Lo que somos"
- [ ] Confirmar que los fixes de S1.3 (uppercase) y S2.1 (botones) aplican correctamente en Política Dictuc

### S4.4 — Lo que hacemos (C2)
- **Tipo:** Lógica + CMS | **Complejidad:** Media
- [ ] Agregar componente de sectores en formato "Tipos de Servicios del HOME" (imagen + texto)
- [ ] Agregar botón "Ver más proyectos" al final del bloque de Proyectos Destacados
- [ ] Ubicar según posición indicada en documento de referencia

### S4.5 — Sostenibilidad (C3)
- **Tipo:** CSS + CMS | **Complejidad:** Media
- [ ] Aplicar restricción de ancho (fix S1.2) a los bloques de esta sección
- [ ] Verificar en Strapi si el componente de estrategia de sostenibilidad fue eliminado
- [ ] Si existe en Strapi pero no se renderiza, revisar `src/helpers/bloque-renderer.js`
- [ ] Restaurar si fue eliminado por error

### S4.6 — Historia: espaciado + timeline (C4)
- **Tipo:** CSS + CMS | **Complejidad:** Media
- **Archivos:**
  - `src/components/bloquesPaginas/BloqueEfemerides.js`
  - `src/components/bloquesPaginas/efemerides/ItemEfemerides.js`
  - `src/app/(pages)/globals.css` (estilos timeline)
- [ ] Reducir espacio entre componentes (revisar `my-8` en `Bloque.js` para esta sección)
- [ ] Agregar soporte para imágenes en `ItemEfemerides` según datos del CMS
- [ ] Ajustar espaciado del timeline según maqueta aprobada
- [!] Faltan imágenes — **cargar en Strapi**

### S4.7 — Gobierno corporativo: personas (C5)
- **Tipo:** CSS + CMS | **Complejidad:** Media
- **Archivo:** `src/components/bloquesPaginas/BloquePersonas.js`
- [!] Actualizar componente al diseño aprobado — **requiere maqueta del diseñador**

### S4.8 — Reportes (C6)
- **Tipo:** CMS + Contenido | **Complejidad:** Baja
- [ ] Agregar texto descriptivo de la sección en Strapi
- [ ] Verificar estructura en Strapi: cada reporte debe tener imagen + archivo descargable
- [ ] Completar contenido faltante

### S4.9 — Más noticias (C9)
- **Tipo:** Lógica + CSS | **Complejidad:** Media
- **Archivos:** `src/app/(pages)/todas-las-noticias/page.js`, `src/app/(pages)/ultimas-noticias/page.js`
- [ ] Al ingresar, mostrar buscador de noticias por año + vista Instagram debajo
- [ ] Cambiar título: "Noticias y proyectos" → "Noticias"
- [ ] Agregar `<FranjaAzul />` antes del componente Instagram (rayita divisoria superior cortada)

### S4.10 — Estado de ticket (C10)
- **Tipo:** Lógica + CSS | **Complejidad:** Media
- **Archivos:**
  - `src/app/(pages)/estado-ticket/page.js`
  - `src/app/(pages)/estado-ticket/EstadoTicketForm.js`
- [ ] Agregar texto introductorio antes del formulario:
  > "Aquí puedes consultar el estado de tu ticket y hacer seguimiento al avance de tu solicitud. Ingresa los datos requeridos para conocer su estado actual y la información disponible."
- [ ] Aplicar estilos consistentes con el sitio (usar `FranjaAzul`, `Titulo`, mismos colores)
- [ ] Si ticket no asignado, mostrar:
  > "Ticket recibido. Actualmente en proceso de revisión por nuestro equipo."

### S4.11 — Servicios individuales (C11)
- **Tipo:** CSS + Lógica | **Complejidad:** Media
- **Archivo:** `src/app/(pages)/servicios/[slug]/page.js`
- [ ] Agrandar cajas de tarjetas según maqueta
- [ ] Mover bloque de etiquetas debajo del formulario de cotización (separar sectores pegados)
- [ ] Agregar nombre del servicio entre breadcrumb y tarjetas
- [ ] Banner con figura gris + ícono según tipo de servicio (según maqueta)
- [ ] Formulario cotización: layout doble columna (reutilizar patrón de S3.1)
- [!] **Pendiente propuesta de diseño** para ubicación de etiquetas

### S4.12 — Verifica: menú desplegable (C12)
- **Tipo:** Lógica | **Complejidad:** Baja
- **Archivo:** `src/app/(pages)/verifica/page.js`
- [ ] Agregar menú/tabs con dos opciones:
  - Verificación de Informes y Certificados
  - Transparencia al consumidor

### S4.13 — Verificación de Informes: rediseño + texto (C13)
- **Tipo:** CSS + Contenido | **Complejidad:** Media
- **Archivo:** `src/components/VerificaForm.js`
- [ ] Rediseñar manteniendo coherencia gráfica (usar `Bloque`, `FranjaAzul`, tipografías del sitio)
- [ ] Actualizar texto completo según contenido enviado en diciembre 2025:
  > Dictuc emite informes y certificados con distintos mecanismos de validación, según el tipo de servicio.
  >
  > - **Servicios rutinarios:** informes con **firma digital** y **código de verificación**.
  > - **Estudios y peritajes:** informes con **dos firmas** y **sin código de verificación**.
  >
  > Si el documento tiene **firma digital**, ingresa a continuación el **código de verificación** para comprobar su autenticidad.
  >
  > **Código de verificación** — [ Verificar ]
  >
  > *Si el código es válido, podrás visualizar un documento en formato PDF para cotejar su contenido. Este archivo **no corresponde al documento oficial firmado electrónicamente**, sino a una versión idéntica emitida exclusivamente para efectos de verificación.*
  >
  > Si el informe tiene dos firmas, para confirmar la validez, escríbenos a **informes@dictuc.cl**.

### S4.14 — Transparencia al consumidor (C14)
- **Tipo:** Diseño + Desarrollo | **Complejidad:** Media
- [!] **Bloqueado:** Diseño final pendiente (información ya enviada desde Dictuc)

---

## Sprint 5 — Páginas Nuevas + CMS

### S5.1 — Cambios solo en Strapi (sin código frontend)

| # | Acción | Estado |
|---|--------|--------|
| 1 | Noticias recientes: asignar fotos en Strapi | [ ] |
| 2 | Footer: corregir "Estrategias" → "Estrategia" | [ ] |
| 3 | Footer: configurar URLs correctas de links rotos | [ ] |
| 4 | Menú secundario "Lo que somos": verificar orden | [ ] |
| 5 | "Lo que hacemos": agregar componente sectores + botón "Ver más proyectos" | [ ] |
| 6 | Sostenibilidad: restaurar componente estrategia si fue eliminado | [ ] |
| 7 | Historia/Timeline: cargar imágenes faltantes | [ ] |
| 8 | Gobierno corporativo: actualizar datos de personas | [ ] |
| 9 | Reportes: agregar descripción, imágenes y archivos | [ ] |
| 10 | Buscador: agregar tipos Calibraciones, Ensayos en terreno, Desarrollo de software | [ ] |
| 11 | Acceso clientes / Carreras: configurar `ComoAbrir = "Ventana Nueva"` si aplica | [ ] |

### S5.2 — Páginas nuevas por desarrollar

| Página | Maqueta | Desarrollo | Notas |
|--------|---------|-----------|-------|
| Líneas de negocios | [x] Aprobada | [ ] Pendiente | Crear ruta + componentes |
| Links de interés | [!] Pendiente | [ ] Pendiente | Info enviada, falta maqueta |
| Proyectos destacados | [!] Pendiente | [ ] Pendiente | Falta maqueta |

---

## Ítems Bloqueados — Resumen

| Ítem | Bloqueado por | Contactar a |
|------|--------------|-------------|
| S2.2 Logo sin isotipo | Asset del diseñador | Diseñador |
| S3.4 Rayita divisoria Hero | Decisión de diseño | Diseñador |
| S2.3 Columna Contacto footer | Contenido del cliente | Cliente Dictuc |
| S3.2 Imagen header buscador | Hacer editable desde CMS | Equipo desarrollo |
| S4.6 Imágenes timeline | Cargar en Strapi | Equipo contenido |
| S4.7 Diseño personas | Maqueta aprobada | Diseñador |
| S4.11 Ubicación etiquetas | Propuesta de diseño | Equipo diseño |
| S4.14 Transparencia consumidor | Diseño final | Equipo diseño |
| S5.2 Links de interés | Maqueta | Equipo diseño |
| S5.2 Proyectos destacados | Maqueta | Equipo diseño |

---

## Comandos útiles

```bash
# Desarrollo local
cd frontend && npm run dev

# Build de verificación
npm run build

# Buscar texto en el proyecto
grep -r "texto a buscar" src/

# Strapi debe estar corriendo en
# http://127.0.0.1:1337
```

## Breakpoints para verificar responsividad

| Dispositivo | Ancho | Clase Tailwind |
|------------|-------|---------------|
| Mobile | 375px | default |
| Tablet | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Wide | 1440px | `xl:` / `2xl:` |
