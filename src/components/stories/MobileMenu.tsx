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

    // Sincronizar previsualización con la sección actual al abrir el menú
    React.useEffect(() => {
        if (isOpen) {
            setPreviewIndex(currentSectionIndex);
        }
    }, [isOpen, currentSectionIndex]);

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

    const isCurrent = previewIndex === currentSectionIndex;
    const Icon = SECTION_ICONS[previewIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-[#e6e3e8] flex flex-col items-center justify-between overflow-hidden pt-[calc(2rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))]"
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

                        {/* ETIQUETA DINÁMICA DE ESTADO */}
                        <div className="h-4 overflow-hidden flex flex-col items-center mb-2">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={isCurrent ? 'here' : 'explore'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 0.3 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    className="text-black text-[9px] uppercase font-black tracking-[0.6em]"
                                >
                                    {isCurrent ? 'Usted está aquí' : 'Explorar sección'}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* NOMBRE DE SECCIÓN (BLUR REVEAL) */}
                        <div className="h-24 flex items-center justify-center text-center">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={sections[previewIndex].name}
                                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)', position: 'absolute' }}
                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                    className={`text-4xl font-serif italic tracking-widest uppercase ${isCurrent ? 'text-black font-black' : 'text-black/60 font-medium'}`}
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
                                <ChevronLeft size={32} strokeWidth={1} className="text-black/40" />
                            </motion.button>

                            {/* ICONO CENTRAL (BOTÓN DE ENTRADA) */}
                            <motion.button
                                key={`icon-${previewIndex}`}
                                initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSelect}
                                className={`relative flex items-center justify-center p-8 rounded-full border transition-all duration-500 ${isCurrent ? 'bg-black border-black/10 shadow-2xl' : 'bg-black/[0.04] border-black/5'}`}
                            >
                                <Icon size={48} strokeWidth={1.5} className={`${isCurrent ? 'text-white' : 'text-black'}`} />

                                {/* Efecto de halo para la sección actual */}
                                {isCurrent && (
                                    <motion.div
                                        layoutId="halo"
                                        className="absolute inset-0 bg-black/5 blur-xl -z-10 rounded-full"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                )}
                            </motion.button>

                            {/* FLECHA DER */}
                            <motion.button
                                whileTap={{ x: 10, scale: 0.8 }}
                                onClick={handleNext}
                                className="p-4 text-black active:scale-95 transition-all"
                            >
                                <ChevronRight size={32} strokeWidth={1} className="text-black/40" />
                            </motion.button>
                        </div>

                        {/* INDICADOR DE POSICIÓN (STEPPER) */}
                        <div className="flex space-x-3 mt-16 items-center">
                            {sections.map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    animate={{
                                        width: idx === previewIndex ? 20 : 6,
                                        height: idx === previewIndex ? 2 : 1,
                                        backgroundColor: idx === previewIndex ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.1)',
                                        scale: idx === currentSectionIndex ? 1.5 : 1
                                    }}
                                    className="rounded-full transition-all duration-500"
                                />
                            ))}
                        </div>
                    </div>

                    {/* FOOTER BRANDING */}
                    <div className="relative flex flex-col items-center space-y-4">
                        <div className="w-8 h-[1px] bg-black/10"></div>
                        <p className="text-[7px] uppercase tracking-[0.5em] text-black/30 font-black italic">The Master of Aesthetics</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
