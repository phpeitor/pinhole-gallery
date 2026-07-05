# Project Context

## Objetivo del proyecto

Galeria privada de imagenes con acceso por token, menu dinamico, carga infinita por lotes, layout masonry, lightbox PhotoSwipe y descarga masiva por galeria.

## Flujo principal

1. El usuario abre `index.html`.
2. `js/photo.js` valida si existe una sesion activa con `php/check_token.php`.
3. Si no hay sesion, se muestra el bloqueo y se solicita token.
4. `php/token_validate.php` valida el token contra `.env` y crea sesion temporal.
5. `php/menu.php` entrega las galerias disponibles.
6. `php/list.php` pagina imagenes por carpeta y genera/usa `.meta.json`.
7. El frontend renderiza items, activa Masonry, maneja scroll infinito y abre PhotoSwipe.
8. `php/zip.php` permite descargar la galeria activa.

## Archivos clave

1. `index.html`: markup base, menus, contenedor de galeria y dependencias del tema.
2. `js/photo.js`: estado de sesion, rutas hash, menus, render de galeria, Masonry, PhotoSwipe, descarga y Home.
3. `css/index.css`: estilos del tema y customizaciones UX/responsive.
4. `php/bootstrap.php`: carga Composer y variables `.env`.
5. `php/token_validate.php`: login por token.
6. `php/check_token.php`: validacion de sesion activa.
7. `php/list.php`: listado paginado de imagenes con cache de metadata.
8. `php/menu.php`: construccion de estructura de menu desde carpetas.
9. `php/zip.php`: descarga ZIP de carpeta.

## Restricciones de arquitectura

1. Mantener JavaScript vanilla; no agregar React/Vue ni bundlers.
2. Mantener PHP procedural simple; no introducir frameworks backend.
3. Conservar rutas relativas porque el proyecto corre bajo `/gallery/` en Apache local.
4. Proteger siempre accesos a `img/` contra path traversal.
5. No exponer `GALLERY_TOKEN` ni valores de `.env` al frontend.
6. Evitar cambios masivos en CSS generado o heredado si basta con sobrescrituras especificas.

## Convenciones actuales

1. JS usa `const`/`let`, funciones internas dentro de `DOMContentLoaded` y `fetch` con JSON.
2. CSS usa clases existentes del tema `pinhole-*` y ajustes custom al final del archivo cuando sea posible.
3. PHP responde JSON con `Content-Type: application/json; charset=utf-8` en endpoints de datos.
4. Los errores de backend deben devolver codigos HTTP claros y payload seguro.
