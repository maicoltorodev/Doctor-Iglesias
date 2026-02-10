"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileBackLink } from '@/components/ui/mobile/MobileBackLink';
import {
    Users,
    Camera,
    Phone,
    Home,
    Stethoscope,
    Sparkles,
    Heart,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    sections: { name: string; index: number }[];
    currentSectionIndex: number;
    onSectionClick: (index: number) => void;
}

const SECTION_ICONS = [
    Users,       // 0: Nosotros
    Camera,      // 1: Galería
    Phone,       // 2: Contacto
    Home,        // 3: Inicio
    Stethoscope, // 4: Servicios
    Sparkles,    // 5: Resultados
    Heart        // 6: Testimonios
];

/**
 * MOBILE MENU - MINIMALIST STEPPER
 * 
 * Navegación ultra-simple y elegante.
 * Muestra el nombre de la sección, un icono representativo y controles laterales.
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    onClose,
    sections,
    currentSectionIndex,
    onSectionClick
}) => {
    const [previewIndex, setPreviewIndex] = useState(currentSectionIndex);

    const handleNext = () => {
        setPreviewIndex((prev) => (prev + 1) % sections.length);
    };

    const handlePrev = () => {
        setPreviewIndex((prev) => (prev - 1 + sections.length) % sections.length);
    };

    const handleSelect = () => {
        onSectionClick(previewIndex);
        onClose();
    };

    const Icon = SECTION_ICONS[previewIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-[#e6e3e8] flex flex-col items-center justify-between overflow-hidden py-12"
                >
                    {/* FONDO ARQUITECTÓNICO (MÁRMOL CLARO) */}
                    <div className="absolute inset-0 bg-marble-texture opacity-30 mix-blend-multiply pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/[0.02] pointer-events-none"></div>

                    {/* HEADER / REGRESAR */}
                    <div className="relative z-20">
                        <MobileBackLink
                            onClick={onClose}
                            label="Regresar"
                            variant="light"
                        />
                    </div>

                    {/* CONTENIDO CENTRAL (SECCIÓN + ICONO + FLECHAS) */}
                    <div className="relative z-10 w-full flex flex-col items-center px-6">

                        {/* ETIQUETA SECCIÓN */}
                        <motion.span
                            key={`label-sec-${previewIndex}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.2, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-black text-[10px] uppercase font-bold tracking-[1em] mb-0"
                        >
                            Sección
                        </motion.span>

                        {/* NOMBRE DE SECCIÓN (BLUR REVEAL ULTRA-FAST) */}
                        <div className="h-24 flex items-center justify-center text-center">
                            <AnimatePresence>
                                <motion.h2
                                    key={sections[previewIndex].name}
                                    initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -15, filter: 'blur(8px)', position: 'absolute' }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="text-4xl font-serif italic text-black tracking-widest uppercase"
                                >
                                    {sections[previewIndex].name}
                                </motion.h2>
                            </AnimatePresence>
                        </div>

                        {/* NAVEGADOR DE ICONO */}
                        <div className="w-full flex items-center justify-between mt-12 max-w-[280px]">
                            {/* FLECHA IZQ */}
                            <motion.button
                                whileTap={{ x: -10, scale: 0.8 }}
                                onClick={handlePrev}
                                className="p-4 text-black active:scale-95 transition-all"
                            >
                                <motion.div
                                    animate={{ x: [-3, 3, -3] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ChevronLeft size={32} strokeWidth={2} className="text-black" />
                                </motion.div>
                            </motion.button>

                            {/* ICONO CENTRAL (BOTÓN DE ENTRADA) */}
                            <motion.button
                                key={`icon-${previewIndex}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSelect}
                                className="relative flex items-center justify-center p-8 bg-black/[0.04] rounded-full border border-black/10 shadow-inner"
                            >
                                <Icon size={48} strokeWidth={2} className="text-black" />

                                {/* Aura sutil */}
                                <div className="absolute inset-0 bg-white/60 blur-2xl rounded-full -z-10" />
                            </motion.button>

                            {/* FLECHA DER */}
                            <motion.button
                                whileTap={{ x: 10, scale: 0.8 }}
                                onClick={handleNext}
                                className="p-4 text-black active:scale-95 transition-all"
                            >
                                <motion.div
                                    animate={{ x: [3, -3, 3] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ChevronRight size={32} strokeWidth={2} className="text-black" />
                                </motion.div>
                            </motion.button>
                        </div>

                        {/* INDICADOR DE POSICIÓN SUTIL */}
                        <div className="flex space-x-2 mt-12">
                            {sections.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-[1px] transition-all duration-500 ${idx === previewIndex ? 'w-4 bg-black/40' : 'w-1 bg-black/10'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* FOOTER BRANDING */}
                    <div className="relative flex flex-col items-center space-y-4">
                        <div className="w-8 h-[1px] bg-black/10"></div>
                        <p className="text-[7px] uppercase tracking-[0.5em] text-black/30 font-bold">Dr. Jorge Iglesias Márquez</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
