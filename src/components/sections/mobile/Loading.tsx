"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MobileLoading() {
    return (
        <div className="flex items-center justify-center min-h-[100dvh] w-full bg-[#f2f0f4] overflow-hidden relative">

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none z-0" />

            {/* Contenedor Atómico de Animación */}
            <div className="relative flex items-center justify-center w-32 h-32">

                {/* Único Anillo Giratorio con Hueco */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5, // Giro un poco más pausado y elegante
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0"
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="black"
                            strokeWidth="2" // Un poco más definido para mobile
                            strokeLinecap="round"
                            /* strokeDasharray="segmento_visible espacio_vacio" 
                               Crea el efecto de "hueco" que buscabas
                            */
                            strokeDasharray="140 160"
                            className="opacity-30"
                        />
                    </svg>
                </motion.div>

                {/* Logo - Entrada sutil */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-20"
                >
                    <Image
                        src="/logo.webp"
                        alt="Dr. Jorge Iglesias"
                        width={80} // Tamaño optimizado para pantallas pequeñas
                        height={80}
                        className="object-contain"
                        priority
                    />
                </motion.div>

            </div>
        </div>
    );
}