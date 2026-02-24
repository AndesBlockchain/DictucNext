# Changelog Visual

Registro de cambios visuales realizados en el proyecto.

---

## Issue #40 - 2026-02-23
- **Problema:** Los links dentro del cuerpo de las noticias (detalle de noticia) no tenían ningún estilo visual. Aparecían del mismo color que el texto normal y sin subrayado, por lo que los lectores no podían distinguirlos.
- **Solución:** Se agregaron clases de Tailwind al contenedor del cuerpo de la noticia para que todos los links internos aparezcan en azul DICTUC con subrayado, y cambien de tono al pasar el mouse.
- **Archivos modificados:** `src/app/(pages)/noticias/[slug]/page.js`

---

## Issue #25 - 2026-02-23
- **Problema:** Las filas de tarjetas de estrategias de sostenibilidad estaban muy juntas verticalmente, faltaba espacio de separación entre ellas.
- **Solución:** Se agregó la clase `gap-y-8` (32px de espacio) al contenedor de tarjetas para aumentar la separación vertical entre filas.
- **Archivos modificados:** `src/components/bloquesPaginas/BloqueTarjetas.js`

---

## Issue #37 - 2026-02-23
- **Problema:** El fondo gris del bloque de fichas de servicio (Utilidad, Experiencia, Potenciales Clientes) era más oscuro que el gris de la sección del agente en el Home.
- **Solución:** Se cambió el color de fondo de `bg-gray-200` a `bg-gray-100` para que coincida con el gris claro del agente del Home.
- **Archivos modificados:** `src/app/(pages)/servicios/[slug]/page.js`
