"use client";

import React, { useState } from 'react';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { EntranceReveal } from '@/components/ui/EntranceReveal';
import { SectionArrow } from '@/components/ui/SectionArrow';

interface ContactShellProps {
    editorial: React.ReactNode;
    mapCard: React.ReactNode;
    clinicCard: React.ReactNode;
    socialsCard: React.ReactNode;
}

const ContactShell: React.FC<ContactShellProps> = ({ editorial, mapCard, clinicCard, socialsCard }) => {
    const { activeIndex, visibleSections } = useDesktopScroll();
    const isVisible = visibleSections.contacto;
    const [isHoveringMap, setIsHoveringMap] = useState(false);

    return (
        <section id="contacto" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* Espaciador INICIAL (desde Galería) */}
                <div className="flex-shrink-0 w-[35vw] hidden lg:block" aria-hidden="true"></div>

                {/* 1. GALERÍA DE TARJETAS (Exposición SCREENS) */}
                <div className="flex flex-row gap-40 items-center">

                    {/* SCREEN 1: MAPA GOOGLE */}
                    <div className="w-auto h-auto block">
                        <div
                            className="flex-shrink-0 group transition-all duration-[700ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '100ms'
                            }}
                        >
                            {/* NOTA: ContactMapCard ya usa <Obra> que impone w-[400px] */}
                            {mapCard}
                        </div>
                    </div>

                    {/* SCREEN 2: LA CLÍNICA */}
                    <div className="w-auto h-auto block">
                        <div
                            className="flex-shrink-0 group transition-all duration-[700ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '200ms'
                            }}
                        >
                            {clinicCard}
                        </div>
                    </div>

                    {/* SCREEN 3: CANALES DIRECTOS */}
                    <div className="w-auto h-auto block">
                        <div
                            className="flex-shrink-0 group transition-all duration-[700ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '300ms'
                            }}
                        >
                            {socialsCard}
                        </div>
                    </div>

                </div>

                {/* Espacio CENTRAL (Hacia Título - Gran Aire) */}
                <div className="flex-shrink-0 w-[35vw] block" aria-hidden="true"></div>

                {/* FLECHA IZQUIERDA (Espejo) */}
                <div className={`flex items-center mr-56 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                    <SectionArrow direction="left" />
                </div>

                {/* SCREEN 4: TÍTULO EDITORIAL SECCIÓN */}
                <div id="contacto-title" className="w-auto h-auto block">
                    <EntranceReveal sectionId="contacto" direction="up" className="translate-y-20">
                        {editorial}
                    </EntranceReveal>
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (TRIÁNGULOS) */}
                <div className={`absolute inset-0 z-50 pointer-events-none`}>
                    {/* Esquina Inferior Izquierda */}
                    <div className="absolute bottom-0 left-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-left"></div>
                        <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === 2 && isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!-translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-left bg-marble-texture border-t border-r border-white/20">
                                {/* Brillo Especular */}
                                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/60 to-transparent transform -rotate-[19.8deg] origin-top-right translate-y-[0.5px]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Esquina Inferior Derecha */}
                    <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-right"></div>
                        <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${activeIndex === 2 && isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} peer-hover:!translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20">
                                {/* Brillo Especular */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Espaciador de Salida (Conexión Directa con Hero - Núcleo Central) */}
                <div className="flex-shrink-0 w-[35vw] block" aria-hidden="true"></div>

            </div>
        </section>
    );
};

export default ContactShell;
