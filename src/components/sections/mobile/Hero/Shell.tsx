"use client";

import React from 'react';
import { useMobileScroll } from '@/components/layout/MobileLayout';

interface HeroShellProps {
    background: React.ReactNode;
    logo: React.ReactNode;
    text: React.ReactNode;
    cta: React.ReactNode;
}

const HeroShell: React.FC<HeroShellProps> = ({ background, logo, text, cta }) => {
    // Mobile logic if needed (activeIndex, etc)
    return (
        <section id="hero" className="w-screen h-full flex-shrink-0 relative overflow-hidden bg-[#e6e3e8] section-contain snap-center">
            {background}

            {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (TRIÁNGULOS) - RESTAURADOS */}
            <div className={`absolute inset-0 z-50 pointer-events-none`}>
                {/* Esquina Inferior Izquierda */}
                <div className="absolute bottom-0 left-0 w-[160px] h-[65px] pointer-events-none">
                    <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-left"></div>
                    <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 translate-x-0 z-10`}>
                        <div className="absolute inset-0 clip-triangle-left bg-marble-texture"></div>
                    </div>
                </div>

                {/* Esquina Inferior Derecha */}
                <div className="absolute bottom-0 right-0 w-[160px] h-[65px] pointer-events-none">
                    <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-right"></div>
                    <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] opacity-100 translate-x-0 z-10`}>
                        <div className="absolute inset-0 clip-triangle-right bg-marble-texture"></div>
                    </div>
                </div>
            </div>

            {/* CONTENIDO UNIFICADO Y SIMPLIFICADO (Reflejando la estructura de Desktop) */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 pointer-events-none">
                <div className="flex flex-col items-center justify-center pointer-events-auto w-full space-y-8 translate-y-[4vh]">

                    {/* LOGO WRAPPER */}
                    <div className="relative w-full max-w-[280px] h-24 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-2xl"></div>
                        {logo}
                    </div>

                    {/* TEXTO Y CTA */}
                    <div className="flex flex-col items-center space-y-16">
                        {text}
                        {cta}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroShell;
