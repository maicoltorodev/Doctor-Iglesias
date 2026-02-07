"use client";

import React from 'react';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { Obra } from '@/components/ui/Obra';
import { SectionArrow } from '@/components/ui/SectionArrow';

interface TestimonialsProps {
    isVisible?: boolean;
    activeIndex?: number;
}

import { useDesktopScroll } from '@/components/layout/DesktopLayout';

const Testimonials: React.FC<TestimonialsProps> = () => {
    const { activeIndex, visibleSections } = useDesktopScroll();
    const isVisible = visibleSections.testimonios || activeIndex === 6;

    const testimonials = [
        {
            name: "Ana María P.",
            text: "La atención del Dr. Iglesias transformó mi piel por completo. Eternamente agradecida.",
            treatment: "Rejuvenecimiento Facial"
        },
        {
            name: "Carlos R.",
            text: "Profesionalismo y tecnología de punta. Los resultados superaron mis expectativas.",
            treatment: "Tratamiento Láser"
        },
        {
            name: "Sofía L.",
            text: "Excelente trato y resultados naturales. Me devolvieron la confianza en mí misma.",
            treatment: "Armonización Facial"
        }
    ];

    return (
        <section id="testimonios" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* Espaciador (desde Resultados) */}
                <div className="flex-shrink-0 w-[35vw] hidden lg:block" aria-hidden="true"></div>

                {/* Título de Sección */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center lg:w-auto lg:h-auto lg:block">
                    <div id="testimonios-title" className={`flex flex-col lg:flex-row items-center flex-shrink-0 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <EditorialCard
                            subtitle="Experiencias"
                            titleLight="Voces de"
                            titleBold="Confianza"
                            description="Historias reales de pacientes que confiaron en nuestra excelencia."
                            footerTag="Testimonios Reales"
                        />
                        <SectionArrow direction="right" className="ml-32" />
                    </div>
                </div>

                {/* Espaciador Central (Interno - Gran Aire) */}
                <div className="flex-shrink-0 w-[35vw] hidden lg:block" aria-hidden="true"></div>

                {/* Cards de Testimonios */}
                <div className="flex gap-32">
                    {testimonials.map((t, i) => (
                        <div key={i} className={`flex-shrink-0 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-40 opacity-0'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                            <Obra
                                category={t.treatment}
                                title={t.name}
                            >
                                <div className="flex flex-col justify-center h-full relative p-8">
                                    <div className="text-8xl text-black/[0.05] font-serif absolute -top-4 -left-2 select-none">“</div>
                                    <p className="text-2xl font-light italic text-black/70 leading-relaxed relative z-10 text-center">
                                        {t.text}
                                    </p>
                                    <div className="text-8xl text-black/[0.05] font-serif absolute -bottom-8 -right-2 select-none rotate-180">“</div>
                                </div>
                            </Obra>
                        </div>
                    ))}
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (TRIÁNGULOS) */}
                <div className={`absolute inset-0 z-50 pointer-events-none`}>
                    {/* Esquina Inferior Izquierda */}
                    <div className="absolute bottom-0 left-0 w-[500px] h-[180px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-left"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === 6 && isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!-translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-left bg-marble-texture"></div>
                        </div>
                    </div>

                    {/* Esquina Inferior Derecha */}
                    <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-none z-20 clip-triangle-right"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${activeIndex === 6 && isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-right bg-marble-texture"></div>
                        </div>
                    </div>
                </div>

                {/* Espaciador Final (Fin del Mundo - Horizonte Infinito) */}
                <div className="flex-shrink-0 w-[15vw] hidden lg:flex items-center justify-center h-full z-[60]">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase [writing-mode:vertical-lr] rotate-180 opacity-40 text-black/40 hover:opacity-100 transition-opacity duration-500">
                        Dr. Jorge Iglesias © 2026
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
