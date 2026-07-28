# Pinhole Gallery 📷
[![forthebadge](http://forthebadge.com/images/badges/uses-css.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

<a href="https://www.instagram.com/amvsoft.tech/">
  <img src="https://cdn.dribbble.com/userupload/36814701/file/original-f485756c337f78411c0767aba0f6596f.jpg" alt="instagram" width="600">
</a>

`Hello Everyone 🙌`

## Resumen

1. `index.html` es la entrada publica de la aplicacion.
2. `js/photo.js` orquesta sesion, menus, Home, galerias, subida, borrado, descarga, temas y lightbox.
3. Los albums viven en `img/`, pero el frontend no debe enlazar esa carpeta directamente.
4. Las imagenes se sirven por `php/media.php` con sesion valida.
5. La metadata y thumbnails se generan bajo demanda para mantener el sitio rapido.
6. El proyecto corre actualmente bajo `/gallery/`, por eso se usan rutas relativas o absolutas con ese prefijo cuando aplica.

## Stack

1. PHP 8+ procedural.
2. Composer con `vlucas/phpdotenv`.
3. JavaScript vanilla.
4. CSS tradicional sin build step.
5. Masonry para layout de galeria.
6. PhotoSwipe para lightbox.
7. GD de PHP para thumbnails WebP.
8. Extension `zip` de PHP para descargas masivas.

## Requisitos

1. PHP 8x o superior.
2. Composer.
3. Extension PHP `gd` habilitada.
4. Extension PHP `zip` habilitada.
5. Apache con `.htaccess` habilitado para este directorio, o reglas equivalentes en el virtual host.
6. Un DocumentRoot que permita servir el proyecto bajo `/gallery/`.

## Instalación

1. Instalar dependencias PHP:

```bash
composer install
```

2. Crear `.env` en la raiz:

```env
GALLERY_TOKEN=token_para_ver_galeria
UPLOAD_TOKEN=token_para_subir_y_eliminar
```

3. Verificar extensiones PHP:

```bash
php -m
```

4. Abrir `http://127.0.0.1/gallery/` o la URL configurada en Apache.

## Flujo Principal

1. El usuario abre `index.html`.
2. `js/photo.js` consulta `php/check_token.php`.
3. Si no hay sesion valida, se muestra el bloqueo y el formulario de token.
4. `php/token_validate.php` valida `GALLERY_TOKEN` y crea una sesion temporal.
5. `php/menu.php` detecta carpetas visibles en `img/` y construye el menu.
6. `php/list.php` pagina imagenes por album y mantiene `.meta.json`.
7. `php/gallery_media.php` genera thumbnails WebP en `.thumbs/`.
8. `php/media.php` sirve imagenes y thumbnails privados con cache HTTP.
9. `php/zip.php` descarga la galeria activa como ZIP bajo sesion valida.

## Estructura

```txt
index.html                  Entrada principal
404.html                    Pagina de error 404
403.html                    Pagina de error 403
css/                        Estilos del tema y customizaciones
js/                         Scripts del tema, galeria y fondo interactivo
php/                        Endpoints PHP procedurales
img/                        Albums privados
resources/                  Iconos, logos y recursos estaticos
vendor/                     Dependencias Composer
.ia-context/                Contexto tecnico para futuras iteraciones
```

## Archivos

1. `js/photo.js`: controlador principal del frontend.
2. `css/index.css`: estilos propios, modal de subida, fondo interactivo, acciones superiores y responsive.
3. `js/script.js`: fondo interactivo usado como capa visual.
4. `php/bootstrap.php`: carga Composer y variables de entorno.
5. `php/token_validate.php`: login de galeria con bloqueo por intentos.
6. `php/upload_token_validate.php`: token de subida/eliminacion con bloqueo por intentos.
7. `php/token_rate_limit.php`: rate limit de tokens por sesion.
8. `php/list.php`: listado paginado, metadata y thumbnails.
9. `php/media.php`: entrega privada de medios.
10. `php/upload.php`: carga de imagenes al album destino.
11. `php/delete_image.php`: eliminacion de imagenes con token de subida valido.
12. `php/create_folder.php`: creacion controlada de albums/subcarpetas.
13. `php/zip.php`: descarga masiva del album activo.

## Albums

Los albums se organizan por carpetas dentro de `img/`.

```txt
img/
  Alejandro/
    foto-1.jpg
    foto-2.webp
  Emma/
    5th/
      foto-1.png
```

Reglas operativas:

1. Se soportan maximo dos niveles: `album/subcarpeta`.
2. Las extensiones soportadas son `jpg`, `jpeg`, `png`, `webp`.
3. `php/menu.php` ignora carpetas internas como `.thumbs`.
4. `php/list.php` crea o actualiza `.meta.json` cuando detecta cambios.
5. El frontend debe usar siempre `php/media.php?path=...` para imagenes privadas.

## Subida

El modal de subida permite:

1. Validar `UPLOAD_TOKEN`.
2. Buscar albums existentes con combobox.
3. Crear album nuevo.
4. Crear subcarpeta opcional.
5. Seleccionar o arrastrar imagenes.
6. Quitar imagenes antes de subir.
7. Eliminar imagenes ya subidas desde la galeria.

La eliminacion requiere sesion de `UPLOAD_TOKEN` activa y pasa por `php/delete_image.php`. Al eliminar, se borra el archivo original, el thumbnail asociado si existe y `.meta.json` para forzar regeneracion.

## Seguridad

1. `GALLERY_TOKEN` y `UPLOAD_TOKEN` viven solo en `.env`.
2. El frontend nunca recibe tokens reales.
3. Los tokens tienen bloqueo por intentos: 3 fallos bloquean 5 minutos.
4. `php/list.php`, `php/media.php`, `php/zip.php`, `php/upload.php` y `php/delete_image.php` validan sesion segun corresponda.
5. Las rutas se normalizan con `trim`, se bloquea `..` y se valida con `realpath`.
6. `img/.htaccess` bloquea acceso directo a medios privados.
7. `.htaccess` bloquea listados de directorios sensibles como `css/`, `js/`, `php/`, `resources/` y `vendor/`.
8. Las paginas `403.html` y `404.html` estan configuradas con `ErrorDocument` bajo `/gallery/`.
9. Si el servidor no respeta `.htaccess`, estas reglas deben moverse al VirtualHost.

## Rendimiento

1. La galeria carga por lotes con `IntersectionObserver`.
2. Masonry se recalcula despues de insertar imagenes y lazy loads.
3. Los thumbnails se generan en WebP con ancho definido por `GALLERY_THUMB_WIDTH`.
4. La metadata se invalida por firma de archivos: nombre, `filemtime`, `filesize` y version de cache.
5. `php/media.php` usa `Cache-Control: private`, `ETag`, `Last-Modified` y respuestas `304`.

## UI UX

1. El Home usa slider visual tipo Instagram con imagenes protegidas.
2. El fondo interactivo se renderiza en `#interactive-background` y se adapta al tema activo.
3. Los temas de color, fuentes y RTL se persisten en `localStorage`.
4. La barra superior muestra cerrar sesion en Home y agrega descarga cuando hay album activo.
5. El logo se mantiene como Pixitor y cambia de contraste por CSS segun tema.

## Operación

### Agregar imágenes manual

1. Copiar archivos dentro de `img/<album>/` o `img/<album>/<subcarpeta>/`.
2. Abrir el album desde el menu.
3. `php/list.php` detecta cambios y actualiza `.meta.json`.
4. Los thumbnails faltantes se generan automaticamente.

### Reemplazar imágenes

Si reemplazas una imagen manteniendo el nombre, cambia `filemtime` o `filesize`; eso invalida la metadata y fuerza nuevo thumbnail.

### Limpiar cache

Para forzar regeneracion manual de un album, elimina su `.meta.json`. No borres `.thumbs/` salvo que necesites regenerar thumbnails completos.

## Desarrollo

1. Mantener PHP procedural simple; no introducir frameworks.
2. Mantener JS vanilla; no agregar bundlers para cambios puntuales.
3. Preferir cambios pequenos y verificables.
4. No enlazar `/img` directamente desde HTML/JS.
5. No versionar `.env`, `vendor/`, imagenes privadas, thumbnails ni caches generados.
6. Ejecutar `php -l php/<archivo>.php` al modificar endpoints PHP.
7. Ejecutar `node --check js/<archivo>.js` al modificar JS.
8. Revisar `.ia-context/` antes de cambios grandes.

## Verificacion

```bash
php -l php/token_validate.php
php -l php/upload_token_validate.php
php -l php/delete_image.php
node --check js/photo.js
node --check js/script.js
```

Validaciones manuales:

1. Login correcto e incorrecto.
2. Bloqueo por 3 intentos fallidos.
3. Navegacion Home y albums por hash.
4. Carga infinita y Masonry.
5. Subida, preview y eliminacion de imagenes.
6. Descarga ZIP de album activo.
7. Acceso directo a `/gallery/img/`, `/gallery/js/`, `/gallery/css/` y rutas inexistentes.

## Licencia

Uso interno o personal segun necesidades del proyecto.