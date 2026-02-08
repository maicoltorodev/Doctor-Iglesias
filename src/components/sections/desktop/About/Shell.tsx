import React from 'react';
import { SectionArrow } from '@/components/ui/SectionArrow';
import { EntranceReveal } from '@/components/ui/EntranceReveal';
import { AboutMarbles } from './Marbles';

interface AboutShellProps {
    philosophyCard: React.ReactNode;
    experienceCard: React.ReactNode;
    doctorBlock: React.ReactNode;
    editorialBlock: React.ReactNode;
}

const AboutShell: React.FC<AboutShellProps> = ({ philosophyCard, experienceCard, doctorBlock, editorialBlock }) => {
    return (
        <section id="nosotros" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* Espaciador de Entrada (Origen del Mundo) */}
                <div className="flex-shrink-0 w-[15vw] hidden lg:flex items-center justify-start pl-12 h-full z-40">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase [writing-mode:vertical-lr] rotate-180 opacity-40 text-black/40 hover:opacity-100 transition-opacity duration-500">
                        Dr. Jorge Iglesias © 2026
                    </p>
                </div>

                {/* 1. GALERÍA DE TARJETAS (Exposición) */}
                <div className="flex flex-row gap-24 items-center">

                    {/* CARD 1: FILOSOFÍA */}
                    <div className="w-auto h-auto block">
                        <EntranceReveal sectionId="nosotros" delay="100ms">
                            {philosophyCard}
                        </EntranceReveal>
                    </div>

                    {/* CARD 2: PERFIL DOCTOR (CENTRAL) */}
                    <div className="w-auto h-auto block">
                        <EntranceReveal sectionId="nosotros" delay="200ms">
                            {doctorBlock}
                        </EntranceReveal>
                    </div>

                    {/* CARD 3: TRAYECTORIA */}
                    <div className="w-auto h-auto block">
                        <EntranceReveal sectionId="nosotros" delay="300ms">
                            {experienceCard}
                        </EntranceReveal>
                    </div>

                </div>

                {/* Espacio Intermedio (Vínculo Editorial) */}
                <div className="flex-shrink-0 w-[35vw] block" aria-hidden="true"></div>

                {/* FLECHA IZQUIERDA (Espejo) */}
                <div className="flex items-center mr-56">
                    <EntranceReveal sectionId="nosotros" delay="400ms" direction="none">
                        <SectionArrow direction="left" />
                    </EntranceReveal>
                </div>

                {/* TÍTULO EDITORIAL SECCIÓN */}
                <div id="nosotros-title" className="flex flex-row items-center justify-center flex-shrink-0 w-auto h-auto">
                    <EntranceReveal sectionId="nosotros" direction="up" className="translate-y-20">
                        {editorialBlock}
                    </EntranceReveal>
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Client Island) */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <AboutMarbles sectionId="nosotros" />
                </div>

                {/* Espaciador de Salida (hacia Galería) */}
                <div className="flex-shrink-0 w-[35vw]" aria-hidden="true"></div>
            </div>
        </section>
    );
};

export default AboutShell;
