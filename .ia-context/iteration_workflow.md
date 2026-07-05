# Iteration Workflow

## Antes de cambiar codigo

1. Leer `project_context.md` y el rol de agente aplicable.
2. Identificar archivos afectados con busqueda puntual.
3. Revisar consumidores antes de renombrar clases, IDs, rutas o claves JSON.
4. Preferir el cambio minimo que resuelve el problema.

## Durante el cambio

1. Mantener compatibilidad con Apache local bajo `/gallery/`.
2. No mezclar refactors amplios con fixes funcionales.
3. No tocar `vendor/` ni archivos generados salvo necesidad explicita.
4. No modificar assets pesados si la tarea es de logica o estilos.
5. Documentar solo decisiones no obvias con comentarios breves.

## Despues del cambio

1. Ejecutar validaciones posibles para PHP, JS o CSS afectado.
2. Revisar diff para confirmar que solo se tocaron archivos esperados.
3. Probar mentalmente los flujos: sin token, con token, Home, galeria, scroll infinito, descarga.
4. Actualizar contexto si se introducen nuevas rutas, endpoints o convenciones.

## Definicion de listo

1. La funcionalidad pedida esta implementada.
2. No se expone informacion sensible.
3. No se rompe mobile ni desktop.
4. No se agregan dependencias innecesarias.
5. Hay una forma clara de verificar el cambio.
