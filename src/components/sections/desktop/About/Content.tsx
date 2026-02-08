import React from 'react';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { Obra } from '@/components/ui/Obra';

export const AboutPhilosophyCard = ({ content }: { content: any }) => (
    <Obra
        category={content.category}
        title={content.title}
    >
        <div className="flex flex-col justify-center h-full relative">
            <h3 className="text-3xl font-light text-black/80 mb-6 leading-tight">
                {content.heading}
            </h3>
            <p className="text-lg font-light text-black/70 leading-relaxed relative z-10">
                &quot;{content.description}&quot;
            </p>
        </div>
    </Obra>
);

export const AboutExperienceCard = ({ content }: { content: any }) => (
    <Obra
        category={content.category}
        title={content.title}
    >
        <div className="flex flex-col justify-center h-full relative">
            <h3 className="text-[80px] font-extralight text-black/80 leading-none mb-2">
                {content.years}
            </h3>
            <p className="text-xl font-serif italic text-black/50 mb-8">{content.label}</p>

            <div className="h-[1px] w-12 bg-black/10 mb-8"></div>

            <p className="text-lg font-light text-black/70 leading-relaxed">
                {content.description}
            </p>
        </div>
    </Obra>
);

export const AboutDoctorBlock = ({ content }: { content: any }) => (
    <Obra
        src={content.image}
        alt={content.name}
        category={content.category}
        title={content.name}
        overlayTitle={content.overlayTitle}
        overlayDescription={content.overlayDescription}
        priority
    />
);

export const AboutEditorialBlock = ({ content }: { content: any }) => (
    <EditorialCard
        subtitle={content?.subtitle}
        titleLight={content?.titleLight}
        titleBold={content?.titleBold}
        description={content?.description}
        footerTag={content?.footerTag}
    />
);
