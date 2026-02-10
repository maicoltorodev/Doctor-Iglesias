"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MobileBackLinkProps {
    onClick?: () => void;
    className?: string;
    label?: string;
    variant?: 'light' | 'dark';
}

/**
 * MOBILE BACK LINK - Componente exclusivo para móvil
 * 
 * Diseño ultra-optimizado:
 * - Logo Dr. Iglesias (adaptable a fondo)
 * - Texto "REGRESAR" con tipografía de alta gama (tracking extendido)
 * - Área de toque optimizada
 * - Animación de escala sutil
 */
export const MobileBackLink: React.FC<MobileBackLinkProps> = ({
    onClick,
    className = "",
    label = "Regresar",
    variant = "dark"
}) => {
    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.94 }}
            className={`flex flex-col items-center group transition-all duration-300 ${className}`}
        >
            {/* LOGO OPTIMIZADO */}
            <div className="relative mb-2">
                <img
                    src="/logo.webp"
                    alt="Dr. Jorge Iglesias"
                    className={`h-9 w-auto object-contain transition-all duration-500 ${variant === 'dark'
                        ? 'brightness-0 invert opacity-60'
                        : 'opacity-70'
                        }`}
                />
                {/* ÁREA DE RESPLANDOR (SUTIL) */}
                <div className={`absolute inset-0 blur-xl rounded-full opacity-5 ${variant === 'dark' ? 'bg-white' : 'bg-black'
                    }`}></div>
            </div>

            {/* TEXTO ETIQUETA */}
            <span className={`text-[8px] uppercase tracking-[0.6em] font-bold transition-colors ${variant === 'dark' ? 'text-white/40' : 'text-black/50'
                }`}>
                {label}
            </span>

            {/* LÍNEA DE ACENTO ( OPCIONAL / DISEÑO ) */}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '20px' }}
                className={`h-[1px] mt-2 transition-colors ${variant === 'dark' ? 'bg-white/10' : 'bg-black/10'
                    }`}
            />
        </motion.button>
    );
};

export default MobileBackLink;
