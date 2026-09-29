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
6. Token valido: boton de acceso muestra spinner durante validacion y estado de desbloqueo breve; imagen del candado recupera color a escala contenida.
7. Token invalido o error de red: spinner termina, error legible aparece y panel queda abierto para reintentar.

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
5. `.env.example` contiene claves/placeholders sin valores secretos; `php/public_config.php` nunca incluye tokens.
6. Endpoints usan `startAppSession()` y el cambio de TTL/rate-limit/thumbs respeta valores de `.env`.

## Responsive

1. Desktop: menu, acciones superiores y masonry funcionan.
2. Mobile: menu responsive, bloqueo, Home y galeria no se desbordan.
3. Estados hover/focus no son la unica forma de descubrir controles.

## Identidad Pixitor / UX

1. Inicio sin token: el video usa su proporcion intrinseca, llena el marco y no muestra barras negras ni la firma “– Phpeitor”.
2. Cambiar el tamano del viewport mantiene el video centrado, completo y dentro de la pantalla.
3. Todos los nombres de video seleccionados existen; simular/fallar una fuente muestra spinner, intenta otra y acaba en fallback legible, nunca en panel negro.
4. El logo muestra MEDIA con el trazado PHPEITOR debajo y conserva un tamano contenido en header desktop/mobile.
5. Modal de subida, confirmacion Alertify y overlay de progreso comparten el lenguaje retro/pixel: superficies tinta/papel, bordes rectos y sombra dura sutil.
6. Verificar contraste, foco de teclado, scroll del modal y `prefers-reduced-motion`.
7. Home con token: una sola historia vertical visible, imagen no achatada, indicadores sincronizados y botones anterior/siguiente funcionales; no emojis flotantes.
8. Controles anterior/siguiente permanecen circulares (44 × 44 px), no se estiran por el CSS global del tema y conservan foco visible/área táctil.
9. Cambiar entre temas claro, oscuro y gradientes actualiza el fondo de Home y galerias.
10. En subida, para padres con solo subalbums aparece el padre y se puede crear una subcarpeta de segundo nivel.
11. Confirmar una subida muestra el overlay inmediatamente, anima los puntos, rota mensajes de espera y lo oculta al terminar tanto en exito como en error.
12. Cambiar color durante la animacion recolorea glifos sin congelar/reiniciar la simulacion; al cambiar pestaña, la animacion se pausa y luego se reanuda.
13. El cambio de tema actualiza color de fondo y glifos sin duplicar loops RAF.
14. `php/public_config.php` solo entrega endpoints/limites publicos; revisar que ningun token aparezca en HTML, JS ni respuesta de config.
