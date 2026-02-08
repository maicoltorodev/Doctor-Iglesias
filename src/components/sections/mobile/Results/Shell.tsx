import React from 'react';
import { MobileEntranceReveal } from '@/components/ui/MobileEntranceReveal';
import { ResultsMarbles } from './Marbles';

interface ResultsShellProps {
    editorial: React.ReactNode;
    items: React.ReactNode[];
}

const ResultsShell: React.FC<ResultsShellProps> = ({ editorial, items }) => {
    // Sequence in page.tsx: Contact(0), About(1), Hero(2), Services(3), Results(4)
    const SECTION_INDEX = 4;

    return (
        <section id="resultados" className="w-fit h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 h-full flex items-center">

                {/* SCREEN 1: CABECERA DE GALERÍA */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                    <MobileEntranceReveal index={SECTION_INDEX} className="flex flex-col items-center flex-shrink-0 group/title">
                        {editorial}

                        {/* FLECHA MÓVIL (Debajo, Vertical) */}
                        <div className="flex items-center mt-12 animate-fade-in" style={{ animationDelay: '1.5s' }}>
                            <div className="animate-guide-right transform">
                                <svg width="100" height="80" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/50 overflow-visible">
                                    <path d="M2 20L48 20M48 20L30 4M48 20L30 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </MobileEntranceReveal>
                </div>

                {/* 2. FILA DE COMPARATIVAS (SCREENS) */}
                <div className="flex gap-0">
                    {items.map((item, i) => (
                        <div key={i} className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                            <MobileEntranceReveal
                                index={SECTION_INDEX}
                                delay={`${i * 200 + 400}ms`}
                                className="relative flex-shrink-0"
                            >
                                {item}
                            </MobileEntranceReveal>
                        </div>
                    ))}
                </div>

                {/* PIEZAS DE MÁRMOL (Client Island) */}
                <ResultsMarbles index={SECTION_INDEX} />

            </div>
        </section>
    );
};

export default ResultsShell;
