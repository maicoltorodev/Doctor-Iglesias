import React from 'react';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { SectionArrow } from '@/components/ui/SectionArrow';

export const ResultsEditorialBlock = () => (
    <div className="flex flex-row items-center">
        <EditorialCard
            subtitle="Piel Saludable"
            titleLight="Casos de"
            titleBold="Éxito"
            description="Resultados que reflejan la excelencia en el tratamiento médico."
            footerTag="Experiencia Real"
        />

        {/* FLECHA ESCRITORIO (Al lado, Horizontal) */}
        <SectionArrow direction="right" className="ml-48" />
    </div>
);

import { Obra } from '@/components/ui/Obra';

// ... ResultsEditorialBlock remains the same ...

interface ResultComparisonContentProps {
    item: {
        title: string;
        id: string;
        before: string;
        after: string;
    };
}

export const ResultComparisonContent: React.FC<ResultComparisonContentProps> = ({ item }) => (
    <div className="flex gap-8">
        {/* Before */}
        <Obra
            src={item.before}
            alt={`Antes - ${item.title}`}
            category={`Resultado Real ${item.id}`}
            title="Antes"
        />
        {/* After */}
        <Obra
            src={item.after}
            alt={`Después - ${item.title}`}
            category={`Resultado Real ${item.id}`}
            title="Después"
        />
    </div>
);
