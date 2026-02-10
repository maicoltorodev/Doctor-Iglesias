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
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setHasMounted(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.nav
            suppressHydrationWarning
            initial={{ y: -100 }}
            animate={{ y: isLogoHovered ? -100 : 0 }}
            transition={{
                y: {
                    duration: isLogoHovered ? 0.4 : 0.6,
                    ease: [0.23, 1, 0.32, 1],
                    delay: !hasMounted ? 0.8 : 0
                }
            }}
            className="fixed top-0 left-0 right-0 h-[100px] z-[100]"
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
                        {navLinks.slice(0, 3).map((link) => {
                            const isActive = activeIndex === link.index;

                            return (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="relative px-4 py-3 group transition-colors duration-500 outline-none focus:outline-none"
                                >
                                    {/* 2. EL RESALTADO: Una cápsula sutil que "vuela" entre botones */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active-bg-left" // ID único para el bloque izquierdo
                                                className="absolute inset-0 bg-black/[0.12] rounded-xl z-0"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* 3. EL TEXTO: Cambia de peso o color al estar activo */}
                                    <span className={`
                relative z-10 text-[11px] xl:text-[13px] uppercase font-extrabold 
                transition-all duration-500 tracking-[0.35em]
                ${isActive ? 'text-black scale-110' : 'text-black/40 group-hover:text-black/70'}
            `}>
                                        {link.label}
                                    </span>

                                    {/* 4. LA LÍNEA: Ahora solo aparece si está activo O en hover */}
                                    <motion.span
                                        className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-black rounded-full
                    transition-all duration-500
                    ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-30'}
                `}
                                    />
                                </button>
                            );
                        })}
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
                                className="relative px-8 flex items-center justify-center group outline-none focus:outline-none"
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
                        {navLinks.slice(4).map((link) => {
                            // 1. Detectamos si este link es el que debe estar resaltado
                            const isActive = activeIndex === link.index;

                            return (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="relative px-4 py-3 group transition-colors duration-500 outline-none focus:outline-none"
                                >
                                    {/* 2. EL RESALTADO: Una cápsula sutil que "vuela" entre botones */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active-bg-right" // ID único para el bloque derecho
                                                className="absolute inset-0 bg-black/[0.12] rounded-xl z-0"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* 3. EL TEXTO: Cambia de peso o color al estar activo */}
                                    <span className={`
                relative z-10 text-[11px] xl:text-[13px] uppercase font-extrabold 
                transition-all duration-500 tracking-[0.35em]
                ${isActive ? 'text-black scale-110' : 'text-black/40 group-hover:text-black/70'}
            `}>
                                        {link.label}
                                    </span>

                                    {/* 4. LA LÍNEA: Ahora solo aparece si está activo O en hover */}
                                    <motion.span
                                        className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-black rounded-full
                    transition-all duration-500
                    ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-30'}
                `}
                                    />
                                </button>
                            );
                        })}
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
        </motion.nav>
    );
};

export default DesktopNavbar;
