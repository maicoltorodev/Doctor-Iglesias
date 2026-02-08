# Arquitectura del Proyecto: Dr. Jorge Iglesias Márquez

Este documento detalla la estructura técnica, la arquitectura de componentes y el flujo de datos del sitio web. El proyecto ha sido diseñado bajo los principios de **Ultra-Rendimiento (Performance-First)** y **Diseño de Lujo (High-End UX)**.

---

## 🏗️ 1. Paradigma de Desarrollo: "Islands Architecture"

Para maximizar el rendimiento y el SEO sin sacrificar las animaciones premium, utilizamos una arquitectura de **Islas de Cliente**.

### Server Components (El 90% del sitio)
La mayoría del sitio (textos, estructuras, imágenes pesadas) se sirve como HTML estático desde el servidor. 
- **Beneficio:** Carga instantánea y SEO perfecto.
- **Ubicación:** `Shell.tsx` de cada sección.

### Client Islands (Interacción Selectiva)
Solo las partes que necesitan reactividad real (animaciones de scroll, sensores de ratón, cursores) son componentes de cliente (`"use client"`).
- **Ejemplo:** `MarbleTriangle.tsx`, `EntranceReveal.tsx`, `CustomCursor.ts`.

---

## 🗺️ 2. Mapa del Proyecto (Estructura de Archivos)

```text
src/
├── app/                  # Rutas y Lógica de Next.js
│   ├── page.tsx          # Switcher: Carga DesktopLayout o MobileLayout
│   ├── layout.tsx        # Chasis Global de la aplicación
│   └── servicio/[slug]/  # Detalle dinámico de cada procedimiento
│
├── components/           # Maquinaria Visual
│   ├── layout/           # Chasis por dispositivo (Escritorio vs Móvil)
│   ├── sections/         # Secciones de la Home (Hero, About, etc.)
│   │   ├── desktop/      # Carpeta por sección: {index, Shell, Marbles}
│   │   └── mobile/       # Versiones optimizadas para touch
│   └── ui/               # Átomos y Componentes reutilizables (Obra, Botones)
│
├── constants/
│   └── content.ts        # CEREBRO DE DATOS: Único sitio para editar contenido
│
├── hooks/                # Lógica de Interacción (Scroll, Cursor)
├── lib/                  # Utilidades de Servidor (Detección de dispositivo)
└── middleware.ts         # Identificador de dispositivo (Porterazo)
```

---

## 🔄 3. El Flujo de Datos (Cadena de Mando)

La información fluye de forma unidireccional para facilitar el mantenimiento:

1.  **EDICIÓN:** El desarrollador edita `src/constants/content.ts`.
2.  **CONEXIÓN:** El `index.tsx` de la sección (ej: `Results/index.tsx`) inyecta los datos.
3.  **ESTRUCTURA:** El `Shell.tsx` recibe los datos y construye el esqueleto HTML estático.
4.  **ANIMACIÓN:** Los componentes de la carpeta `ui/` asumen el control visual y animan el contenido al entrar en el viewport.

---

## 📱 4. Estrategia de Dispositivo (Mirror System)

El sitio no es un "responsive" tradicional de CSS; es un sistema de **dos mundos paralelos conectados por Middleware**.

1.  **Detección:** El `middleware.ts` analiza el User-Agent.
2.  **Server-Side:** Se añade un header `x-is-mobile`.
3.  **Page:** La página principal (`app/page.tsx`) decide qué árbol de componentes renderizar basándose en ese header.

**Resultado:** Un usuario en móvil nunca descarga el código pesado de escritorio (GSAP, Lenis, Custom Cursor), ahorrando batería y datos.

---

## 🎨 5. Anatomía de una Card (`Obra.tsx`)

El componente `Obra` es la unidad básica de diseño. Su composición es:

| Capa | Nombre | Función | Tipo |
| :--- | :--- | :--- | :--- |
| **0** | **Wrapper** | Posicionamiento en el carrusel | Server |
| **1** | **Entrance** | `EntranceReveal`: Sensor de aparición | Client Island |
| **2** | **Chasis** | Contenedor 400x600px con sombra profunda | CSS |
| **3** | **Media** | Imagen optimizada con zoom y hover | Next/Image |
| **4** | **Info** | Títulos y categorías (SEO) | Text/HTML |

---

## ⚙️ 6. Motor de Animación

- **Desktop:** Usamos una combinación de **Lenis** (Scroll suave horizontal) y **Framer Motion** para las micro-animaciones.
- **Mobile:** Usamos **Native CSS Snap** para una experiencia táctil fluida y natural.

---
*Este documento fue generado para documentar la refactorización a Islands Architecture realizada en Febrero 2026.*
