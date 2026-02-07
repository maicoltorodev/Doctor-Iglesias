import React from 'react';
import { EditorialCard } from '@/components/ui/EditorialCard';

export const AboutPhilosophyCard = () => (
    <Obra
        category="Nuestra Filosofía"
        title="Precisión & Arte"
    >
        <div className="flex flex-col justify-center h-full relative">
            <h3 className="text-3xl font-light text-black/80 mb-6 leading-tight">
                Fusión de <span className="font-serif italic text-black/60">Ciencia & Estética</span>
            </h3>
            <p className="text-lg font-light text-black/70 leading-relaxed relative z-10">
                &quot;Fusionamos la ciencia más avanzada con una visión estética única para restaurar su belleza natural.&quot;
            </p>
        </div>
    </Obra>
);

export const AboutExperienceCard = () => (
    <Obra
        category="Trayectoria"
        title="Experiencia Consagrada"
    >
        <div className="flex flex-col justify-center h-full relative">
            <h3 className="text-[80px] font-extralight text-black/80 leading-none mb-2">
                +30
            </h3>
            <p className="text-xl font-serif italic text-black/50 mb-8">Años de Excelencia</p>

            <div className="h-[1px] w-12 bg-black/10 mb-8"></div>

            <p className="text-lg font-light text-black/70 leading-relaxed">
                Liderando el sector de la medicina estética con tecnología de punta y resultados comprobados.
            </p>
        </div>
    </Obra>
);

import { Obra } from '@/components/ui/Obra';

// ... AboutTextBlock remains the same ...

export const AboutDoctorBlock = () => (
    <Obra
        src="/doctor.webp"
        alt="Doctor Jorge Iglesias"
        category="Director Médico"
        title="Dr. Jorge Iglesias Márquez"
        overlayTitle="Líder Médico"
        overlayDescription="Líder en medicina estética con un enfoque integral y personalizado."
        priority
    />
);

export const AboutEditorialBlock = () => (
    <EditorialCard
        subtitle="Ciencia & Bienestar"
        titleLight="Nuestra"
        titleBold="Filosofía"
        description="La salud de su piel es la base de su belleza natural."
        footerTag="Cuidado Médico"
    />
);
