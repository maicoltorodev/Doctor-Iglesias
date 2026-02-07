"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';

interface HeroShellProps {
    background: React.ReactNode;
    logo: React.ReactNode;
    text: React.ReactNode;
    cta: React.ReactNode;
}

const HeroShell: React.FC<HeroShellProps> = ({ background, logo, text, cta }) => {
    const { setIsLogoHovered, isLogoHovered, activeIndex } = useDesktopScroll();
    const [isLeftTriangleHovered, setIsLeftTriangleHovered] = React.useState(false);
    const [isRightTriangleHovered, setIsRightTriangleHovered] = React.useState(false);

    // Orquestación del Reveal de Lujo
    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.0,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 1 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1] as [number, number, number, number]
            }
        }
    };

    const marbleVariants: Variants = {
        hiddenLeft: { x: "-100%", opacity: 0 },
        hiddenRight: { x: "100%", opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <section id="hero" className="min-w-screen h-full flex-shrink-0 relative overflow-hidden bg-[#e6e3e8] section-contain">
            {background}
            <div className="absolute inset-0 z-50 pointer-events-none">
                {/* SENSORS: Capas invisibles para activar el efecto al pasar el mouse sobre los triángulos */}
                <div
                    onMouseEnter={() => setIsLeftTriangleHovered(true)}
                    onMouseLeave={() => setIsLeftTriangleHovered(false)}
                    className="absolute bottom-0 left-0 w-[500px] h-[180px] pointer-events-auto cursor-none clip-triangle-left z-10"
                />
                <div
                    onMouseEnter={() => setIsRightTriangleHovered(true)}
                    onMouseLeave={() => setIsRightTriangleHovered(false)}
                    className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-auto cursor-none clip-triangle-right z-10"
                />

                {/* Esquina Inferior Izquierda */}
                <div className="absolute bottom-0 left-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                    <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${activeIndex === 3 ? ((isLogoHovered || isLeftTriangleHovered) ? '-translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100') : '-translate-x-full opacity-0'}`}>
                        <div className="absolute inset-0 clip-triangle-left bg-marble-texture border-t border-r border-white/20">
                            {/* Brillo Especular en el borde del corte */}
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/60 to-transparent transform -rotate-[19.8deg] origin-top-right translate-y-[0.5px]"></div>
                        </div>
                    </div>
                </div>

                {/* Esquina Inferior Derecha */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                    <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${activeIndex === 3 ? ((isLogoHovered || isRightTriangleHovered) ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100') : 'translate-x-full opacity-0'}`}>
                        <div className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20">
                            {/* Brillo Especular en el borde del corte */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENIDO ORQUESTRADO */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 lg:p-16 pointer-events-none"
            >
                <div className="flex flex-col items-center justify-center pointer-events-auto w-full max-w-[900px] space-y-8 lg:space-y-12 translate-y-[2vh]">

                    {/* LOGO WRAPPER - Con efecto Cristal */}
                    <motion.div
                        variants={itemVariants}
                        onMouseEnter={() => setIsLogoHovered?.(true)}
                        onMouseLeave={() => setIsLogoHovered?.(false)}
                        className="relative w-full max-w-[300px] lg:max-w-[750px] h-32 lg:h-[240px] flex items-center justify-center p-2 lg:p-4 transition-transform duration-700 hover:scale-[1.02]"
                    >
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] lg:rounded-[60px] shadow-2xl"></div>
                        <div className="relative z-10 w-full h-full">
                            {logo}
                        </div>
                    </motion.div>

                    {/* TEXTO Y CTA */}
                    <div className="flex flex-col items-center space-y-12 lg:space-y-20">
                        <motion.div variants={itemVariants}>
                            {text}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            {cta}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section >
    );
};

export default HeroShell;
