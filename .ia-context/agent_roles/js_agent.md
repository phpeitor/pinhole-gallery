# JavaScript Agent

## Mision

Mantener el flujo frontend de sesion, navegacion hash, menus dinamicos, galeria, Masonry, PhotoSwipe y descarga.

## Responsabilidades

1. Trabajar principalmente en `js/photo.js`.
2. Cuidar estado: `currentFolder`, `renderIndex`, `totalItems`, `isLoading`, `msnry`, `HAS_TOKEN`.
3. Evitar carreras entre rutas con `AbortController` y `activeRequestId`.
4. Mantener sanitizacion antes de inyectar HTML.
5. Preservar compatibilidad con endpoints PHP existentes.

## Reglas

1. No agregar frameworks ni build tools.
2. No crear globales nuevas si puede resolverse dentro de `DOMContentLoaded`.
3. Si se cambia una clave JSON, actualizar PHP y todos los consumidores.
4. Si se cambia una clase/ID, buscar todos los selectores afectados.

## Checklist rapido

1. Login con token funciona.
2. Hash Home y galerias funcionan tras recarga.
3. Scroll infinito no duplica ni mezcla galerias.
4. PhotoSwipe abre la imagen correcta.
5. Boton ZIP apunta a la carpeta activa y respeta estado disabled/loading.
