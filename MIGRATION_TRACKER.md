# 📊 Tracker de Migración de Hooks

**Última actualización:** 2026-01-28

---

## 🎯 Progreso General

```
████░░░░░░░░░░░░░░░░ 5.6% (1/18 hooks activos)
```

**Migrados:** 1 / 18
**Pendientes:** 17
**Legacy (eliminar):** 6

---

## ✅ Fase 1: Quick Wins (0/7)

### Sprint 1.1: Menús y Navegación
- [ ] `use-menu-superior.js` - Menu principal del sitio
- [ ] `use-menu-footer.js` - Menu del footer
- [ ] `use-menu-footer-superior.js` - Menu footer superior

**Status:** 🔴 No iniciado

### Sprint 1.2: Datos Maestros
- [ ] `use-sectores-pais.js` - Sectores industriales
- [ ] `use-tipo-de-servicios.js` - Tipos de servicios
- [ ] `use-tipo-de-contacto.js` - Tipos de consulta
- [ ] `use-modals.js` - Carruseles/modales

**Status:** 🔴 No iniciado

---

## ✅ Fase 2: Páginas Dinámicas (0/6)

### Sprint 2.1: Páginas y Sectores
- [ ] `use-pagina.js` - Páginas por slug
- [ ] `use-sector-by-slug.js` - Sector por slug
- [ ] `use-tipo-de-servicio-by-slug.js` - Tipo de servicio por slug

**Status:** 🔴 No iniciado

### Sprint 2.2: Servicios y Noticias
- [x] `use-ultimas-noticias.js` - Últimas noticias ✅
- [ ] `use-servicio.js` - Servicio por slug
- [ ] `use-noticias-by-tag.js` - Noticias por etiqueta
- [ ] `use-menu-secundario.js` - Menú secundario

**Status:** 🟡 1/4 completado

---

## ✅ Fase 3: Filtros y Búsqueda (0/3)

- [ ] `use-servicios-by-sector.js` - Servicios filtrados por sector
- [ ] `use-servicios-by-tipo-de-servicio.js` - Servicios por tipo
- [ ] `use-servicios.js` - Todos los servicios

**Status:** 🔴 No iniciado

---

## ✅ Fase 4: Casos Especiales (0/2)

- [ ] `use-rutificador.js` - Validar RUT (POST request)
- [ ] `use-site-metadata.js` - Metadata del sitio

**Status:** 🔴 No iniciado

---

## 🗑️ Legacy: Eliminar (0/6)

Estos hooks usan Gatsby y no se usan en Next.js:

- [ ] `use-agente-config.js`
- [ ] `use-home-noticias.js`
- [ ] `use-noticias-por-agno.js`
- [ ] `use-noticias.js`
- [ ] `use-paginas.js`
- [ ] `use-servicios-by-tipo-and-sector.js`

**Status:** 🔴 Pendiente eliminación

---

## 📈 Detalles por Hook

| Hook | Status | Prioridad | Complejidad | Tiempo Est. | Notas |
|------|--------|-----------|-------------|-------------|-------|
| use-ultimas-noticias.js | ✅ | Alta | Baja | - | COMPLETADO |
| use-menu-superior.js | ⬜ | Alta | Baja | 20min | Próximo |
| use-menu-footer.js | ⬜ | Alta | Baja | 20min | - |
| use-menu-footer-superior.js | ⬜ | Alta | Baja | 20min | - |
| use-sectores-pais.js | ⬜ | Alta | Baja | 30min | Con transform |
| use-tipo-de-servicios.js | ⬜ | Alta | Baja | 20min | - |
| use-tipo-de-contacto.js | ⬜ | Alta | Baja | 20min | - |
| use-modals.js | ⬜ | Alta | Baja | 20min | - |
| use-pagina.js | ⬜ | Alta | Media | 30min | Con parámetro |
| use-sector-by-slug.js | ⬜ | Media | Media | 30min | Con parámetro |
| use-tipo-de-servicio-by-slug.js | ⬜ | Media | Media | 30min | Con parámetro |
| use-servicio.js | ⬜ | Alta | Media | 30min | Con parámetro |
| use-noticias-by-tag.js | ⬜ | Media | Media | 30min | Con filtro |
| use-menu-secundario.js | ⬜ | Media | Media | 30min | Con parámetro |
| use-servicios-by-sector.js | ⬜ | Media | Alta | 45min | Filtros complejos |
| use-servicios-by-tipo-de-servicio.js | ⬜ | Media | Alta | 45min | Filtros complejos |
| use-servicios.js | ⬜ | Baja | Alta | 45min | Revisar uso |
| use-rutificador.js | ⬜ | Baja | Alta | 30min | POST request |
| use-site-metadata.js | ⬜ | Baja | Media | 20min | Revisar uso |

**Total estimado:** ~8 horas de trabajo

---

## 🏆 Hitos

- [ ] **Hito 1:** Migrar todos los menús (3/18 = 17%)
- [ ] **Hito 2:** Migrar datos maestros (7/18 = 39%)
- [ ] **Hito 3:** Migrar páginas dinámicas (13/18 = 72%)
- [ ] **Hito 4:** Migrar filtros (16/18 = 89%)
- [ ] **Hito 5:** Completar migración (18/18 = 100%)
- [ ] **Hito 6:** Eliminar legacy y cleanup

---

## 📅 Registro de Cambios

### 2026-01-28
- ✅ Creado sistema strapi-fetcher
- ✅ Migrado use-ultimas-noticias.js
- ✅ Documentación completa
- 📝 Plan de migración establecido

### Próximos pasos
1. Migrar Sprint 1.1 (menús)
2. Probar navegación
3. Continuar con Sprint 1.2

---

## 💡 Tips de Productividad

### Para migrar rápido:
```bash
# 1. Usar el script helper
./scripts/migrate-hook.sh use-menu-superior

# 2. Copiar template de QUICK_REFERENCE.md

# 3. Ajustar endpoint y configuración

# 4. Probar inmediatamente
npm run dev

# 5. Marcar como completado aquí
```

### Migración en bloques:
- **Mañana:** Sprint 1.1 (menús) - 1 hora
- **Tarde:** Sprint 1.2 (datos maestros) - 2 horas
- **Total día 1:** 3 horas, 7 hooks migrados

---

## 🎯 Meta Semanal

| Día | Fase | Hooks | Tiempo |
|-----|------|-------|--------|
| Lunes | Fase 1 | 7 hooks | 3h |
| Martes | Fase 2.1 | 3 hooks | 2h |
| Miércoles | Fase 2.2 | 3 hooks | 2h |
| Jueves | Fase 3 | 3 hooks | 2h |
| Viernes | Fase 4 + Cleanup | 2 hooks + limpieza | 2h |

**Total:** 11 horas distribuidas en 5 días = ~2 horas/día

---

## 🔥 Próximos 3 Hooks a Migrar

1. **use-menu-superior.js** (20 min)
   - Endpoint: `/api/menu-superiors?sort=posicion`
   - Cache: DAILY
   - Sin parámetros

2. **use-menu-footer.js** (20 min)
   - Endpoint: `/api/menu-footers?sort=sortOrder:asc&populate=*`
   - Cache: DAILY
   - Sin parámetros

3. **use-menu-footer-superior.js** (20 min)
   - Endpoint: `/api/menu-footer-superiors?populate=all`
   - Cache: DAILY
   - Sin parámetros

**Total:** 1 hora para tener todos los menús migrados 🚀

---

**¿Listo para continuar?** Actualiza este archivo después de cada migración! ✅
