# IA Context

Carpeta de contexto operativo para que los agentes mantengan continuidad entre iteraciones del proyecto.

## Uso rapido

1. Leer `project_context.md` antes de proponer cambios.
2. Elegir el rol principal desde `agent_roles/` segun el tipo de tarea.
3. Aplicar `frontend_standards.md`, `backend_standards.md` y `iteration_workflow.md` durante la implementacion.
4. Cerrar cada cambio con `qa_checklist.md`.

## Stack detectado

1. PHP 8+ con Composer y `vlucas/phpdotenv`.
2. Frontend HTML, CSS y JavaScript vanilla.
3. Galeria con Masonry, PhotoSwipe, carga infinita y rutas por hash.
4. Autenticacion privada por token en sesion PHP.
5. Recursos estaticos en `resources/`, galerias en `img/` y endpoints en `php/`.

## Regla principal

Hacer cambios pequenos, verificables y coherentes con la estructura actual. No introducir frameworks, build steps o dependencias nuevas sin una necesidad clara.
