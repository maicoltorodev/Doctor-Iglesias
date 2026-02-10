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

/**
 * CTA BUTTON MOBILE - Optimizado para rendimiento táctil.
 * Se eliminan lógicas de hover innecesarias para ahorrar ciclos de CPU en móviles.
 */
export const CtaButton: React.FC<CtaButtonProps> = ({
    href = CONTACT_INFO.whatsappUrl,
    label = "Agendar Cita",
    className = "",
    onClick,
    isAutoShimmer = false
}) => {
    // Definimos animaciones simplificadas para móvil (solo feedback táctil)
    const buttonVariants: Variants = {
        initial: { scale: 1 },
        tap: { scale: 0.95 }
    };

    const shimmerVariants: Variants = {
        initial: { x: "-150%", skewX: -45 },
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
            {/* Shimmer Automático (Efecto barrido) */}
            {isAutoShimmer && (
                <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 pointer-events-none"
                />
            )}

            {/* Overlay sutil de profundidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent z-10"></div>

            {/* Texto del Botón */}
            <div className="relative z-30 flex items-center justify-center">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-center w-full">
                    {label}
                </span>
            </div>
        </>
    );

    const fullClasses = `
        relative inline-flex items-center justify-center 
        bg-black text-white 
        rounded-full 
        overflow-hidden 
        decoration-none
        border border-white/10
        shadow-lg
        active:bg-zinc-900
        ${className}
    `.replace(/\s+/g, ' ').trim();

    if (onClick) {
        return (
            <motion.button
                onClick={onClick}
                className={fullClasses}
                variants={buttonVariants}
                initial="initial"
                whileTap="tap"
            >
                {content}
            </motion.button>
        );
    }

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" className="decoration-none block w-full">
            <motion.div
                className={fullClasses}
                variants={buttonVariants}
                initial="initial"
                whileTap="tap"
            >
                {content}
            </motion.div>
        </Link>
    );
};
