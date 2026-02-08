"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';

interface EntranceRevealProps {
    children: React.ReactNode;
    sectionId: string;
    delay?: string;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const EntranceReveal = ({
    children,
    sectionId,
    delay = "0ms",
    className = "",
    direction = 'up'
}: EntranceRevealProps) => {
    const { visibleSections } = useDesktopScroll();
    const isVisible = visibleSections[sectionId];

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case 'up': return 'translateY(40px)';
                case 'down': return 'translateY(-40px)';
                case 'left': return 'translateX(40px)';
                case 'right': return 'translateX(-40px)';
                default: return 'none';
            }
        }
        return 'none';
    };

    return (
        <div
            className={`transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transitionDelay: delay
            }}
        >
            {children}
        </div>
    );
};
