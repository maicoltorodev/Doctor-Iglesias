"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    useEffect(() => {
        // DESHABILITADO: El proyecto usa scroll horizontal nativo con Lenis en DesktopLayout
        // No inicializar Lenis vertical para evitar conflictos
        return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [isAdminRoute]);

    return <>{children}</>;
};
