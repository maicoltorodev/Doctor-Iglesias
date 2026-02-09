import React from 'react';
import { EntranceReveal } from '@/components/ui/desktop/EntranceReveal';
import { SectionArrow } from '@/components/ui/desktop/SectionArrow';
import { ServicesMarbles } from './Marbles';

interface ServicesShellProps {
    editorial: React.ReactNode;
    items: React.ReactNode[];
}

const ServicesShell: React.FC<ServicesShellProps> = ({ editorial, items }) => {
    return (
        <section id="servicios" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                {/* INTRODUCCIÓN EDITORIAL */}
                <div id="servicios-title" className="flex flex-row items-center flex-shrink-0 group/editorial-services">
                    <EntranceReveal sectionId="servicios" direction="right">
                        {editorial}
                    </EntranceReveal>

                    {/* FLECHA ESCRITORIO (Lado) (Client Component used as island) */}
                    <EntranceReveal sectionId="servicios" delay="200ms" direction="right" className="ml-72">
                        <SectionArrow direction="right" />
                    </EntranceReveal>
                </div>

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                {/* 2. GALERÍA DE TARJETAS (SCREENS) con Reveal de Lujo */}
                <div className="flex gap-56">
                    {items.map((item, i) => (
                        <div key={i} className="w-auto h-auto block">
                            <EntranceReveal
                                sectionId="servicios"
                                delay={`${i * 100}ms`}
                            >
                                {item}
                            </EntranceReveal>
                        </div>
                    ))}
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Client Island) */}
                <ServicesMarbles sectionId="servicios" />

                <div className="flex-shrink-0 w-[45vw]" aria-hidden="true"></div>
            </div>
        </section>
    );
};

export default ServicesShell;
