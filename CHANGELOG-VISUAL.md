# Changelog Visual

Registro de cambios visuales realizados en el proyecto.

---

## Issue #40 - 2026-02-23
- **Problema:** Los links dentro del cuerpo de las noticias (detalle de noticia) no tenían ningún estilo visual. Aparecían del mismo color que el texto normal y sin subrayado, por lo que los lectores no podían distinguirlos.
- **Solución:** Se agregaron clases de Tailwind al contenedor del cuerpo de la noticia para que todos los links internos aparezcan en azul DICTUC con subrayado, y cambien de tono al pasar el mouse.
- **Archivos modificados:** `src/app/(pages)/noticias/[slug]/page.js`
