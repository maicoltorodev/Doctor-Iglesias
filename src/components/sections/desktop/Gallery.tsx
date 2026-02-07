"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { EditorialCard } from '../../ui/EditorialCard';
import { Obra } from '@/components/ui/Obra';
import { SectionArrow } from '@/components/ui/SectionArrow';

const Gallery = () => {
    const { activeIndex, visibleSections } = useDesktopScroll();

    const images = [
        "/clinica.webp",
        "/clinica.webp",
        "/clinica.webp",
    ];

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
        <section id="galeria" className="w-fit min-w-screen h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>

                {/* Imágenes Placeholder con Reveal de Lujo */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.01 }}
                    variants={containerVariants}
                    className="flex gap-32"
                >
                    {images.map((src, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="flex-shrink-0"
                        >
                            <Obra
                                src={src}
                                alt={`Instalación ${i + 1}`}
                                category="Nuestra Clínica"
                                title={`Sede Bogotá - Espacio ${i + 1}`}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                    className="flex-shrink-0 mr-48"
                >
                    <SectionArrow direction="left" />
                </motion.div>

                {/* Título de Sección con Editorial Reveal */}
                <motion.div
                    id="galeria-title"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                    className="flex-shrink-0"
                >
                    <EditorialCard
                        subtitle="Espacios"
                        titleLight="Nuestra"
                        titleBold="Galería"
                        description="Un recorrido visual por nuestras instalaciones de vanguardia."
                        footerTag="Instalaciones Premium"
                    />
                </motion.div>

                {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (TRIÁNGULOS) - Identidad de Marca */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={activeIndex === 1 ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute bottom-0 left-0 w-[500px] h-[180px] clip-triangle-left bg-marble-texture shadow-architectural-poly"
                    />
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={activeIndex === 1 ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute bottom-0 right-0 w-[500px] h-[180px] clip-triangle-right bg-marble-texture shadow-architectural-poly"
                    />
                </div>

                <div className="flex-shrink-0 w-[40vw]" aria-hidden="true"></div>
            </div>
        </section >
    );
};

export default Gallery;
