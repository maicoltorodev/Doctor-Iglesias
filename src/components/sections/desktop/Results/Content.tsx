import React from 'react';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { SectionArrow } from '@/components/ui/SectionArrow';
import { Obra } from '@/components/ui/Obra';

export const ResultsEditorialBlock = ({ content }: { content: any }) => (
    <div className="flex flex-row items-center">
        <EditorialCard
            subtitle={content.editorial.subtitle}
            titleLight={content.editorial.titleLight}
            titleBold={content.editorial.titleBold}
            description={content.editorial.description}
            footerTag={content.editorial.footerTag}
        />

        {/* FLECHA ESCRITORIO (Al lado, Horizontal) */}
        <SectionArrow direction="right" className="ml-48" />
    </div>
);

interface ResultComparisonContentProps {
    item: {
        title: string;
        id: string;
        before: string;
        after: string;
    };
    content: any;
}

export const ResultComparisonContent: React.FC<ResultComparisonContentProps> = ({ item, content }) => (
    <div className="flex gap-8">
        {/* Before */}
        <Obra
            src={item.before}
            alt={`${content.comparison.before} - ${item.title}`}
            category={`${content.comparison.tag} ${item.id}`}
            title={content.comparison.before}
        />
        {/* After */}
        <Obra
            src={item.after}
            alt={`${content.comparison.after} - ${item.title}`}
            category={`${content.comparison.tag} ${item.id}`}
            title={content.comparison.after}
        />
    </div>
);
