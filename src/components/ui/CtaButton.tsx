"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { CONTACT_INFO } from '@/constants/content';

interface CtaButtonProps {
    href?: string;
    label?: string;
    className?: string;
    onClick?: () => void;
    isAutoShimmer?: boolean;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
    href = CONTACT_INFO.whatsappUrl,
    label = "Agendar Cita",
    className = "",
    onClick,
    isAutoShimmer = false
}) => {
    // Definimos el ADN de lujo con Framer Motion para control absoluto del movimiento
    const buttonVariants: Variants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1] as [number, number, number, number]
            }
        },
        tap: { scale: 0.96 }
    };

    const shimmerVariants: Variants = {
        initial: { x: "-150%", skewX: -45 },
        hover: {
            x: "150%",
            transition: {
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5
            }
        },
        animate: {
            x: "150%",
            transition: {
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
            }
        }
    };

    const content = (
        <>
            {/* 1. Shimmer dinámico con Framer Motion (Efecto barrido infinito) */}
            <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate={isAutoShimmer ? "animate" : undefined}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
            />

            {/* 2. Overlay de gradiente estático para profundidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 z-10"></div>

            {/* 3. Contenedor de Texto */}
            <div className="relative z-30 flex items-center justify-center">
                <span className="text-[11px] lg:text-[13px] font-extrabold uppercase tracking-[0.3em] lg:tracking-[0.4em] group-hover:tracking-[0.55em] transition-all duration-700 text-center w-full">
                    {label}
                </span>
            </div>

        </>
    );

    const fullClasses = `
        relative inline-flex items-center justify-center 
        bg-black text-white 
        rounded-full 
        group overflow-hidden 
        decoration-none
        border border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,0.2)]
        ${className}
    `.replace(/\s+/g, ' ').trim();

    if (onClick) {
        return (
            <motion.button
                onClick={onClick}
                className={fullClasses}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
            >
                {content}
            </motion.button>
        );
    }

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className="decoration-none">
            <motion.div
                className={fullClasses}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
            >
                {content}
            </motion.div>
        </Link>
    );
};
