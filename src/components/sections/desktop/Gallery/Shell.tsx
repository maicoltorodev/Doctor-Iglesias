import React from 'react';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { Obra } from '@/components/ui/Obra';
import { SectionArrow } from '@/components/ui/SectionArrow';
import { EntranceReveal } from '@/components/ui/EntranceReveal';
import { GalleryMarbles } from './Marbles';

interface GalleryShellProps {
    content: any;
    items: any[];
}

const GalleryShell = ({ content, items }: GalleryShellProps) => {
    return (
        <section id="galeria" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                {/* Imágenes con Reveal de Lujo */}
                <div className="flex gap-32">
                    {items.map((item, i) => (
                        <EntranceReveal
                            key={i}
                            sectionId="galeria"
                            delay={`${i * 100}ms`}
                            className="flex-shrink-0"
                        >
                            <Obra
                                src={item.src}
                                alt={item.title}
                                category={item.category}
                                title={item.title}
                            />
                        </EntranceReveal>
                    ))}
                </div>

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                <div className="flex-shrink-0 mr-48">
                    <EntranceReveal sectionId="galeria" delay="200ms" direction="right">
                        <SectionArrow direction="left" />
                    </EntranceReveal>
                </div>

                {/* Título de Sección con Editorial Reveal */}
                <div id="galeria-title" className="flex-shrink-0">
                    <EntranceReveal sectionId="galeria" direction="right" delay="400ms">
                        <EditorialCard
                            subtitle={content?.editorial?.subtitle}
                            titleLight={content?.editorial?.titleLight}
                            titleBold={content?.editorial?.titleBold}
                            description={content?.editorial?.description}
                            footerTag={content?.editorial?.footerTag}
                        />
                    </EntranceReveal>
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Client Island) */}
                <GalleryMarbles />

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>
            </div>
        </section >
    );
};

export default GalleryShell;
