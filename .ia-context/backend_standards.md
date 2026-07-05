# Backend Standards

## PHP

1. Mantener endpoints pequenos y procedurales en `php/`.
2. Usar `declare(strict_types=1);` en archivos nuevos.
3. Responder JSON con `JSON_UNESCAPED_SLASHES` cuando aplique.
4. Validar entradas de `$_GET` y `$_POST` antes de usarlas.
5. Normalizar carpetas con `trim($value, '/')` y bloquear `..`.
6. Comparar rutas con `realpath` y asegurar que el destino permanezca dentro de `img/`.
7. No imprimir trazas, rutas internas sensibles o tokens al cliente.
8. Usar codigos HTTP significativos: `400` entrada invalida, `401` no autorizado, `403` ruta bloqueada, `404` no existe.
9. No agregar dependencias Composer sin justificarlo.

## Sesion y seguridad

1. El token vive solo en `.env` como `GALLERY_TOKEN`.
2. El frontend nunca debe recibir el token real.
3. Las sesiones deben expirar y ser verificables por `check_token.php`.
4. Cualquier endpoint que lea o descargue imagenes debe validar sesion si el contenido es privado.
5. Las descargas ZIP deben impedir path traversal y limitarse a imagenes permitidas.
6. El frontend debe consumir imagenes privadas mediante `php/media.php`, no rutas directas a `/img`.
7. Mantener `img/.htaccess` con acceso directo denegado.

## Archivos y cache

1. `php/list.php` genera `.meta.json` por carpeta; preservar invalidacion por firma de archivos.
2. No eliminar cache de usuario salvo que la tarea lo pida.
3. Si se modifica deteccion de imagenes, mantener extensiones actuales: jpg, jpeg, png, webp en mayusculas y minusculas.
4. Tratar archivos inexistentes o metadata invalida como caso normal, no como fatal.
5. `php/gallery_media.php` genera thumbnails WebP automaticos en `.thumbs/`; no versionar esos archivos.
6. `php/media.php` usa cache privado con `ETag`/`Last-Modified`; conservar respuesta `304` cuando sea posible.
