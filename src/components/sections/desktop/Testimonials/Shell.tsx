import React from 'react';
import { EditorialCard } from '@/components/ui/desktop/EditorialCard';
import { Obra } from '@/components/ui/desktop/Obra';
import { SectionArrow } from '@/components/ui/desktop/SectionArrow';
import { EntranceReveal } from '@/components/ui/desktop/EntranceReveal';
import { TestimonialsMarbles } from './Marbles';

interface TestimonialsShellProps {
    content: any;
    items: any[];
}

const TestimonialsShell = ({ content, items }: TestimonialsShellProps) => {
    return (
        <section id="testimonios" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* Espaciador (desde Resultados) */}
                <div className="flex-shrink-0 w-[35vw] hidden lg:block" aria-hidden="true"></div>

                {/* Título de Sección */}
                <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center lg:w-auto lg:h-auto lg:block">
                    <div id="testimonios-title" className="flex flex-col lg:flex-row items-center flex-shrink-0">
                        <EntranceReveal sectionId="testimonios" direction="none">
                            <EditorialCard
                                subtitle={content.editorial?.subtitle || content.subtitle}
                                titleLight={content.editorial?.titleLight || content.titleLight}
                                titleBold={content.editorial?.titleBold || content.titleBold}
                                description={content.editorial?.description || content.description}
                                footerTag={content.editorial?.footerTag || content.footerTag}
                            />
                        </EntranceReveal>
                        <EntranceReveal sectionId="testimonios" delay="200ms" direction="right">
                            <SectionArrow direction="right" className="ml-32" />
                        </EntranceReveal>
                    </div>
                </div>

                {/* Espaciador Central (Interno - Gran Aire) */}
                <div className="flex-shrink-0 w-[35vw] hidden lg:block" aria-hidden="true"></div>

                {/* Cards de Testimonios */}
                <div className="flex gap-32">
                    {items.map((t, i) => (
                        <div key={i} className="flex-shrink-0">
                            <EntranceReveal
                                sectionId="testimonios"
                                delay={`${i * 200}ms`}
                            >
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
                            </EntranceReveal>
                        </div>
                    ))}
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Client Island) */}
                <TestimonialsMarbles />

                {/* Espaciador Final (Fin del Mundo) */}
                <div className="flex-shrink-0 w-[15vw] hidden lg:flex items-center justify-center h-full z-[60]">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase [writing-mode:vertical-lr] rotate-180 opacity-40 text-black/40 hover:opacity-100 transition-opacity duration-500">
                        Dr. Jorge Iglesias © 2026
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsShell;
