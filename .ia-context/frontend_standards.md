# Frontend Standards

## JavaScript

1. Mantener `js/photo.js` como orquestador principal salvo que una separacion sea realmente necesaria.
2. Usar `const` por defecto y `let` solo si el valor cambia.
3. Evitar variables globales nuevas; preferir estado cerrado dentro de `DOMContentLoaded`.
4. Cancelar peticiones obsoletas con `AbortController` cuando una ruta o galeria cambia.
5. Sanitizar cualquier texto que termine en `innerHTML` con `escapeHtml` o equivalente.
6. No confiar en datos de `data-*`, hash o respuesta PHP sin validar minimo de forma/tipo.
7. Mantener compatibilidad con rutas hash existentes: `#home`, `#inicio`, `#viewall` y galerias.
8. Si se toca Masonry, verificar que no queden instancias duplicadas ni espacios blancos tras lazy load.
9. Si se toca PhotoSwipe, validar navegacion, boton de descarga y dimensiones `data-size`.
10. Preferir cambios pequenos en funciones existentes antes que crear utilidades generales.
11. No usar rutas directas `./img/...`; construir imagenes privadas mediante `php/media.php?path=...`.

## CSS

1. Respetar el lenguaje visual del tema Pinhole: clases `pinhole-*`, menu lateral y galeria masonry.
2. Agregar estilos custom cerca de reglas relacionadas o al final con un bloque claramente nombrado.
3. Evitar `!important` salvo para sobrescribir estilos del tema que no puedan aislarse mejor.
4. Validar desktop y mobile para cualquier cambio visual.
5. No romper el layout de columnas usado por `.pinhole-item col-lg-4 col-md-4 col-sm-6`.
6. Mantener estados visibles para loading, disabled, hover, focus y error.
7. Optimizar imagenes/video por atributos HTML primero antes de hacks CSS.

## HTML

1. Mantener estructura base de `index.html` compatible con scripts y selectores existentes.
2. No renombrar IDs/clases usados por `photo.js` sin actualizar todos los consumidores.
3. Usar atributos `aria-*` cuando se agreguen controles interactivos.
4. Mantener rutas relativas a recursos locales.
5. No enlazar archivos privados de `img/` directamente desde markup.

## Performance UX

1. No cargar todas las imagenes de golpe; respetar paginacion por `CHUNK`.
2. Usar lazy loading en imagenes de galeria.
3. Evitar reflows innecesarios: batch de DOM, luego relayout Masonry.
4. Mantener feedback de carga y estados vacios.
