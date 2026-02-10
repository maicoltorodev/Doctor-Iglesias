"use client";

import React, { useState, useEffect } from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { MarbleTriangle } from '@/components/ui/desktop/MarbleTriangle';

export const HeroMarbles = () => {
    const { isLogoHovered, activeIndex } = useDesktopScroll();
    const [showMarbles, setShowMarbles] = useState(false);

    useEffect(() => {
        // Disparamos la animación interna del componente después del delay
        const timer = setTimeout(() => {
            setShowMarbles(true);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Esquina Inferior Izquierda */}
            <MarbleTriangle
                side="left"
                position="bottom"
                isVisible={showMarbles && activeIndex === 3 && !isLogoHovered}
                delay="0.6s"
                className="z-10"
            />
            {/* Esquina Inferior Derecha */}
            <MarbleTriangle
                side="right"
                position="bottom"
                isVisible={showMarbles && activeIndex === 3 && !isLogoHovered}
                delay="0.6s"
                className="z-10"
            />
        </div>
    );
};
