import { useEffect, useRef, useCallback, useMemo } from "react";
import Lenis from 'lenis';
import { useDesktopScroll } from "@/components/providers/DesktopScrollProvider";

export const useSmoothScroll = () => {
    const {
        navLinks,
        scrollContainerRef,
        setActiveIndex,
        setVisibleSections,
        activeIndex
    } = useDesktopScroll();

    const lenisRef = useRef<Lenis | null>(null);

    // 1. Mapa de índices para búsqueda rápida
    const indexMap = useMemo(() => {
        const map: Record<string, number> = {};
        navLinks.forEach(link => {
            map[link.id] = link.index;
        });
        return map;
    }, [navLinks]);

    // 2. Cache de posiciones (Root Cause Fix: Usamos cálculos reales en lugar de Observer)
    const sectionPositions = useRef<{ id: string, start: number, end: number }[]>([]);

    const updateSectionCache = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const sections = container.querySelectorAll("section[id]");
        sectionPositions.current = Array.from(sections).map((section) => {
            const s = section as HTMLElement;
            return {
                id: s.id,
                start: s.offsetLeft,
                end: s.offsetLeft + s.offsetWidth
            };
        });
    }, [scrollContainerRef]);

    // 3. Lógica de visibilidad manual (MUCHO más robusta para horizontal)
    const updateVisibility = useCallback((currentScroll: number) => {
        const viewportWidth = window.innerWidth;
        const buffer = viewportWidth * 0.5; // Margen de carga anticipada

        let maxVisibleWidth = 0;
        let activeId = "";
        const newVisible: Record<string, boolean> = {};

        sectionPositions.current.forEach((pos) => {
            // Un componente es visible si está dentro del viewport + buffer de precarga
            const isVisible = (
                pos.start < currentScroll + viewportWidth + buffer &&
                pos.end > currentScroll - buffer
            );

            if (isVisible) {
                newVisible[pos.id] = true;
            }

            // Calcular cuál es la sección predominante (Active Index)
            const overlap = Math.max(
                0,
                Math.min(pos.end, currentScroll + viewportWidth) -
                Math.max(pos.start, currentScroll)
            );

            if (overlap > maxVisibleWidth) {
                maxVisibleWidth = overlap;
                activeId = pos.id;
            }
        });

        // Actualizamos estados solo si cambiaron para evitar re-renders masivos
        setVisibleSections(prev => {
            const hasChanged = Object.keys(newVisible).some(key => !prev[key]);
            return hasChanged ? { ...prev, ...newVisible } : prev;
        });

        if (activeId && indexMap[activeId] !== undefined) {
            setActiveIndex(indexMap[activeId]);
        }
    }, [indexMap, setActiveIndex, setVisibleSections]);

    // 4. Inicialización de Motor Lenis
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

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

        lenis.on('scroll', (e: { scroll: number }) => {
            updateVisibility(e.scroll);
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Scroll inicial al Hero
        setTimeout(() => {
            const hero = document.getElementById('hero');
            if (hero) {
                lenis.scrollTo(hero, { immediate: true });
                updateVisibility(hero.offsetLeft);
            }
        }, 150);

        return () => {
            lenis.destroy();
            window.removeEventListener('resize', updateSectionCache);
        };
    }, [updateSectionCache, updateVisibility, scrollContainerRef]);

    const scrollToSection = (id: string) => {
        const targetElement = document.getElementById(id);
        const index = indexMap[id] ?? 3;

        let offset = 0;
        if (targetElement) {
            if (index > 3) offset = -500; // Lado derecho
            else if (index < 3) {
                offset = (targetElement as HTMLElement).offsetWidth - window.innerWidth + 500;
            }
        }

        if (targetElement && lenisRef.current) {
            lenisRef.current.scrollTo(targetElement, {
                offset,
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    };

    return { scrollToSection };
};
