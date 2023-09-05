# Sistema de tareas con notificación a Wh
Sistema que permite desde un sitio web gestionar tares de manera rápida y sencilla; además, permite recibir notificaciones mediante whatsapp.

**Estado**: *En progreso.*

**Tecnologías**: *ReactJS(Vite), Chakra UI, JWT*

## Historia de usuario
### Gestión de la sesión
El sistema me debe permitir darme de alta.
- C.A.1 Presentar campos obligatorios en el que especifique la siguiente información: primer nombre, primer apellido, numero de telefono asociado a whatsapp y la clave; además, me debe mostrar los siguientes campos opcionales: segundo nombre y segundo apellido.

- C.A.2 Guardar la sesión para que no tenga que iniciar sesión cada vez que ingrese a sistema.

### Gestión de la taréa
El sistema me debe permitir crear una tarea.
- C.A.1 especificando el titulo, la descripción, la fecha de límite de la taréa y si debe notificarme, si así, lo deseo.

- C.A.2 Se debe notificar **una vez** N(1-3) días antes de la fecha límite de la taréa, en caso que lo especifique al momento de crearla.