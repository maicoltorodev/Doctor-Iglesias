"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/providers/DesktopScrollProvider';

export const ContactMarbles = () => {
    const context = useDesktopScroll();
    const activeIndex = context?.activeIndex ?? 0;
    const visibleSections = context?.visibleSections ?? {};
    const isVisible = visibleSections.contacto;

    return (
        <div className={`absolute inset-0 z-50 pointer-events-none`}>
            {/* Esquina Inferior Izquierda */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-left"></div>
                <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!-translate-x-[120%] z-10`}>
                    <div className="absolute inset-0 clip-triangle-left bg-marble-texture border-t border-r border-white/20">
                        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/60 to-transparent transform -rotate-[19.8deg] origin-top-right translate-y-[0.5px]"></div>
                    </div>
                </div>
            </div>

            {/* Esquina Inferior Derecha */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-right"></div>
                <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} peer-hover:!translate-x-[120%] z-10`}>
                    <div className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
