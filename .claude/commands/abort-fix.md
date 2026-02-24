La solución del issue actual se complicó y necesitamos descartarla.

Diagnostica en qué estado estamos y actúa según corresponda:

1. Ejecuta `git status` y `git log --oneline -5` para entender el estado actual
2. Verifica si hay un PR abierto con `gh pr list --head $(git branch --show-current)`
3. Verifica si ese PR fue mergeado con `gh pr view --json state` si existe

Según el diagnóstico:

**Si solo hay cambios locales sin commit:**
- `git checkout .` y `git clean -fd`
- Vuelve a main y elimina la rama

**Si hay commits pero no hay PR:**
- Vuelve a main y elimina la rama local

**Si hay PR abierto sin merge:**
- Cierra el PR con comentario: "Solución descartada — issue requiere revisión del equipo de desarrollo"
- Elimina la rama local y remota

**Si el PR ya fue mergeado:**
- Ejecuta `git revert` del merge commit
- Pushea el revert a main
- Agrega un comentario en el PR explicando el revert

En todos los casos:
- Agrega un comentario en el issue original con la etiqueta `needs-dev` explicando
  brevemente por qué la solución visual no fue suficiente
- Confirma a la usuaria que todo quedó como estaba antes

$ARGUMENTS