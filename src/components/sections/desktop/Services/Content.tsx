import React from 'react';

import { EditorialCard } from '@/components/ui/EditorialCard';

export const ServicesEditorialBlock = () => (
    <EditorialCard
        subtitle="Medicina & Estética"
        titleLight="Estética &"
        titleBold="Cuidado"
        description="Protocolos diseñados para armonizar y potenciar su belleza natural."
        footerTag="Estética Avanzada"
    />
);

import { Obra } from '@/components/ui/Obra';

// ... ServicesEditorialBlock remains the same ...

interface ServiceCardContentProps {
    spec: { slug: string; label: string; description: string };
    imgSrc: string;
}

export const ServiceCardContent: React.FC<ServiceCardContentProps> = ({ spec, imgSrc }) => (
    <Obra
        href={`/servicio/${spec.slug}`}
        src={imgSrc}
        alt={spec.label}
        category="Servicio Especializado"
        title={spec.label}
        overlayTitle="Protocolos Médicos"
        overlayDescription={spec.description}
        overlayTag="Ver Detalles"
    />
);
