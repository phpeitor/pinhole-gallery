# Project Context

## Objetivo del proyecto

Galeria privada de imagenes con acceso por token, menu dinamico, carga infinita por lotes, layout masonry, lightbox PhotoSwipe y descarga masiva por galeria.

## Direccion UI/UX actual

Pixitor evoluciona hacia una identidad minimalista de archivo digital retro/pixel. La referencia visual combina fondos tinta oscuros, superficies papel, acentos violeta/rosa/lima, bordes rectos y sombras duras discretas. Evitar modales redondeados genericos tipo Bootstrap y decoracion excesiva. Ver `ui_design_direction.md` para tokens y reglas de aplicacion.

La marca vigente es el SVG `resources/phpeitor-pixsvg.svg`: “MEDIA” como palabra principal y el trazado original de “PHPEITOR” debajo. `resources/phpeitor-dataset.svg` es referencia de la composicion/tipo original, no sustituye el SVG activo.

En Inicio, el video invitado usa los clips existentes `resources/2.mp4` a `resources/5.mp4`, conserva su proporcion intrinseca y se dimensiona por metadatos para llenar el marco sin bandas negras ni recorte. Si un clip falla, prueba los restantes y termina en un estado de error visible en vez de dejar un recuadro negro. La firma “– Phpeitor” se omite; la marca vive en el logotipo del encabezado. Con token, el slider de recuerdos usa una sola tarjeta vertical estilo Stories, con indicadores y controles discretos, sin emojis flotantes.

El acceso por token usa un panel compacto: spinner inline mientras se valida, el formulario conserva el panel abierto ante error y la imagen del candado se mantiene pequena/estatica hasta una transicion sutil de desbloqueo. La referencia WordPress es metadata secundaria, no contenido destacado.

Los fondos de Inicio y galeria deben reaccionar al tema activo mediante `--interactive-bg`; no fijar el fondo globalmente al color base retro.

La animacion interactiva limita la simulacion a 30 FPS, usa una malla adaptativa de bajo costo, pausa con pestañas ocultas y recolorea los glifos sin reconstruir particulas al cambiar el tema. Evitar agregar listeners por particula/constraint.

La configuracion PHP central vive en `php/bootstrap.php` y su plantilla completa es `.env.example`. `.env` local permanece ignorado y contiene los secretos reales. `php/public_config.php` expone unicamente rutas de endpoints y valores publicos; nunca tokens/secretos.

## Flujo principal

1. El usuario abre `index.html`.
2. `js/photo.js` valida si existe una sesion activa con `php/check_token.php`.
3. Si no hay sesion, se muestra el bloqueo y se solicita token.
4. `php/token_validate.php` valida el token contra `.env` y crea sesion temporal.
5. `php/menu.php` entrega las galerias disponibles.
6. `php/list.php` pagina imagenes por carpeta, valida sesion y genera/usa `.meta.json`.
7. `php/gallery_media.php` genera thumbnails WebP automaticos en `.thumbs/`.
8. El frontend renderiza thumbnails servidos por `php/media.php`, activa Masonry, maneja scroll infinito y abre PhotoSwipe con imagen protegida.
9. `php/home_slider.php` entrega hasta 5 imagenes aleatorias protegidas para el slider Home.
10. `php/zip.php` permite descargar la galeria activa con validacion de sesion y ruta.

## Archivos clave

1. `index.html`: markup base, menus, contenedor de galeria y dependencias del tema.
2. `js/photo.js`: estado de sesion, rutas hash, menus, render de galeria, Masonry, PhotoSwipe, descarga y Home.
3. `css/index.css`: sobreescrituras UX/responsive y sistema visual retro de Pixitor.
4. `php/bootstrap.php`: carga Composer, `.env`, configuracion tipada y sesiones seguras.
5. `php/public_config.php`: expone al frontend rutas/limites publicos sin secretos.
6. `php/token_validate.php`: login por token.
7. `php/check_token.php`: validacion de sesion activa.
8. `php/list.php`: listado paginado de imagenes con cache de metadata y thumbnails.
9. `php/media.php`: sirve imagenes y thumbnails solo con sesion valida; `/img` no debe usarse directo desde frontend.
10. `php/gallery_media.php`: helper de thumbnails WebP y rutas relativas.
11. `php/home_slider.php`: imagenes aleatorias para Home.
12. `php/menu.php`: construccion de estructura de menu desde carpetas.
13. `php/zip.php`: descarga ZIP de carpeta.

## Restricciones de arquitectura

1. Mantener JavaScript vanilla; no agregar React/Vue ni bundlers.
2. Mantener PHP procedural simple; no introducir frameworks backend.
3. Conservar rutas relativas porque el proyecto corre bajo `/gallery/` en Apache local.
4. Proteger siempre accesos a `img/` contra path traversal.
5. No exponer `GALLERY_TOKEN` ni valores de `.env` al frontend.
6. Evitar cambios masivos en CSS generado o heredado si basta con sobrescrituras especificas.
7. No enlazar imagenes con `./img/...` desde JS/HTML; usar `php/media.php?path=...`.
8. Mantener `img/.htaccess` bloqueando acceso directo a archivos privados.

## Convenciones actuales

1. JS usa `const`/`let`, funciones internas dentro de `DOMContentLoaded` y `fetch` con JSON.
2. CSS usa clases existentes del tema `pinhole-*` y ajustes custom al final del archivo cuando sea posible.
3. PHP responde JSON con `Content-Type: application/json; charset=utf-8` en endpoints de datos.
4. Los errores de backend deben devolver codigos HTTP claros y payload seguro.
