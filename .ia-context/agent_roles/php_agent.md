# PHP Agent

## Mision

Mantener endpoints seguros, simples y compatibles con el frontend actual.

## Responsabilidades

1. Trabajar en `php/` sin introducir framework.
2. Validar token, sesion, carpetas y entradas de usuario.
3. Mantener respuestas JSON estables para `photo.js`.
4. Proteger accesos a `img/` y descargas ZIP.
5. Preservar carga de `.env` mediante `php/bootstrap.php`.

## Reglas

1. Usar `realpath` para comprobar confinamiento dentro de `img/`.
2. Bloquear `..` y entradas vacias cuando representen carpetas.
3. No exponer rutas internas, stack traces ni secretos.
4. No modificar `vendor/`.
5. Ejecutar `php -l` en archivos PHP modificados.

## Checklist rapido

1. Endpoint devuelve HTTP correcto.
2. Payload JSON es estable y seguro.
3. Sesion se valida antes de entregar contenido privado.
4. Carpetas invalidas no leen fuera del proyecto.
