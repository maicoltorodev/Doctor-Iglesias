import React from 'react';
import Image from 'next/image';
import { EditorialCard } from '@/components/ui/EditorialCard';

export const ResultsEditorial = () => (
    <EditorialCard
        subtitle="Piel Saludable"
        titleLight="Casos de"
        titleBold="Éxito"
        description="Resultados que reflejan la excelencia en el tratamiento médico."
        footerTag="Experiencia Real"
    />
);

interface ResultComparisonContentProps {
    item: {
        title: string;
        id: string;
        before: string;
        after: string;
    };
}

export const ResultComparisonContent: React.FC<ResultComparisonContentProps> = ({ item }) => (
    <div className="group relative">
        {/* Canvas de Comparativa, Mobile Size */}
        <div className="relative flex gap-4">
            {/* ANTES */}
            <div className="w-60 aspect-[3/4.5] relative rounded-[30px] overflow-hidden bg-white ring-1 ring-black/10 shadow-premium-levitation group/result transition-all duration-700 ease-in-out">
                <Image
                    src={item.before}
                    alt="Antes"
                    fill
                    sizes="240px"
                    className="object-cover saturate-[0.7] brightness-[0.9] transition-all duration-[2s]"
                />
            </div>
            {/* DESPUÉS */}
            <div className="w-60 aspect-[3/4.5] relative rounded-[30px] overflow-hidden bg-white ring-1 ring-black/20 shadow-premium-levitation group/result transition-all duration-700 ease-in-out">
                <Image
                    src={item.after}
                    alt="Después"
                    fill
                    sizes="240px"
                    className="object-cover transition-all duration-[2s]"
                />
            </div>
        </div>

        {/* Metadata absoluta */}
        <div className="absolute top-[calc(100%+2rem)] left-0 right-0 space-y-3 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">Resultado Real {item.id}</p>
            <p className="text-lg font-light text-black/80 tracking-[0.05em] leading-tight">{item.title}</p>
        </div>
    </div>
);
