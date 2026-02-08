"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { SectionArrow } from '@/components/ui/SectionArrow';

interface ServicesShellProps {
    editorial: React.ReactNode;
    items: React.ReactNode[];
}

const ServicesShell: React.FC<ServicesShellProps> = ({ editorial, items }) => {
    const { activeIndex, visibleSections } = useDesktopScroll();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
        }
    };

    return (
        <section id="servicios" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                {/* INTRODUCCIÓN EDITORIAL */}
                <motion.div
                    id="servicios-title"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-row items-center flex-shrink-0 group/editorial-services"
                >
                    {editorial}

                    {/* FLECHA ESCRITORIO (Lado) con Animación Continua */}
                    <SectionArrow direction="right" className="ml-72" />
                </motion.div>

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                {/* 2. GALERÍA DE TARJETAS (SCREENS) con Reveal de Lujo */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.01 }}
                    variants={containerVariants}
                    className="flex gap-56"
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="w-auto h-auto block"
                        >
                            {item}
                        </motion.div>
                    ))}
                </motion.div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (TRIÁNGULOS) */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={activeIndex === 4 ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 clip-triangle-left bg-marble-texture border-t border-r border-white/20"
                        >
                            {/* Brillo Especular */}
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/60 to-transparent transform -rotate-[19.8deg] origin-top-right translate-y-[0.5px]"></div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={activeIndex === 4 ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20"
                        >
                            {/* Brillo Especular */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                        </motion.div>
                    </div>
                </div>

                <div className="flex-shrink-0 w-[45vw]" aria-hidden="true"></div>
            </div>
        </section>
    );
};

export default ServicesShell;
