#!/bin/bash

# Script helper para migrar hooks a strapi-fetcher
# Uso: ./scripts/migrate-hook.sh use-menu-superior

HOOK_NAME=$1

if [ -z "$HOOK_NAME" ]; then
  echo "❌ Error: Debes especificar el nombre del hook"
  echo "Uso: ./scripts/migrate-hook.sh use-menu-superior"
  exit 1
fi

HOOK_FILE="src/hooks/${HOOK_NAME}.js"

if [ ! -f "$HOOK_FILE" ]; then
  echo "❌ Error: Hook no encontrado: $HOOK_FILE"
  exit 1
fi

echo "🔄 Migrando hook: $HOOK_NAME"
echo ""

# Crear backup
BACKUP_FILE="src/hooks/${HOOK_NAME}-old.js"
cp "$HOOK_FILE" "$BACKUP_FILE"
echo "✅ Backup creado: $BACKUP_FILE"

# Mostrar contenido actual
echo ""
echo "📄 Contenido actual del hook:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
head -30 "$HOOK_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "📝 Ahora edita el hook usando el template en MIGRATION_PLAN.md"
echo ""
echo "Cuando termines:"
echo "  1. Guarda el archivo"
echo "  2. Ejecuta: npm run dev"
echo "  3. Prueba la funcionalidad"
echo "  4. Si funciona: rm $BACKUP_FILE"
echo "  5. Si falla: mv $BACKUP_FILE $HOOK_FILE"
echo ""
echo "🔗 Referencias:"
echo "  - Template: MIGRATION_PLAN.md (sección 'Template de Migración')"
echo "  - Ejemplo: src/hooks/use-ultimas-noticias.js"
echo "  - Docs: MIGRATION_GUIDE.md"
echo ""

# Abrir en editor (opcional)
if command -v code &> /dev/null; then
  echo "💡 Abriendo en VS Code..."
  code "$HOOK_FILE"
fi
