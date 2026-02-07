"use client";

import React from 'react';
import { useMobileScroll } from '@/components/layout/MobileLayout';

interface ServicesShellProps {
    editorial: React.ReactNode;
    items: React.ReactNode[];
}

const ServicesShell: React.FC<ServicesShellProps> = ({ editorial, items }) => {
    // Assuming Services is index 2
    const { activeIndex } = useMobileScroll();
    const isVisible = activeIndex === 2;

    return (
        <section id="servicios" className="w-fit h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* SCREEN 1: INTRODUCCIÓN EDITORIAL */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                    <div id="servicios-title" className={`flex flex-col items-center flex-shrink-0 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} group/editorial-services`}>
                        {editorial}

                        {/* FLECHA MÓVIL (Debajo) */}
                        <div className="flex items-center mt-12 animate-fade-in" style={{ animationDelay: '1.5s' }}>
                            <div className="animate-guide-right transform">
                                <svg width="100" height="80" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/50 overflow-visible">
                                    <path d="M2 20L48 20M48 20L30 4M48 20L30 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. GALERÍA DE TARJETAS (SCREENS) */}
                <div className="flex gap-0">
                    {items.map((item, i) => (
                        <div key={i} className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                            <div
                                className="group transition-all duration-[1000ms] relative block"
                                style={{
                                    transitionDelay: `${i * 100 + 400}ms`,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
                                }}
                            >
                                {item}
                            </div>
                        </div>
                    ))}
                </div>

                {/* PIEZAS DE MÁRMOL */}
                <div className={`absolute inset-0 z-50 pointer-events-none`}>
                    <div className="absolute bottom-0 left-0 w-[160px] h-[65px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-left"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === 3 && isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!-translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-left bg-marble-texture"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-[160px] h-[65px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-right"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${activeIndex === 3 && isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} peer-hover:!translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-right bg-marble-texture"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesShell;
