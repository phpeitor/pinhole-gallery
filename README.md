# Pinhole Gallery 📷
[![forthebadge](http://forthebadge.com/images/badges/uses-css.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

<a href="https://www.instagram.com/amvsoft.tech/">
  <img src="https://cdn.dribbble.com/userupload/36814701/file/original-f485756c337f78411c0767aba0f6596f.jpg" alt="instagram" width="600">
</a>

`Hello Everyone 🙌`

Galeria privada de imágenes, el proyecto prioriza acceso protegido por token, carga progresiva, thumbnails automaticos, UX tipo instagram en home y visualización optimizada con masonry + photoswipe.

## Flujo principal:

1. El usuario abre `index.html`.
2. `js/photo.js` consulta `php/check_token.php` para saber si existe sesion valida.
3. Si no hay sesion, se muestra el bloqueo y el formulario de token.
4. `php/token_validate.php` valida el token contra `GALLERY_TOKEN` en `.env`.
5. `php/menu.php` construye el menu desde carpetas dentro de `img/`.
6. `php/list.php` devuelve imágenes paginadas por galeria y genera metadata cacheada.
7. `php/gallery_media.php` genera thumbnails WebP automaticos en `.thumbs/`.
8. `js/photo.js` renderiza thumbnails por lotes, usa Masonry para layout y PhotoSwipe para lightbox.
9. Las imágenes privadas se sirven mediante `php/media.php`, no directamente desde `/img`.
10. `php/zip.php` permite descargar la galeria activa como ZIP bajo sesion valida.

## Stack

1. PHP 8+.
2. Composer.
3. `vlucas/phpdotenv` para variables de entorno.
4. JS.
5. CSS tradicional sin preprocesador.
6. Masonry para layout de galeria.
7. PhotoSwipe para lightbox.
8. GD de PHP para generar thumbnails WebP.

## Requisitos

1. PHP 8 o superior.
2. Composer.
3. Extension PHP `gd` habilitada.
4. Extension PHP `zip` habilitada para descargas masivas.
5. Un servidor compatible con PHP apuntando al directorio del proyecto.
6. Regla equivalente para bloquear acceso directo a `img/` si el servidor no interpreta `.htaccess`.

## Instalación

1. Instalar dependencias PHP:

```bash
composer install
```

2. Crear `.env` en la raiz del proyecto:

```env
GALLERY_TOKEN=tu_token_secreto
```

3. Publicar la carpeta en el servidor PHP elegido.

4. Abrir la URL configurada para el proyecto.

## Estructura

```txt
index.html
css/
js/
php/
img/
resources/
vendor/
.ia-context/
```

Archivos clave:

1. `index.html`: estructura base, menus, contenedor de galeria y sidebar de token.
2. `js/photo.js`: orquestacion frontend de sesion, Home, menus, galeria, scroll infinito, Masonry, PhotoSwipe y descarga.
3. `css/index.css`: estilos custom, Home slider, placeholders, acciones superiores y responsive.
4. `php/bootstrap.php`: carga Composer y `.env`.
5. `php/token_validate.php`: valida token y crea sesion temporal.
6. `php/check_token.php`: confirma sesion vigente.
7. `php/menu.php`: genera menu desde carpetas visibles en `img/`.
8. `php/list.php`: lista imágenes por carpeta, pagina resultados y genera `.meta.json`.
9. `php/gallery_media.php`: helper compartido para thumbnails WebP y rutas relativas.
10. `php/media.php`: sirve imágenes privadas bajo sesion valida con cache HTTP privado.
11. `php/home_slider.php`: devuelve hasta 5 imágenes aleatorias para el Home.
12. `php/zip.php`: genera ZIP de la galeria activa.
13. `img/.htaccess`: bloquea acceso directo a imágenes cuando el servidor lo soporta.

## Galerias

Las galerias se organizan por carpetas dentro de `img/`.

Ejemplo:

```txt
img/
  Emma/
    5th/
      1.JPG
      2.JPG
  Alaia/
    1th/
      1.JPG
```

`php/menu.php` detecta carpetas visibles y genera grupos/items de menu automaticamente.

## Rendimiento

### Carga por lotes

La galeria no carga todas las imágenes al inicio. `js/photo.js` usa lotes de 12 imágenes y `IntersectionObserver` para cargar mas antes de que el usuario llegue al final.

Esto evita:

1. Saturar la red.
2. Crear demasiados nodos DOM al mismo tiempo.
3. Bloquear Masonry con muchas imágenes grandes.
4. Penalizar galerias pesadas como `Emma/5th`.

### Thumbnails automaticos

Cuando `php/list.php` reconstruye metadata, tambien genera thumbnails WebP en `.thumbs/`.

La verificacion usa:

1. Nombre del archivo original.
2. `filemtime`.
3. `filesize`.
4. Ancho configurado del thumbnail.

Si el thumbnail existe y la imagen no cambio, se reutiliza. Si agregas o reemplazas una imagen, se genera solo lo necesario.

### Cache de imágenes privadas

`php/media.php` sirve imágenes bajo sesion valida y agrega:

1. `Cache-Control: private, max-age=86400`.
2. `ETag`.
3. `Last-Modified`.
4. Respuesta `304 Not Modified` cuando aplica.

Esto mantiene privacidad sin perder cache del navegador.

## Home

El Home usa `php/home_slider.php` para mostrar hasta 5 imágenes aleatorias desde `img/`.

Caracteristicas:

1. Slider visual tipo Instagram.
2. Tarjeta central y tarjetas laterales rotadas.
3. Barras estilo stories.
4. Emojis decorativos minimalistas.
5. imágenes no clickeables.
6. Uso de thumbnails protegidos por `php/media.php`.

## Seguridad

El proyecto aplica varias capas de proteccion:

1. El token real vive solo en `.env`.
2. El frontend nunca recibe `GALLERY_TOKEN`.
3. Los endpoints privados validan sesion.
4. `php/list.php` no entrega metadata sin sesion.
5. `php/media.php` no sirve imágenes sin sesion.
6. `php/zip.php` no genera descargas sin sesion.
7. Las rutas se validan con `realpath` y bloqueo de `..`.
8. El acceso directo a `img/` queda bloqueado por `img/.htaccess` en servidores compatibles.
9. El frontend no debe enlazar `./img/...`; debe usar `php/media.php?path=...`.
10. Los ZIP solo incluyen extensiones permitidas: `jpg`, `jpeg`, `png`, `webp`.

Importante: si usas un servidor que no interpreta `.htaccess`, configura una regla equivalente para denegar acceso directo a `img/`.

## Uso

1. Abrir la URL del proyecto.
2. Ingresar token.
3. Navegar desde el menu de galerias.
4. Hacer scroll para cargar mas imágenes.
5. Abrir imágenes en lightbox.
6. Descargar la galeria activa con el boton superior.
7. Cerrar sesion con el boton de logout.

## Operacion

### Agregar imágenes

1. Copiar imágenes dentro de la carpeta de galeria correspondiente.
2. Abrir la galeria desde el menu.
3. `php/list.php` detecta cambios y actualiza `.meta.json`.
4. Los thumbnails faltantes se generan automaticamente.

### Reemplazar imágenes

Si reemplazas una imagen manteniendo el mismo nombre, cambia `filemtime` o `filesize`, por lo que se genera un thumbnail nuevo.

### Cache local

Si el navegador no refleja cambios de JS/CSS, hacer recarga forzada.

Si una imagen fue reemplazada y el navegador mantiene cache, cambiar el archivo o limpiar cache del navegador deberia forzar la actualizacion por `ETag`/`Last-Modified`.

## Contexto IA

`.ia-context/` contiene contexto operativo para futuras iteraciones:

1. Roles de agentes por area.
2. Estandares frontend/backend.
3. Checklist QA.
4. Flujo de iteracion.
5. Reglas de seguridad del proyecto.

Antes de cambios grandes, revisar esa carpeta para mantener consistencia tecnica.

## Notas de Desarrollo

1. No agregar frameworks si el cambio se puede resolver con PHP y JS.
2. No usar rutas directas a `img/` desde frontend.
3. No versionar imágenes, thumbnails ni dependencias generadas.
4. Mantener endpoints PHP pequenos y explicitos.
5. Preferir cambios incrementales y verificables.

## Licencia

Uso interno o personal segun necesidades del proyecto.
