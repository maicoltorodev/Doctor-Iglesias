# Arquitectura de Componentes UI - Separación Total de Plataformas

## Estructura de Carpetas

```
src/components/ui/
├── desktop/                    # EXCLUSIVO PARA ESCRITORIO
│   ├── CustomCursor.tsx        # Cursor personalizado con física
│   ├── EditorialCard.tsx       # Editorial con tipografía grande (text-[90px])
│   ├── EntranceReveal.tsx      # Revelado de entrada basado en scroll horizontal
│   ├── MarbleTriangle.tsx      # Triángulos de mármol decorativos
│   ├── Obra.tsx                # Tarjeta de galería/obra
│   └── SectionArrow.tsx        # Flecha de navegación animada
│
├── mobile/                     # EXCLUSIVO PARA MÓVIL
│   ├── EditorialCard.tsx       # Editorial optimizado (text-4xl)
│   └── EntranceReveal.tsx      # Revelado de entrada basado en scroll vertical
│
├── FloatingAction/             # SEGREGADO POR PLATAFORMA
│   ├── Desktop.tsx             # Wrapper que consume DesktopScrollContext
│   ├── Mobile.tsx              # Wrapper que consume MobileScrollContext
│   └── UI.tsx                  # Componente visual puro (sin lógica de plataforma)
│
└── [Componentes Compartidos]   # AGNÓSTICOS DE PLATAFORMA
    ├── Accordion.tsx           # Interacción pura, sin motor de scroll
    ├── BackLink.tsx            # Navegación simple
    └── CtaButton.tsx           # Botón de acción
```

## Reglas de Importación

### Desktop Sections
```tsx
// ✅ CORRECTO
import { EntranceReveal } from '@/components/ui/desktop/EntranceReveal';
import { EditorialCard } from '@/components/ui/desktop/EditorialCard';
import { SectionArrow } from '@/components/ui/desktop/SectionArrow';

// ❌ INCORRECTO - No importar desde raíz o mobile
import { EntranceReveal } from '@/components/ui/EntranceReveal';
import { EditorialCard } from '@/components/ui/mobile/EditorialCard';
```

### Mobile Sections
```tsx
// ✅ CORRECTO
import { EntranceReveal } from '@/components/ui/mobile/EntranceReveal';
import { EditorialCard } from '@/components/ui/mobile/EditorialCard';

// ❌ INCORRECTO - No importar desde raíz o desktop
import { EntranceReveal } from '@/components/ui/EntranceReveal';
import { Obra } from '@/components/ui/desktop/Obra';
```

### Componentes Compartidos
```tsx
// ✅ CORRECTO - Importar desde raíz para componentes agnósticos
import { Accordion } from '@/components/ui/Accordion';
import { CtaButton } from '@/components/ui/CtaButton';
import { BackLink } from '@/components/ui/BackLink';
```

## Diferencias Clave entre Plataformas

### EditorialCard

| Aspecto         | Desktop                  | Mobile                 |
|-----------------|--------------------------|------------------------|
| Título          | `text-[90px]`            | `text-4xl`             |
| Spacing         | `space-y-20`             | `space-y-6`            |
| Min Width       | `min-w-[450px]`          | Sin mínimo             |
| Viewport Margin | `-100px`                 | `-50px`                |

### EntranceReveal

| Aspecto         | Desktop                             | Mobile                        |
|-----------------|-------------------------------------|-------------------------------|
| Contexto        | `useDesktopScroll()`                | `useMobileScroll()`           |
| Trigger         | `visibleSections` + `activeIndex`   | `activeIndex` comparación     |
| Dirección       | `up`, `down`, `left`, `right`       | Solo `up`                     |

## Beneficios de esta Arquitectura

1. **Bundle Splitting Automático**: Next.js solo incluye el código de la plataforma en uso.
2. **Zero Cross-Contamination**: Desktop nunca carga código de mobile y viceversa.
3. **Type Safety**: Los imports incorrectos fallan en compilación, no en runtime.
4. **Performance**: Cada plataforma optimiza sus propios componentes sin compromisos.
5. **Maintainability**: La ubicación del archivo define claramente su propósito.

## Migración de Componentes Compartidos

Si en el futuro un componente compartido necesita variantes de plataforma:

1. Crear versión `desktop/NombreComponente.tsx`
2. Crear versión `mobile/NombreComponente.tsx`
3. Eliminar la versión compartida de la raíz
4. Actualizar imports en las secciones correspondientes

## Verificación de Separación

Para confirmar que la separación está completa:

```bash
# Desktop no debe importar desde mobile/
grep -r "@/components/ui/mobile" src/components/sections/desktop

# Mobile no debe importar desde desktop/
grep -r "@/components/ui/desktop" src/components/sections/mobile

# Ambos comandos deben retornar 0 resultados
```
