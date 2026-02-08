"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DesktopLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f2f0f4] overflow-hidden">
            <div className="relative flex flex-col items-center justify-center">

                {/* Aura de prestigio de fondo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute w-[300px] h-[300px] bg-white rounded-full blur-[100px] opacity-50"
                />

                {/* Logo Central con entrada cinemática */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative z-10 w-40 h-40"
                >
                    <Image
                        src="/logo.webp"
                        alt="Dr. Jorge Iglesias"
                        fill
                        className="object-contain p-4"
                        priority
                    />
                </motion.div>

                {/* Indicador de carga estructural (Anillo) */}
                <div className="absolute inset-0 -m-4">
                    <svg className="w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '1.5s' }}>
                        <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="black"
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            strokeDasharray="1, 15"
                            className="origin-center opacity-20"
                        />
                    </svg>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="absolute mt-52"
                >
                    <span className="text-[9px] tracking-[0.8em] uppercase font-bold text-black italic">Iniciando Experiencia</span>
                </motion.div>
            </div>
        </div>
    );
}
