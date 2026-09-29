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

1. Mantener las clases/estructura Pinhole que necesita la galeria, pero aplicar la identidad Pixitor documentada en `ui_design_direction.md`.
2. Favorecer una estetica minimalista retro/pixel: fondo tinta, superficies papel, acentos puntuales, esquinas rectas y sombras duras controladas.
3. Evitar apariencia generica Bootstrap, radios grandes, gradientes decorativos y elementos de marca duplicados.
4. Agregar estilos custom cerca de reglas relacionadas o en bloques claramente nombrados al final de `css/index.css`.
5. Evitar `!important` salvo al neutralizar reglas heredadas del tema que no puedan aislarse de otro modo.
6. Validar desktop y mobile, incluyendo scroll interno de modales y dialogos de confirmacion.
7. No romper el layout de columnas usado por `.pinhole-item col-lg-4 col-md-4 col-sm-6`.
8. Mantener estados visibles para loading, disabled, hover, focus y error; respetar `prefers-reduced-motion`.
9. Mantener el video de Inicio en su proporcion intrinseca, sin barras/recorte, ajustando sus dimensiones con metadatos y viewport.
10. Mantener la marca en `resources/phpeitor-pixsvg.svg`; no volver a introducir la firma “– Phpeitor” bajo el video.
11. El slider de Inicio autenticado es una historia vertical por vez, con progreso por imagen y navegacion accesible; no apilar tarjetas horizontales ni agregar reacciones emoji decorativas.
12. El fondo debe leer el tema activo (`--interactive-bg`), no quedar fijado a un color retro estatico.
13. El fondo interactivo debe pausar en pestañas ocultas, limitar carga/frecuencia y recolorear glifos sin reconstruir la simulacion al cambiar de tema.
14. Consumir URLs/limites publicos desde `window.PIXITOR_CONFIG`; nunca colocar tokens ni valores secretos en JS/config publico.
15. Optimizar imagenes/video por atributos HTML primero antes de hacks CSS.

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
