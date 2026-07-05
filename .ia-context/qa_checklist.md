# QA Checklist

## General

1. Abrir `http://127.0.0.1/gallery/` o ruta local equivalente.
2. Verificar que no haya errores en consola.
3. Hacer recarga forzada si se tocaron CSS/JS.
4. Confirmar que rutas relativas siguen funcionando.

## Autenticacion

1. Sin sesion: debe mostrarse bloqueo y formulario de token.
2. Token vacio: debe marcar error sin enviar flujo valido.
3. Token invalido: debe rechazar y mostrar feedback.
4. Token valido: debe desbloquear y permitir navegar galerias.
5. Logout: debe cerrar sesion y ocultar acciones de galeria.

## Galeria

1. Home no debe mostrar contador ni acciones de descarga.
2. Una galeria debe cargar primer lote con titulo correcto.
3. Scroll infinito debe cargar mas items sin duplicados.
4. Masonry debe relayout tras cargar imagenes lazy.
5. Galeria vacia debe mostrar estado vacio claro.
6. PhotoSwipe debe abrir, navegar y respetar dimensiones.
7. Descarga debe estar deshabilitada cuando no hay galeria activa.

## Backend

1. `php -l php/<archivo>.php` para PHP modificado.
2. Endpoints JSON deben conservar `Content-Type` correcto.
3. Carpetas invalidas o con `..` deben ser bloqueadas.
4. Cambios en imagenes deben invalidar `.meta.json` cuando aplique.

## Responsive

1. Desktop: menu, acciones superiores y masonry funcionan.
2. Mobile: menu responsive, bloqueo, Home y galeria no se desbordan.
3. Estados hover/focus no son la unica forma de descubrir controles.
