"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * MOBILE MARBLE TRIANGLE - Versión optimizada para Mobile Stories
 * 
 * CARACTERÍSTICAS (Optimización Mobile):
 * - Estándar Pure Static (CSS-heavy, JS-light)
 * - Clipping nativo vía Tailwind/CSS para rendimiento
 * - Animaciones simplificadas vía Framer Motion para fluidez táctil
 * - Textura de mármol real con sheen minimalista
 */

interface MobileMarbleTriangleProps {
    side: 'left' | 'right';
    className?: string;
}

export const MobileMarbleTriangle: React.FC<MobileMarbleTriangleProps> = ({
    side,
    className = ""
}) => {
    const isLeft = side === 'left';

    // Clip Path optimizado para mobile (triángulo perfecto)
    const clipPath = isLeft
        ? "polygon(0 0, 0 100%, 100% 100%)"
        : "polygon(100% 0, 100% 100%, 0 100%)";

    return (
        <motion.div
            initial={{
                x: isLeft ? -100 : 100,
                opacity: 0
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.8
            }}
            className={`absolute bottom-0 ${isLeft ? 'left-0' : 'right-0'} w-[42vw] aspect-[2.4/1] overflow-hidden pointer-events-none drop-shadow-[-10px_-10px_30px_rgba(0,0,0,0.3)] ${className}`}
        >
            {/* CAPA DE TEXTURA DE MÁRMOL */}
            <div
                className="absolute inset-0 bg-marble-texture"
                style={{
                    clipPath,
                    WebkitClipPath: clipPath
                }}
            >
                {/* SHEEN ARQUITECTÓNICO (Versión Mobile simplificada) */}
                <div className="absolute inset-0 opacity-40 marble-architectural-sheen" />

                {/* BORDE DE LUJO SUTIL */}
                <div
                    className="absolute inset-0 border-t border-white/20"
                    style={{
                        clipPath,
                        WebkitClipPath: clipPath
                    }}
                />

                {/* BRILLO LINEAL (Optimización mobile) */}
                <div
                    className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transform ${isLeft ? '-rotate-[20deg]' : 'rotate-[20deg]'} origin-bottom-${side}`}
                />
            </div>
        </motion.div>
    );
};

export default MobileMarbleTriangle;
