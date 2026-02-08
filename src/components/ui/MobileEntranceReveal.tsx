"use client";

import React from 'react';
import { useMobileScroll } from '@/components/layout/MobileLayout';

interface MobileEntranceRevealProps {
    children: React.ReactNode;
    index: number;
    delay?: string;
    className?: string;
}

export const MobileEntranceReveal = ({
    children,
    index,
    delay = "0ms",
    className = ""
}: MobileEntranceRevealProps) => {
    const { activeIndex } = useMobileScroll();
    const isVisible = activeIndex === index;

    return (
        <div
            className={`transition-all duration-[1000ms] ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: delay
            }}
        >
            {children}
        </div>
    );
};
