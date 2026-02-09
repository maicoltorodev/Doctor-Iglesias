import React from 'react';
import { CONTACT_INFO } from '@/constants/content';
import { EntranceReveal } from '@/components/ui/mobile/EntranceReveal';
import { ContactMarbles } from './Marbles';

interface ContactShellProps {
    mapFrame: React.ReactNode;
    clinicImage: React.ReactNode;
    socialsGrid: React.ReactNode;
    editorial: React.ReactNode;
}

const ContactShell: React.FC<ContactShellProps> = ({ mapFrame, clinicImage, socialsGrid, editorial }) => {
    // Sequence in page.tsx: Contact(0), About(1), Hero(2), Services(3), Results(4)
    const SECTION_INDEX = 0;

    return (
        <section id="contacto" className="w-full min-h-screen relative bg-[#e6e3e8] text-black section-contain py-20">
            <div className="relative z-20 container mx-auto px-6">
                <div className="flex flex-col space-y-16">

                    {/* SCREEN 1: MAPA GOOGLE */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal
                            index={SECTION_INDEX}
                            delay="400ms"
                            className="w-full max-w-xs group"
                        >
                            <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation transition-all duration-700 ease-in-out">
                                {mapFrame}
                            </div>

                            <div className="mt-6 space-y-3 text-center">
                                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">Ubicación</p>
                                <p className="text-lg font-light text-black/80 leading-tight">Mapa Google</p>
                            </div>
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 2: LA CLÍNICA */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal
                            index={SECTION_INDEX}
                            delay="600ms"
                            className="w-full max-w-xs group"
                        >
                            <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation transition-all duration-700 ease-in-out">
                                {clinicImage}
                            </div>

                            <div className="mt-6 space-y-3 text-center">
                                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">Sede Principal</p>
                                <p className="text-lg font-light text-black/80 leading-tight">{CONTACT_INFO.address}</p>
                            </div>
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 3: CANALES DIRECTOS */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal
                            index={SECTION_INDEX}
                            delay="800ms"
                            className="w-full max-w-xs group"
                        >
                            <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation bg-white/50 backdrop-blur-sm transition-all duration-700 ease-in-out">
                                {socialsGrid}
                            </div>

                            <div className="mt-6 space-y-3 text-center">
                                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">Atención</p>
                                <p className="text-lg font-light text-black/80 leading-tight">Canales Directos</p>
                            </div>
                        </EntranceReveal>
                    </div>

                    {/* SCREEN 4: TÍTULO EDITORIAL SECCIÓN */}
                    <div className="flex items-center justify-center">
                        <EntranceReveal
                            index={SECTION_INDEX}
                            className="flex flex-col items-center"
                        >
                            {editorial}
                        </EntranceReveal>
                    </div>

                    {/* PIEZAS DE MÁRMOL (Client Island) */}
                    <ContactMarbles index={SECTION_INDEX} />

                </div>
            </div>
        </section>
    );
};

export default ContactShell;
