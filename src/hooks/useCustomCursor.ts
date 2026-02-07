import { useEffect, useState, useRef } from "react";

/**
 * useCustomCursor
 * - Manages cursor physics and state.
 * - Provides refs for the cursor elements (Ring and Dot).
 * - Exposes states for specific hover interactions (Logo, FAB).
 */
export const useCustomCursor = () => {
    // Refs for DOM elements
    const cursorRef = useRef<HTMLDivElement>(null);    // Outer Ring
    const cursorDotRef = useRef<HTMLDivElement>(null); // Inner Dot

    // Application State
    const [isHovering, setIsHovering] = useState(false); // General pointer/hover state
    const [isLogoHovered, setIsLogoHovered] = useState(false);

    // Physics State (refs to avoid re-renders during animation loop)
    const mousePos = useRef({ x: -100, y: -100 });
    const cursorCurrent = useRef({ x: -100, y: -100 });
    const dotCurrent = useRef({ x: -100, y: -100 });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // 1. Mouse Tracking
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Evitar DOM traversal excesivo: Solo buscamos si el elemento ha cambiado
            const target = e.target as HTMLElement;
            if (!target) return;

            // Detección eficiente de elementos clickeables
            const isClickable = target.closest("button, a, .cursor-pointer, input, select, [role='button']");

            if (isClickable) {
                setIsHovering(true);
            } else {
                if (!isLogoHovered) {
                    setIsHovering(false);
                }
            }
        };

        // 2. Animation Loop
        let frame: number;
        const animate = () => {
            const { x, y } = mousePos.current;

            // Physics for Ring (Laggy)
            cursorCurrent.current.x += (x - cursorCurrent.current.x) * 0.15;
            cursorCurrent.current.y += (y - cursorCurrent.current.y) * 0.15;

            // Physics for Dot (Fast)
            dotCurrent.current.x += (x - dotCurrent.current.x) * 0.5; // Faster follow
            dotCurrent.current.y += (y - dotCurrent.current.y) * 0.5;

            // Apply transforms efficiently
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorCurrent.current.x}px, ${cursorCurrent.current.y}px, 0)`;
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${dotCurrent.current.x}px, ${dotCurrent.current.y}px, 0)`;
            }

            frame = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        frame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(frame);
        };
    }, [isLogoHovered]); // Dependency ensures hover logic is fresh

    return {
        cursorRef,
        cursorDotRef,
        isHovering,
        setIsHovering,
        isLogoHovered,
        setIsLogoHovered
    };
};
