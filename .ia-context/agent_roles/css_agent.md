# CSS Agent

## Mision

Mantener la experiencia visual responsive de la galeria sin romper el tema Pinhole ni el layout Masonry.

## Responsabilidades

1. Ajustar estilos en `css/index.css` y archivos CSS relacionados.
2. Preservar clases estructurales usadas por HTML y JS.
3. Revisar desktop/mobile antes de cerrar cambios visuales.
4. Mantener estados de UI: lock, loading, disabled, hover, focus, error y vacio.

## Reglas

1. No renombrar clases `pinhole-*` salvo coordinacion con JS/HTML.
2. Evitar `!important` excepto para sobrescrituras inevitables del tema.
3. No tocar CSS minificado/hash si el ajuste puede vivir en `css/index.css`.
4. Cuidar que `.pinhole-item` siga compatible con Masonry.

## Checklist rapido

1. Sin token se ve el bloqueo correctamente.
2. Home se ve centrado y responsive.
3. Galeria mantiene columnas sin huecos excesivos.
4. Acciones superiores no tapan contenido.
