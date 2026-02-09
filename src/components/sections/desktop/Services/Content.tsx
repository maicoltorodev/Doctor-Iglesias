import React from 'react';

import { EditorialCard } from '@/components/ui/EditorialCard';
import { Obra } from '@/components/ui/Obra';

export const ServicesEditorialBlock = ({ content }: { content: any }) => {
    const data = content?.editorial || content || {};
    return (
        <EditorialCard
            subtitle={data.subtitle}
            titleLight={data.titleLight}
            titleBold={data.titleBold}
            description={data.description}
            footerTag={data.footerTag}
        />
    );
};

interface ServiceCardContentProps {
    spec: { slug: string; label: string; description: string };
    imgSrc: string;
    content: any;
}

export const ServiceCardContent: React.FC<ServiceCardContentProps> = ({ spec, imgSrc, content }) => (
    <Obra
        href={`/servicio/${spec.slug}`}
        src={imgSrc}
        alt={spec.label}
        category={content.cards.category}
        title={spec.label}
        overlayTitle={content.cards.overlayTitle}
        overlayDescription={spec.description}
        overlayTag={content.cards.overlayTag}
    />
);
