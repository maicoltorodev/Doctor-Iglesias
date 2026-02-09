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
        <section id="servicios" className="w-full min-h-screen relative bg-[#e6e3e8] text-black section-contain py-20">
            <div className="relative z-20 container mx-auto px-6">
                <div className="flex flex-col space-y-20">

                    {/* SCREEN 1: INTRODUCCIÓN EDITORIAL */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal index={SECTION_INDEX} className="flex flex-col items-center group/editorial-services">
                            {editorial}
                        </EntranceReveal>
                    </div>

                    {/* 2. GALERÍA DE TARJETAS (VERTICAL) */}
                    <div className="flex flex-col space-y-8">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center justify-center">
                                <EntranceReveal
                                    index={SECTION_INDEX}
                                    delay={`${i * 100 + 400}ms`}
                                    className="group relative block w-full max-w-md"
                                >
                                    {item}
                                </EntranceReveal>
                            </div>
                        ))}
                    </div>

                    {/* PIEZAS DE MÁRMOL (Client Island) */}
                    <ServicesMarbles index={SECTION_INDEX} />

                </div>
            </div>
        </section>
    );
};

export default ServicesShell;
