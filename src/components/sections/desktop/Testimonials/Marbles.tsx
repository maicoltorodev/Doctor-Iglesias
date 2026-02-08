"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { MarbleTriangle } from '@/components/ui/MarbleTriangle';

export const TestimonialsMarbles = () => {
    const { activeIndex, visibleSections } = useDesktopScroll();
    const isVisible = visibleSections.testimonios;

    return (
        <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Esquina Inferior Izquierda */}
            <MarbleTriangle
                side="left"
                position="bottom"
                isVisible={isVisible && activeIndex === 6}
            />
            {/* Esquina Inferior Derecha */}
            <MarbleTriangle
                side="right"
                position="bottom"
                isVisible={isVisible && activeIndex === 6}
            />
        </div>
    );
};
