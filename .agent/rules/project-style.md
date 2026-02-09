---
trigger: always_on
---

Este no es un proyecto de web normal, siempre tener en cuenta los siguientes puntos;

1. Separación Total de Plataformas (Desktop vs Mobile)
Código Segregado: Separamos TOTALMENTE el código de Desktop del de Mobile. No solo es un cambio de CSS; son componentes y layouts independientes que se sirven según el dispositivo.
Optimización vía Middleware: El Middleware es el corazón de esta lógica; intercepta la solicitud y decide qué versión de la página entregar, asegurando que el dispositivo solo descargue e hidrate el código que realmente va a usar.
Experiencias Diferenciadas: En Escritorio manejamos el concepto de galería con scroll horizontal y Lenis. En Móvil, el sistema se adapta a una lógica táctil y vertical, cargando solo los assets necesarios para una red móvil.


2. Arquitectura de Islas de Código (Prioridad Server Components)
Server-First: El servidor renderiza la estructura y consume la data del cache del CMS.
Islas de Cliente Mínimas: Los archivos use client se reducen a pequeñas porciones de la UI que necesitan interactividad inmediata (motores de scroll, botones con estado, animaciones).


3. Flujo de Datos y Sistema de Cache (CMS & Server)
ISR & revalidateTag: El sitio es estático por defecto para máxima velocidad, pero se actualiza en tiempo real cuando el administrador cambia algo en el CMS gracias a los tags de revalidación.
Data Hot en el Servidor: La información ya llega "masticada" desde contentService y el cache de base de datos de Next.js.


4. Velocidad y Rendimiento
Todos estos ajustes son en pro de conservar la maxima cantidad de rendimiento, si un cambio, ajuste, idea por añadir rompen este ideal, simplemente no lo vamos a usar.

5. Nada de remiendos o "parches" para arreglar problemas
Si se identifica un problema, no se piensa en solucionarlo se piensa en entender el error, por que esta sucediendo y adaptarse a la arquitectura anteriormente definida para que sea un sistema "clean", entendible y muy eficiente.


5. Concepto de Diseño "Núcleo Central y Espejo" (Escritorio)
Eje Central (INICIO): La página siempre parte desde el centro.
Recorrido Simétrico: [NOSOTROS <- GALERIA <- CONTACTO <- INICIO -> SERVICIOS -> RESULTADOS -> TESTIMONIOS].
Efecto Espejo: El desplazamiento y la aparición de elementos deben sentirse simétricos desde el punto central. (Osea que el scroll de la pagina principal es horizontal, otras paginas si ya se comportan normal con un scroll vertical)



6. Estética Premium y Detalle Técnico
Visual Excellence: Uso de texturas de mármol, sombras profundas, tipografía moderna y micro-animaciones fluidas (GSAP/Lenis).

6. Autoridad
Si no entiendes algo o no quedo claro algo por favor preguntar antes de asumir.