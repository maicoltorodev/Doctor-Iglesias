import React from 'react';
import { EntranceReveal } from '@/components/ui/EntranceReveal';
import { ResultsMarbles } from './Marbles';

interface ResultsShellProps {
    editorial: React.ReactNode;
    items: React.ReactNode[];
}

const ResultsShell: React.FC<ResultsShellProps> = ({ editorial, items }) => {
    return (
        <section id="resultados" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 h-full flex items-center">

                {/* 1. CABECERA DE GALERÍA */}
                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                <div id="resultados-title" className="w-auto h-auto block">
                    <EntranceReveal sectionId="resultados" direction="none">
                        {editorial}
                    </EntranceReveal>
                </div>

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                {/* 2. FILA DE COMPARATIVAS (SCREENS) con Reveal de Lujo */}
                <div className="flex gap-48">
                    {items.map((item, i) => (
                        <div key={i} className="w-auto h-auto block">
                            <EntranceReveal
                                sectionId="resultados"
                                delay={`${i * 100}ms`}
                            >
                                {item}
                            </EntranceReveal>
                        </div>
                    ))}
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Client Island) */}
                <ResultsMarbles sectionId="resultados" />

                <div className="flex-shrink-0 w-[45vw]" aria-hidden="true"></div>
            </div>
        </section>
    );
};

export default ResultsShell;
