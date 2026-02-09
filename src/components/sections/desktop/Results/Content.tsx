import React from 'react';
import { EditorialCard } from '@/components/ui/desktop/EditorialCard';
import { SectionArrow } from '@/components/ui/desktop/SectionArrow';
import { Obra } from '@/components/ui/desktop/Obra';

export const ResultsEditorialBlock = ({ content }: { content: any }) => {
    const data = content?.editorial || content || {};
    return (
        <div className="flex flex-row items-center">
            <EditorialCard
                subtitle={data.subtitle}
                titleLight={data.titleLight}
                titleBold={data.titleBold}
                description={data.description}
                footerTag={data.footerTag}
            />

            {/* FLECHA ESCRITORIO (Al lado, Horizontal) */}
            <SectionArrow direction="right" className="ml-48" />
        </div>
    );
};

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
