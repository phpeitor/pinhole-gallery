# Pinhole Gallery 📷
[![forthebadge](http://forthebadge.com/images/badges/uses-css.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

<a href="https://www.instagram.com/amvsoft.tech/">
  <img src="https://cdn.dribbble.com/userupload/36814701/file/original-f485756c337f78411c0767aba0f6596f.jpg" alt="Instagram" width="600">
</a>

Galeria de imagenes privada con autenticacion por token, carga infinita por lotes, layout masonry y visor de imagenes tipo lightbox.

`Hello Everyone 🙌`

## Resumen

Este proyecto corre sobre PHP y frontend vanilla JS. El acceso a las galerias esta protegido por token de sesion y las imagenes se cargan de forma progresiva para mejorar rendimiento.

Flujo principal:

1. Usuario ingresa token.
2. Backend valida contra variable de entorno.
3. Se crea sesion temporal.
4. Frontend carga lotes de fotos y renderiza Masonry + PhotoSwipe.

## Requisitos

1. PHP 8 o superior.
2. Composer.
3. Servidor local (Apache, XAMPP, Laragon o similar) apuntando al directorio del proyecto.

## Instalacion

1. Instalar dependencias de PHP:

```bash
composer install
```

2. Crear archivo .env en la raiz del proyecto con:

```env
GALLERY_TOKEN=tu_token_secreto
```

3. Publicar el proyecto en tu servidor local. Ejemplo de URL:

http://127.0.0.1/gallery/

## Estructura importante

1. index.html: layout base y sidebar de token.
2. js/photo.js: logica principal de sesion, galerias, masonry, scroll infinito y Home.
3. css/index.css: estilos custom y mejoras UX recientes.
4. php/token_validate.php: valida token contra .env y crea sesion de 12 horas.
5. php/check_token.php: confirma vigencia de sesion.
6. php/list.php: lista imagenes por carpeta y genera cache de metadatos.
7. php/zip.php: descarga masiva de la galeria actual.

## Mejoras implementadas

### Estabilidad de galeria

1. Correccion de bug de espacios en blanco en el flujo infinito.
2. Prevencion de conflictos entre instancias de Masonry.
3. Sanitizacion de width/height de imagen para evitar layouts rotos por metadata invalida.
4. Relayout mas robusto tras carga de imagenes lazy.

### Navegacion Home

1. Ruta Home dedicada en hash (home/inicio).
2. Vista central con video resources/video.mp4.
3. Descripcion de proyecto debajo del video.
4. Limpieza de estado al volver a Home (sin titulo/contador de galeria previa).

### UX de acciones rapidas

1. Boton de cerrar sesion movido arriba a la derecha con icono resources/close.webp.
2. Boton de descarga reemplazado por icono resources/download.webp.
3. Tooltips visuales para ambas acciones.
4. Animacion de llamada a la accion en descarga.
5. Estado deshabilitado/cargando del boton de descarga.
6. La barra de acciones se oculta cuando:
   1. No hay sesion valida.
   2. El usuario esta en Home.

### Detalles visuales adicionales

1. Icono resources/locked.png con efecto de flotacion y hover suave.
2. Ajustes responsive para Home y barra de acciones.

## Como usar

1. Abrir la URL del proyecto.
2. Ingresar token en el sidebar.
3. Seleccionar una galeria desde el menu.
4. Hacer scroll para cargar mas fotos automaticamente.
5. Usar el icono de descarga para bajar toda la galeria activa.
6. Usar el icono de cerrar sesion para invalidar la sesion.

## Seguridad

1. El token real no se guarda en frontend.
2. La validacion se hace en backend con variable de entorno.
3. Las sesiones expiran en 12 horas.
4. Se evita path traversal en el listado de imagenes.

## Notas

1. Si cambias imagenes dentro de una carpeta, php/list.php reconstruye cache de metadatos en .meta.json.
2. Si el navegador no refleja cambios de JS/CSS, hacer recarga forzada (Ctrl+F5).

## Licencia

Uso interno o personal segun necesidades del proyecto.