"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { MarbleTriangle } from '@/components/ui/desktop/MarbleTriangle';

interface AboutMarblesProps {
    sectionId: string;
}

export const AboutMarbles = ({ sectionId }: AboutMarblesProps) => {
    const { activeIndex, visibleSections } = useDesktopScroll();
    const isVisible = visibleSections[sectionId];

    return (
        <>
            {/* Esquina Inferior Izquierda */}
            <MarbleTriangle
                side="left"
                position="bottom"
                isVisible={isVisible && activeIndex === 0}
            />
            {/* Esquina Inferior Derecha */}
            <MarbleTriangle
                side="right"
                position="bottom"
                isVisible={isVisible && activeIndex === 0}
            />
        </>
    );
};
