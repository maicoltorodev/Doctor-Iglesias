"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { MarbleTriangle } from '@/components/ui/MarbleTriangle';

interface ResultsMarblesProps {
    sectionId: string;
}

export const ResultsMarbles = ({ sectionId }: ResultsMarblesProps) => {
    const { activeIndex, visibleSections } = useDesktopScroll();
    const isVisible = visibleSections[sectionId];

    return (
        <div className="absolute inset-0 z-50 pointer-events-none">
            {/* Esquina Inferior Izquierda */}
            <MarbleTriangle
                side="left"
                position="bottom"
                isVisible={isVisible && activeIndex === 5}
            />
            {/* Esquina Inferior Derecha */}
            <MarbleTriangle
                side="right"
                position="bottom"
                isVisible={isVisible && activeIndex === 5}
            />
        </div>
    );
};
