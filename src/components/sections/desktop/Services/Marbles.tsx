"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { MarbleTriangle } from '@/components/ui/desktop/MarbleTriangle';

interface ServicesMarblesProps {
    sectionId: string;
}

export const ServicesMarbles = ({ sectionId }: ServicesMarblesProps) => {
    const context = useDesktopScroll();
    const activeIndex = context?.activeIndex ?? 0;
    const visibleSections = context?.visibleSections ?? {};
    const isVisible = visibleSections[sectionId];

    return (
        <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Esquina Inferior Izquierda */}
            <MarbleTriangle
                side="left"
                position="bottom"
                isVisible={isVisible && activeIndex === 4}
            />
            {/* Esquina Inferior Derecha */}
            <MarbleTriangle
                side="right"
                position="bottom"
                isVisible={isVisible && activeIndex === 4}
            />
        </div>
    );
};
