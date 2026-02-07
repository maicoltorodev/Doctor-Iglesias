"use client";

import React, { useState } from 'react';
import { useMobileScroll } from '@/components/layout/MobileLayout';
import { CONTACT_INFO } from '@/constants/content';

interface ContactShellProps {
    mapFrame: React.ReactNode;
    clinicImage: React.ReactNode;
    socialsGrid: React.ReactNode;
    editorial: React.ReactNode;
}

const ContactShell: React.FC<ContactShellProps> = ({ mapFrame, clinicImage, socialsGrid, editorial }) => {
    // Assuming Contact is index 4
    const { activeIndex } = useMobileScroll();
    const isVisible = activeIndex === 4;


    return (
        <section id="contacto" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* 1. GALERÍA DE TARJETAS (Exposición SCREENS) */}
                <div className="flex flex-row gap-0 items-center">

                    {/* SCREEN 1: MAPA GOOGLE */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <div
                            className="flex-shrink-0 w-60 group transition-all duration-[1000ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '400ms'
                            }}
                        >
                            <div
                                className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation transition-all duration-700 ease-in-out"

                            >
                                {mapFrame}
                            </div>

                            <div className="absolute top-[calc(100%+2rem)] left-0 right-0 space-y-3 text-center">
                                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">Ubicación</p>
                                <p className="text-lg font-light text-black/80 leading-tight">Mapa Google</p>
                            </div>
                        </div>
                    </div>

                    {/* SCREEN 2: LA CLÍNICA */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <div
                            className="flex-shrink-0 w-60 group transition-all duration-[1000ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '600ms'
                            }}
                        >
                            <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation transition-all duration-700 ease-in-out">
                                {clinicImage}
                            </div>

                            <div className="absolute top-[calc(100%+2rem)] left-0 right-0 space-y-3 text-center">
                                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">Sede Principal</p>
                                <p className="text-lg font-light text-black/80 leading-tight">{CONTACT_INFO.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* SCREEN 3: CANALES DIRECTOS */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <div
                            className="flex-shrink-0 w-60 group transition-all duration-[1000ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '800ms'
                            }}
                        >
                            <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation bg-white/50 backdrop-blur-sm transition-all duration-700 ease-in-out">
                                {socialsGrid}
                            </div>

                            <div className="absolute top-[calc(100%+2rem)] left-0 right-0 space-y-3 text-center">
                                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">Atención</p>
                                <p className="text-lg font-light text-black/80 leading-tight">Canales Directos</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* SCREEN 4: TÍTULO EDITORIAL SECCIÓN */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                    <div id="contacto-title" className={`flex flex-col items-center flex-shrink-0 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        {editorial}
                    </div>
                </div>

                {/* PIEZAS DE MÁRMOL */}
                <div className={`absolute inset-0 z-50 pointer-events-none`}>
                    <div className="absolute bottom-0 left-0 w-[160px] h-[65px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-left"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === 4 && isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!-translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-left bg-marble-texture"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-[160px] h-[65px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-right"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${activeIndex === 4 && isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} peer-hover:!translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-right bg-marble-texture"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactShell;
