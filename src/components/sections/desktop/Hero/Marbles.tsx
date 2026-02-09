"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { MarbleTriangle } from '@/components/ui/desktop/MarbleTriangle';

export const HeroMarbles = () => {
    const { isLogoHovered, activeIndex } = useDesktopScroll();

    // In the previous code, Hero was index 3 (NOSOTROS <- GALERIA <- CONTACTO <- INICIO -> SERVICIOS -> RESULTADOS -> TESTIMONIOS)
    // Actually INICIO is the center (index 3 out of 0-6)

    return (
        <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Esquina Inferior Izquierda */}
            <MarbleTriangle
                side="left"
                position="bottom"
                isVisible={activeIndex === 3 && !isLogoHovered}
                className="z-10"
            />
            {/* Esquina Inferior Derecha */}
            <MarbleTriangle
                side="right"
                position="bottom"
                isVisible={activeIndex === 3 && !isLogoHovered}
                className="z-10"
            />
        </div>
    );
};
