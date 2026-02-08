"use client";

import React from 'react';
import { useMobileScroll } from '@/components/layout/MobileLayout';

export const AboutMarbles = ({ index }: { index: number }) => {
    const { activeIndex } = useMobileScroll();
    const isVisible = activeIndex === index;

    return (
        <div className={`absolute inset-0 z-50 pointer-events-none`}>
            <div className="absolute bottom-0 left-0 w-[160px] h-[65px] pointer-events-none">
                <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} z-10`}>
                    <div className="absolute inset-0 clip-triangle-left bg-marble-texture"></div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 w-[160px] h-[65px] pointer-events-none">
                <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} z-10`}>
                    <div className="absolute inset-0 clip-triangle-right bg-marble-texture"></div>
                </div>
            </div>
        </div>
    );
};
