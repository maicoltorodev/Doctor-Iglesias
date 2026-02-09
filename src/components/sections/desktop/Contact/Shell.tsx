import React from 'react';
import { EntranceReveal } from '@/components/ui/desktop/EntranceReveal';
import { SectionArrow } from '@/components/ui/desktop/SectionArrow';
import { ContactMarbles } from './Marbles';

interface ContactShellProps {
    editorial: React.ReactNode;
    mapCard: React.ReactNode;
    clinicCard: React.ReactNode;
    socialsCard: React.ReactNode;
}

const ContactShell: React.FC<ContactShellProps> = ({ editorial, mapCard, clinicCard, socialsCard }) => {
    return (
        <section id="contacto" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                {/* Espaciador INICIAL (desde Galería) */}
                <div className="flex-shrink-0 w-[35vw] hidden lg:block" aria-hidden="true"></div>

                {/* 1. GALERÍA DE TARJETAS (Exposición SCREENS) */}
                <div className="flex flex-row gap-40 items-center">

                    {/* SCREEN 1: MAPA GOOGLE */}
                    <div className="w-auto h-auto block">
                        <EntranceReveal sectionId="contacto" delay="100ms">
                            {mapCard}
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 2: LA CLÍNICA */}
                    <div className="w-auto h-auto block">
                        <EntranceReveal sectionId="contacto" delay="200ms">
                            {clinicCard}
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 3: CANALES DIRECTOS */}
                    <div className="w-auto h-auto block">
                        <EntranceReveal sectionId="contacto" delay="300ms">
                            {socialsCard}
                        </EntranceReveal>
                    </div>

                </div>

                {/* Espacio CENTRAL (Hacia Título - Gran Aire) */}
                <div className="flex-shrink-0 w-[35vw] block" aria-hidden="true"></div>

                {/* FLECHA IZQUIERDA (Espejo) */}
                <div className="mr-56">
                    <EntranceReveal sectionId="contacto" delay="400ms" direction="none">
                        <SectionArrow direction="left" />
                    </EntranceReveal>
                </div>

                {/* SCREEN 4: TÍTULO EDITORIAL SECCIÓN */}
                <div id="contacto-title" className="w-auto h-auto block">
                    <EntranceReveal sectionId="contacto" direction="up" className="translate-y-20">
                        {editorial}
                    </EntranceReveal>
                </div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Client Island) */}
                <ContactMarbles />

                {/* Espaciador de Salida (Conexión Directa con Hero - Núcleo Central) */}
                <div className="flex-shrink-0 w-[35vw] block" aria-hidden="true"></div>

            </div>
        </section>
    );
};

export default ContactShell;
