import React from 'react';
import { EntranceReveal } from '@/components/ui/mobile/EntranceReveal';
import { ResultsMarbles } from './Marbles';

interface ResultsShellProps {
    editorial: React.ReactNode;
    items: React.ReactNode[];
}

const ResultsShell: React.FC<ResultsShellProps> = ({ editorial, items }) => {
    // Sequence in page.tsx: Contact(0), About(1), Hero(2), Services(3), Results(4)
    const SECTION_INDEX = 4;

    return (
        <section id="resultados" className="w-full min-h-screen relative bg-[#e6e3e8] text-black section-contain py-20">
            <div className="relative z-20 container mx-auto px-6">
                <div className="flex flex-col space-y-20">

                    {/* SCREEN 1: CABECERA DE GALERÍA */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal index={SECTION_INDEX} className="flex flex-col items-center group/title">
                            {editorial}
                        </EntranceReveal>
                    </div>

                    {/* 2. FILA DE COMPARATIVAS (VERTICAL) */}
                    <div className="flex flex-col space-y-12">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center justify-center">
                                <EntranceReveal
                                    index={SECTION_INDEX}
                                    delay={`${i * 200 + 400}ms`}
                                    className="relative w-full max-w-2xl"
                                >
                                    {item}
                                </EntranceReveal>
                            </div>
                        ))}
                    </div>

                    {/* PIEZAS DE MÁRMOL (Client Island) */}
                    <ResultsMarbles index={SECTION_INDEX} />

                </div>
            </div>
        </section>
    );
};

export default ResultsShell;
