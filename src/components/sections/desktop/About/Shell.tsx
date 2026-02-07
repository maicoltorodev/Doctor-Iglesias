"use client";

import React from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { SectionArrow } from '@/components/ui/SectionArrow';

interface AboutShellProps {
    philosophyCard: React.ReactNode;
    experienceCard: React.ReactNode;
    doctorBlock: React.ReactNode;
    editorialBlock: React.ReactNode;
}

const AboutShell: React.FC<AboutShellProps> = ({ philosophyCard, experienceCard, doctorBlock, editorialBlock }) => {
    const { activeIndex, visibleSections } = useDesktopScroll();
    const isVisible = visibleSections.nosotros;

    return (
        <section id="nosotros" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">
                {/* Espaciador de Entrada (Origen del Mundo - Respiro Máximo) */}
                <div className="flex-shrink-0 w-[15vw] hidden lg:flex items-center justify-start pl-12 h-full z-40">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase [writing-mode:vertical-lr] rotate-180 opacity-40 text-black/40 hover:opacity-100 transition-opacity duration-500">
                        Dr. Jorge Iglesias © 2026
                    </p>
                </div>

                {/* 1. GALERÍA DE TARJETAS (Exposición) */}
                <div className="flex flex-row gap-24 items-center">

                    {/* CARD 1: FILOSOFÍA */}
                    <div className="w-auto h-auto block">
                        <div
                            className="flex-shrink-0 group transition-all duration-[700ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '100ms'
                            }}
                        >
                            {philosophyCard}
                        </div>
                    </div>

                    {/* CARD 2: PERFIL DOCTOR (CENTRAL) */}
                    <div className="w-auto h-auto block">
                        <div
                            className="flex-shrink-0 group transition-all duration-[700ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '200ms'
                            }}
                        >
                            {doctorBlock}
                        </div>
                    </div>

                    {/* CARD 3: TRAYECTORIA */}
                    <div className="w-auto h-auto block">
                        <div
                            className="flex-shrink-0 group transition-all duration-[700ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '300ms'
                            }}
                        >
                            {experienceCard}
                        </div>
                    </div>

                </div>

                {/* Espacio Intermedio (Vínculo Editorial) */}
                <div className="flex-shrink-0 w-[35vw] block" aria-hidden="true"></div>

                {/* FLECHA IZQUIERDA (Espejo) */}
                <div className={`flex items-center mr-56 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                    <SectionArrow direction="left" />
                </div>

                {/* TÍTULO EDITORIAL SECCIÓN */}
                <div id="nosotros-title" className={`flex flex-row items-center justify-center flex-shrink-0 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} w-auto h-auto`}>
                    {editorialBlock}
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (TRIÁNGULOS) */}
                <div className={`absolute inset-0 z-50 pointer-events-none`}>
                    {/* Esquina Inferior Izquierda */}
                    <div className="absolute bottom-0 left-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-left"></div>
                        <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === 0 && isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!-translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-left bg-marble-texture border-t border-r border-white/20">
                                {/* Brillo Especular */}
                                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/60 to-transparent transform -rotate-[19.8deg] origin-top-right translate-y-[0.5px]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Esquina Inferior Derecha */}
                    <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-right"></div>
                        <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${activeIndex === 0 && isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} peer-hover:!translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20">
                                {/* Brillo Especular */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Espaciador de Salida (hacia Galería) */}
                <div className="flex-shrink-0 w-[35vw]" aria-hidden="true"></div>
            </div>
        </section>
    );
};

export default AboutShell;
