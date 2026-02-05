#!/bin/bash

# Script helper para aplicar las correcciones del carrusel
# Uso: ./scripts/fix-carrusel.sh [fase]

FASE=$1

if [ -z "$FASE" ]; then
  echo "🎯 Plan de Corrección del Carrusel"
  echo ""
  echo "Uso: ./scripts/fix-carrusel.sh [fase]"
  echo ""
  echo "Fases disponibles:"
  echo "  1 - Problemas Críticos (1.5h)"
  echo "  2 - Problemas Importantes (1h)"
  echo "  3 - Testing (0.5h)"
  echo "  all - Ejecutar todo el plan"
  echo ""
  echo "Ejemplo: ./scripts/fix-carrusel.sh 1"
  exit 0
fi

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Crear backups
create_backups() {
  echo -e "${BLUE}📦 Creando backups...${NC}"
  cp src/components/carrusel/Carrusel.js src/components/carrusel/Carrusel.backup.js
  cp src/components/carrusel/CarruselClient.js src/components/carrusel/CarruselClient.backup.js
  echo -e "${GREEN}✅ Backups creados${NC}"
  echo ""
}

# Fase 1
fase_1() {
  echo -e "${YELLOW}🔴 FASE 1: Problemas Críticos${NC}"
  echo ""

  echo -e "${BLUE}Tarea 1.1: Migrar a strapi-fetcher${NC}"
  echo "  📄 Archivo: src/components/carrusel/Carrusel.js"
  echo "  ⏱️  Tiempo: 30 minutos"
  echo ""
  echo "Pasos:"
  echo "  1. Importar fetchFromStrapi, buildStrapiQuery, CACHE_PRESETS"
  echo "  2. Reemplazar función getCarrusel() con strapi-fetcher"
  echo "  3. Eliminar console.log"
  echo ""

  read -p "¿Abrir archivo en VS Code? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    code src/components/carrusel/Carrusel.js
  fi

  echo ""
  echo -e "${BLUE}Tarea 1.2: Validación de datos${NC}"
  echo "  📄 Archivo: src/components/carrusel/Carrusel.js"
  echo "  ⏱️  Tiempo: 30 minutos"
  echo ""
  echo "Pasos:"
  echo "  1. Validar que carruselFetch.data existe"
  echo "  2. Filtrar items sin imagen"
  echo "  3. Eliminar props no usadas (url, alto, ancho)"
  echo ""

  echo -e "${GREEN}Fase 1 completada cuando:${NC}"
  echo "  ✓ No hay console.log"
  echo "  ✓ No crashea si Strapi falla"
  echo "  ✓ Cache configurado a 1 hora"
  echo "  ✓ Valida datos antes de mapear"
  echo ""
}

# Fase 2
fase_2() {
  echo -e "${YELLOW}🟡 FASE 2: Problemas Importantes${NC}"
  echo ""

  echo -e "${BLUE}Tarea 2.1: Accesibilidad${NC}"
  echo "  📄 Archivo: src/components/carrusel/CarruselClient.js"
  echo "  ⏱️  Tiempo: 30 minutos"
  echo ""
  echo "Agregar:"
  echo "  - aria-label en botones"
  echo "  - role='region' en carrusel"
  echo "  - Navegación con teclado (← →)"
  echo "  - Indicadores de paginación"
  echo "  - Contador visual (1/5)"
  echo ""

  read -p "¿Abrir archivo en VS Code? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    code src/components/carrusel/CarruselClient.js
  fi

  echo ""
  echo -e "${BLUE}Tarea 2.2: Mejorar contraste${NC}"
  echo "  📄 Archivo: src/components/carrusel/CarruselClient.js"
  echo "  ⏱️  Tiempo: 15 minutos"
  echo ""
  echo "Cambiar:"
  echo "  - bg-gray-200 opacity-90 → bg-gray-900/80 text-white"
  echo "  - Agregar backdrop-blur-sm"
  echo "  - Agregar shadow-lg"
  echo ""

  echo -e "${GREEN}Fase 2 completada cuando:${NC}"
  echo "  ✓ Botones tienen aria-label"
  echo "  ✓ Funciona con teclado (← →)"
  echo "  ✓ Tiene indicadores de paginación"
  echo "  ✓ Texto tiene buen contraste"
  echo ""
}

# Fase 3
fase_3() {
  echo -e "${YELLOW}🧪 FASE 3: Testing${NC}"
  echo ""

  echo "Checklist de testing:"
  echo ""
  echo "Funcionamiento básico:"
  echo "  [ ] El carrusel se muestra"
  echo "  [ ] Botones funcionan"
  echo "  [ ] Indicadores funcionan"
  echo "  [ ] Contador correcto"
  echo ""
  echo "Navegación con teclado:"
  echo "  [ ] ← cambia a anterior"
  echo "  [ ] → cambia a siguiente"
  echo "  [ ] Tab navega entre botones"
  echo ""
  echo "Edge cases:"
  echo "  [ ] Funciona con 1 imagen"
  echo "  [ ] Funciona con 10+ imágenes"
  echo "  [ ] No crashea si no hay imágenes"
  echo "  [ ] No crashea si Strapi está caído"
  echo ""
  echo "Performance:"
  echo "  [ ] Primera imagen carga rápido"
  echo "  [ ] Cache funciona"
  echo "  [ ] No hay console.logs"
  echo ""

  echo -e "${BLUE}¿Iniciar servidor de desarrollo?${NC}"
  read -p "(y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
  fi
}

# Ejecutar según fase
case $FASE in
  1)
    create_backups
    fase_1
    ;;
  2)
    fase_2
    ;;
  3)
    fase_3
    ;;
  all)
    create_backups
    fase_1
    echo ""
    echo "---"
    echo ""
    fase_2
    echo ""
    echo "---"
    echo ""
    fase_3
    ;;
  *)
    echo -e "${RED}❌ Fase no válida: $FASE${NC}"
    echo "Usa: 1, 2, 3, o all"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}📚 Referencias:${NC}"
echo "  - Plan completo: CARRUSEL_FIX_PLAN.md"
echo "  - Ejemplo migrado: src/hooks/use-ultimas-noticias.js"
echo "  - Docs strapi-fetcher: MIGRATION_GUIDE.md"
echo ""
echo -e "${BLUE}💡 Tip:${NC} Consulta CARRUSEL_FIX_PLAN.md para ver el código completo"
echo ""
