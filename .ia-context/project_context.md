# Project Context

## Objetivo del proyecto

Galeria privada de imagenes con acceso por token, menu dinamico, carga infinita por lotes, layout masonry, lightbox PhotoSwipe y descarga masiva por galeria.

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
3. `css/index.css`: estilos del tema y customizaciones UX/responsive.
4. `php/bootstrap.php`: carga Composer y variables `.env`.
5. `php/token_validate.php`: login por token.
6. `php/check_token.php`: validacion de sesion activa.
7. `php/list.php`: listado paginado de imagenes con cache de metadata y thumbnails.
8. `php/media.php`: sirve imagenes y thumbnails solo con sesion valida; `/img` no debe usarse directo desde frontend.
9. `php/gallery_media.php`: helper de thumbnails WebP y rutas relativas.
10. `php/home_slider.php`: imagenes aleatorias para Home.
11. `php/menu.php`: construccion de estructura de menu desde carpetas.
12. `php/zip.php`: descarga ZIP de carpeta.

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
