import React from 'react';
import { EntranceReveal } from '@/components/ui/mobile/EntranceReveal';
import { ServicesMarbles } from './Marbles';

interface ServicesShellProps {
    editorial: React.ReactNode;
    items: React.ReactNode[];
}

const ServicesShell: React.FC<ServicesShellProps> = ({ editorial, items }) => {
    // Sequence in page.tsx: Contact(0), About(1), Hero(2), Services(3), Results(4)
    const SECTION_INDEX = 3;

    return (
        <section id="servicios" className="w-fit h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* SCREEN 1: INTRODUCCIÓN EDITORIAL */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                    <EntranceReveal index={SECTION_INDEX} className="flex flex-col items-center flex-shrink-0 group/editorial-services">
                        {editorial}

                        {/* FLECHA MÓVIL (Debajo) */}
                        <div className="flex items-center mt-12 animate-fade-in" style={{ animationDelay: '1.5s' }}>
                            <div className="animate-guide-right transform">
                                <svg width="100" height="80" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/50 overflow-visible">
                                    <path d="M2 20L48 20M48 20L30 4M48 20L30 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </EntranceReveal>
                </div>

                {/* 2. GALERÍA DE TARJETAS (SCREENS) */}
                <div className="flex gap-0">
                    {items.map((item, i) => (
                        <div key={i} className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                            <EntranceReveal
                                index={SECTION_INDEX}
                                delay={`${i * 100 + 400}ms`}
                                className="group relative block"
                            >
                                {item}
                            </EntranceReveal>
                        </div>
                    ))}
                </div>

                {/* PIEZAS DE MÁRMOL (Client Island) */}
                <ServicesMarbles index={SECTION_INDEX} />

            </div>
        </section>
    );
};

export default ServicesShell;
