# Pixitor UI Design Direction

## Concept

“Archivo digital retro”: minimalismo con guiños de interfaces pixel/arcade, no una recreacion literal de una consola antigua. Conservar la rapidez y legibilidad de una galeria moderna, usando una paleta compacta, tipografia monoespaciada en etiquetas y formas/bordes pixelados como acento.

## Tokens visuales

- Tinta/fondo: `#17151f`
- Panel oscuro: `#24212f`
- Papel/superficie clara: `#f6f0df`
- Linea secundaria: `#393545`
- Lila de accion: `#c5a8ff`
- Rosa de marca/alerta: `#ff5d83`
- Lima para accion positiva: `#c8f169`
- Texto atenuado: `#aaa5b7`
- Sombra pixel: desplazamiento corto, sin blur grande (ej. `6px 6px 0 #0c0b11`)

Los tokens CSS viven en `css/index.css` como variables `--pixitor-*`. Mantener el fondo de codigo animado muy tenue para que no compita con fotos ni texto. El fondo debe seguir usando `--interactive-bg` para reflejar el tema activo; no fijarlo al color tinta. La simulacion de canvas se limita a 30 FPS, reduce densidad de malla y pausa cuando la pestaña no esta visible. El cambio de tema recolorea los glifos existentes sin reiniciar particulas ni crear loops RAF duplicados.

## Marca

- Asset activo: `resources/phpeitor-pixsvg.svg`.
- Palabra principal: `MEDIA`; marca secundaria inferior: trazado original `PHPEITOR`.
- Usar el mismo SVG en encabezado normal, sticky, movil y selector de tema.
- Limitar el wordmark en encabezado a un ancho visual aproximado de 280 px y altura max de 56 px.
- No agregar una segunda firma textual debajo del video de Inicio.
- `resources/phpeitor-dataset.svg` queda como referencia del diseño anterior.

## Inicio y video invitado

- El video es el foco principal de Inicio; eliminar firma redundante y textos vacios alrededor.
- Leer `videoWidth`/`videoHeight` al dispararse `loadedmetadata` y adaptar el marco respetando esa proporcion.
- Ajustar tamano a viewport, sin letterboxing artificial ni recorte; el video debe llenar el marco y mantenerse completo.
- Al cambiar a un album, retirar listeners de resize asociados al video de Inicio.
- Con token, mostrar una sola historia vertical estilo Instagram, no una pila horizontal/achatada: foto protagonista, barras de progreso por elemento, contador y controles prev/next accesibles.
- Eliminar emojis flotantes y adornos/reacciones simuladas. Usar `object-fit: cover` en las historias verticales para llenar el marco.
- Controles anterior/siguiente del slider: controles circulares de 44 px, translúcidos, ubicados hacia los bordes del story; neutralizar `min-width` heredado del tema y conservar foco visible/área táctil.
- Sin token, conservar el video en su propia proporcion y su tarjeta papel/retro sencilla.

## Modales y feedback

- Acceso por token: formulario corto, input oscuro con foco lila, boton lima y spinner inline durante validacion; conservar el panel abierto cuando falle para facilitar reintento.
- Reemplazar el candado 3D flotante por un icono pequeño estatico; un acento verde/lima y check comunican desbloqueo durante la transicion.
- La referencia “En colaboración con WordPress” es metadata secundaria: tamano pequeño, color atenuado, sin protagonismo.
- Modal de subida: panel tinta, borde fino recto, sombra corta dura, tabs/inputs claramente diferenciados y botones de alto contraste.
- Confirmaciones Alertify deben seguir el mismo lenguaje de panel/papel; evitar dialogo blanco generico con radios grandes.
- Progreso de subida: overlay a nivel de viewport con spinner, puntos animados, pasos “Preparando / Enviando / Finalizando” y mensajes rotativos con `setTimeout` mientras se espera. Mantenerlo visible al menos 1800 ms para cargas instantaneas; no inventar porcentaje si el transporte no lo mide. No anidar el overlay dentro del contenido scrollable del modal.
- Mantener scroll interno, botones de cierre claros, focus visible, `aria-live` para estados y respeto a `prefers-reduced-motion`.

## Galeria y limites de implementacion

- Aplicar el lenguaje visual sin renombrar selectores/clases del tema usados por `photo.js`, Masonry o PhotoSwipe.
- Las fotos siguen siendo el contenido dominante: evitar marcos decorativos pesados y preservar el masonry responsive.
- Al cambiar un tema, el color/gradiente del fondo debe cambiar junto con el estilo activo, tanto en Inicio como en galerias.
- JavaScript vanilla, sin dependencias nuevas ni build step.
