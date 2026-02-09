"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { MarbleTriangle } from '@/components/ui/desktop/MarbleTriangle';

export const TestimonialsMarbles = () => {
    const context = useDesktopScroll();
    const activeIndex = context?.activeIndex ?? 0;
    const visibleSections = context?.visibleSections ?? {};
    const isVisible = visibleSections.testimonios;

    return (
        <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Esquina Inferior Izquierda */}
            <MarbleTriangle
                side="left"
                position="bottom"
                isVisible={isVisible}
            />
            {/* Esquina Inferior Derecha */}
            <MarbleTriangle
                side="right"
                position="bottom"
                isVisible={isVisible}
            />
        </div>
    );
};
