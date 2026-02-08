"use client";

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface DesktopNavbarProps {
    activeIndex: number;
    scrollToSection: (id: string) => void;
    isLogoHovered: boolean;
    navLinks: any[];
    heroContent: any;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ activeIndex, scrollToSection, isLogoHovered, navLinks, heroContent }) => {
    return (
        <nav
            className={`fixed top-0 left-0 right-0 h-[100px] z-[100] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isLogoHovered ? '-translate-y-full' : 'translate-y-0'
                }`}
        >
            {/* FONDO DE TEXTURA DE MÁRMOL CON PROFUNDIDAD Y SOMBRA MARCADA */}
            <div className="absolute inset-0 bg-marble-texture opacity-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-b border-black/5">
                <div className="absolute inset-0 marble-architectural-sheen opacity-40"></div>
                {/* Capa de vidrio sutil para realismo */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
            </div>

            {/* CONTENIDO DEL NAVBAR */}
            <div className="relative z-10 w-full h-full px-12 lg:px-20">
                <div className="flex w-full h-full items-center relative">

                    {/* GUÍA DE NAVEGACIÓN IZQUERDA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 0.2, x: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 select-none"
                    >
                        <span className="text-[9px] tracking-[0.5em] uppercase font-bold italic">← {heroContent.sideTexts.left}</span>
                    </motion.div>

                    {/* BLOQUE IZQUIERDO */}
                    <div className="flex-1 flex justify-end gap-12 xl:gap-20 pr-16">
                        {navLinks.slice(0, 3).map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="relative text-[11px] xl:text-[13px] tracking-[0.35em] uppercase font-extrabold text-black/60 hover:text-black transition-all duration-500 py-3 group"
                            >
                                <span className="relative z-10 transition-transform duration-500 block group-hover:-translate-y-0.5">{link.label}</span>

                                {/* Indicador Activo: Liquid Motion con Framer */}
                                {activeIndex === link.index && (
                                    <motion.span
                                        layoutId="nav-line"
                                        className="absolute bottom-1 left-0 right-0 h-[3px] bg-black rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-black/20 group-hover:w-full transition-all duration-500 rounded-full" />
                            </button>
                        ))}
                    </div>

                    {/* LOGO CENTRAL (EJE) */}
                    <div className="flex-shrink-0 px-6">
                        {navLinks.filter(l => l.isLogo).map((link) => (
                            <motion.button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                initial={{ scale: 0.9, opacity: 0, y: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    y: [0, -4, 0] // Flote sutil
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{
                                    scale: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
                                    opacity: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
                                    y: {
                                        duration: 4.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="relative px-8 flex items-center justify-center group"
                            >
                                {/* LÍNEAS VERTICALES: Efecto Pulso */}
                                <AnimatePresence>
                                    {activeIndex === link.index && (
                                        <>
                                            <motion.span
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{ scaleY: 1, opacity: 1 }}
                                                exit={{ scaleY: 0, opacity: 0 }}
                                                className="absolute left-0 w-[4px] h-10 bg-black rounded-full"
                                            />
                                            <motion.span
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{ scaleY: 1, opacity: 1 }}
                                                exit={{ scaleY: 0, opacity: 0 }}
                                                className="absolute right-0 w-[4px] h-10 bg-black rounded-full"
                                            />
                                        </>
                                    )}
                                </AnimatePresence>

                                <Image
                                    src="/logo.webp"
                                    alt="Dr. Jorge Iglesias Márquez"
                                    width={240}
                                    height={60}
                                    className="h-12 lg:h-14 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
                                    priority
                                />
                            </motion.button>
                        ))}
                    </div>

                    {/* BLOQUE DERECHO */}
                    <div className="flex-1 flex justify-start gap-12 xl:gap-20 pl-16">
                        {navLinks.slice(4).map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="relative text-[11px] xl:text-[13px] tracking-[0.35em] uppercase font-extrabold text-black/60 hover:text-black transition-all duration-500 py-3 group"
                            >
                                <span className="relative z-10 transition-transform duration-500 block group-hover:-translate-y-0.5">{link.label}</span>

                                {activeIndex === link.index && (
                                    <motion.span
                                        layoutId="nav-line"
                                        className="absolute bottom-1 left-0 right-0 h-[3px] bg-black rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-black/20 group-hover:w-full transition-all duration-500 rounded-full" />
                            </button>
                        ))}
                    </div>

                    {/* GUÍA DE NAVEGACIÓN DERECHA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 0.2, x: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 select-none"
                    >
                        <span className="text-[9px] tracking-[0.5em] uppercase font-bold italic">{heroContent.sideTexts.right} →</span>
                    </motion.div>

                </div>
            </div>
        </nav>
    );
};

export default DesktopNavbar;
