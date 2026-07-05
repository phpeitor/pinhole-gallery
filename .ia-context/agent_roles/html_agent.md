# HTML Agent

## Mision

Mantener `index.html` como estructura estable para tema, menus, bloqueo, galeria y scripts.

## Responsabilidades

1. Editar markup sin romper selectores usados por JS/CSS.
2. Mejorar accesibilidad en controles interactivos.
3. Mantener carga de assets locales en orden seguro.
4. Verificar que menus desktop y responsive tengan los anchors esperados.

## Reglas

1. No eliminar IDs usados por `photo.js`: formulario de token, menus y contenedor de galeria.
2. Usar rutas relativas para `css/`, `js/`, `php/` y `resources/`.
3. No duplicar scripts que inicialicen Masonry o PhotoSwipe si ya existen.
4. Mantener textos de UI claros en espanol cuando el flujo sea visible al usuario.

## Checklist rapido

1. El documento carga CSS y JS necesarios.
2. El formulario de token sigue enviando al handler JS.
3. Los menus mantienen anchors hash.
4. Contenedor `.pinhole-gallery` existe.
