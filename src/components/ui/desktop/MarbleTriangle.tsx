"use client";

import React, { useState } from 'react';

interface MarbleTriangleProps {
    side: 'left' | 'right';
    position: 'top' | 'bottom';
    isVisible: boolean;
    activeOnIndex?: number;
    currentIndex?: number;
    className?: string;
    delay?: string;
}

export const MarbleTriangle = ({
    side,
    position,
    isVisible,
    activeOnIndex,
    currentIndex,
    className = "",
    delay = "0s"
}: MarbleTriangleProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // Check if it belongs to this specific focus (if index is provided)
    const isActuallyVisible = activeOnIndex !== undefined && currentIndex !== undefined
        ? (isVisible && activeIndexMatch(activeOnIndex, currentIndex))
        : isVisible;

    function activeIndexMatch(target: number, current: number) {
        // Simple match, but we can expand logic if needed
        return target === current;
    }

    const clipPath = side === 'left'
        ? "polygon(0 0, 100% 0, 0 100%)" // This is for top-left
        : "polygon(100% 0, 100% 100%, 0 0)"; // Example

    // The current layout uses CSS classes for clip-path
    const clipClass = side === 'left' ? 'clip-triangle-left' : 'clip-triangle-right';

    const translateClass = isHovered
        ? (side === 'left' ? '-translate-x-[120%]' : 'translate-x-[120%]')
        : (isActuallyVisible ? 'translate-x-0 opacity-100' : (side === 'left' ? '-translate-x-full' : 'translate-x-full') + ' opacity-0');

    const shadowClass = position === 'top' ? 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]' : 'drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]';
    const borderClass = side === 'left'
        ? (position === 'top' ? 'border-b border-r' : 'border-t border-r')
        : (position === 'top' ? 'border-b border-l' : 'border-t border-l');

    return (
        <div className={`absolute ${position}-0 ${side}-0 w-[500px] h-[180px] pointer-events-none filter ${shadowClass} ${className}`}>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`absolute inset-0 pointer-events-auto cursor-none z-20 ${clipClass}`}
            />
            <div
                className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${translateClass} z-10`}
                style={{ transitionDelay: isActuallyVisible && !isHovered ? delay : '0s' }}
            >
                <div className={`absolute inset-0 ${clipClass} bg-marble-texture ${borderClass} border-white/20`}>
                    {/* Gloss effect */}
                    <div className={`absolute ${position === 'top' ? 'bottom-0' : 'top-0'} ${side === 'left' ? 'left-0' : 'right-0'} w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transform ${side === 'left' ? '-rotate-[19.8deg]' : 'rotate-[19.8deg]'} origin-${position}-${side} ${position === 'bottom' ? (side === 'left' ? 'translate-y-[0.5px]' : 'translate-y-[0.5px]') : ''}`}></div>
                </div>
            </div>
        </div>
    );
};
