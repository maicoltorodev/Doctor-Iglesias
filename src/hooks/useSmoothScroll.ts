import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Lenis from 'lenis';

interface NavLink {
    id: string;
    index: number;
    label: string;
    isLogo?: boolean;
}

export const useSmoothScroll = (navLinks: NavLink[] = []) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const [activeIndex, setActiveIndex] = useState(3); // Iniciamos en Hero (Index 3 por defecto)
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

    // Generar indexMap dinámicamente desde navLinks
    const indexMap = useMemo(() => {
        const map: Record<string, number> = {};
        navLinks.forEach(link => {
            map[link.id] = link.index;
        });
        return map;
    }, [navLinks]);

    // 1. Intersection Observer para visibilidad
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
                        const id = entry.target.id;
                        setVisibleSections((prev) => ({ ...prev, [id]: true }));
                    }
                });
            },
            { threshold: 0.01, root: null }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    // Cache de posiciones de secciones para evitar lecturas constantes del DOM
    const sectionPositions = useRef<{ id: string, start: number, end: number }[]>([]);

    const updateSectionCache = useCallback(() => {
        const sections = document.querySelectorAll("section[id]");
        sectionPositions.current = Array.from(sections).map((section) => {
            const s = section as HTMLElement;
            return {
                id: s.id,
                start: s.offsetLeft,
                end: s.offsetLeft + s.offsetWidth
            };
        });
    }, []);

    const updateActiveIndexLocal = useCallback((currentScroll: number) => {
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
        let maxVisibleWidth = 0;
        let activeId = "";

        sectionPositions.current.forEach((pos) => {
            const visibleWidth = Math.max(
                0,
                Math.min(pos.end, currentScroll + viewportWidth) -
                Math.max(pos.start, currentScroll)
            );

            if (visibleWidth > maxVisibleWidth) {
                maxVisibleWidth = visibleWidth;
                activeId = pos.id;
            }
        });

        if (activeId && indexMap[activeId] !== undefined) {
            setActiveIndex(indexMap[activeId]);
            setVisibleSections((prev) => ({ ...prev, [activeId]: true }));
        }
    }, [indexMap]);

    // 2. Inicialización de Lenis Horizontal (Lujo Absoluto)
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Inicializar caché
        updateSectionCache();
        window.addEventListener('resize', updateSectionCache);

        const lenis = new Lenis({
            wrapper: container,
            content: container,
            orientation: 'horizontal',
            gestureOrientation: 'both',
            smoothWheel: true,
            wheelMultiplier: 1.1,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenisRef.current = lenis;

        // Escuchar scroll para actualizar índice (Mucho más eficiente que RAF constante)
        lenis.on('scroll', (e: { scroll: number }) => {
            updateActiveIndexLocal(e.scroll);
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Posicionamiento Inicial en Hero
        setTimeout(() => {
            const hero = document.getElementById('hero');
            if (hero) {
                lenis.scrollTo(hero, { immediate: true });
                updateActiveIndexLocal(hero.offsetLeft);
            }
        }, 100);

        return () => {
            lenis.destroy();
            window.removeEventListener('resize', updateSectionCache);
        };
    }, [updateActiveIndexLocal, updateSectionCache]);

    const scrollToSection = (id: string) => {
        const targetElement = document.getElementById(id);

        // Buscamos el índice para saber si es lado izquierdo o derecho
        const index = indexMap[id] !== undefined ? indexMap[id] : 3;

        // Lógica simétrica del Doctor:
        // - Lado Derecho (Servicios, Resultados...): -100 (Margen izquierdo)
        // - Lado Izquierdo (Nosotros, Galería...): 100 (Margen opuesto)
        // - Centro (Hero): 0
        let offset = 0;
        if (targetElement) {
            if (index > 3) {
                // Lado Derecho: Alinear con 500px de margen izquierdo
                offset = -500;
            } else if (index < 3) {
                // Lado Izquierdo: Alinear con 500px de margen derecho
                // Offset = AnchoElemento - AnchoPantalla + Margen(500)
                offset = (targetElement as HTMLElement).offsetWidth - window.innerWidth + 500;
            }
        }

        if (targetElement && lenisRef.current) {
            lenisRef.current.scrollTo(targetElement, {
                offset: offset,
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    };

    return {
        scrollContainerRef,
        activeIndex,
        visibleSections,
        scrollToSection,
    };
};
