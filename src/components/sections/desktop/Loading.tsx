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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 w-44 h-44 flex items-center justify-center"
                >
                    <Image
                        src="/logo.webp"
                        alt="Dr. Jorge Iglesias"
                        width={120}
                        height={120}
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* Indicador de carga estructural (Anillos Concéntricos) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Anillo Exterior */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[280px] h-[280px] border-[0.5px] border-black/5 rounded-full"
                    />

                    {/* Anillo de Carga Principal */}
                    <div className="absolute w-[240px] h-[240px]">
                        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="black"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                                strokeDasharray="1, 20"
                                className="opacity-20"
                            />
                        </svg>
                    </div>

                    {/* Anillo de Carga Secundario (Sentido opuesto) */}
                    <div className="absolute w-[200px] h-[200px]">
                        <svg className="w-full h-full animate-spin-reverse-slow" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="black"
                                strokeWidth="0.3"
                                strokeLinecap="round"
                                strokeDasharray="2, 30"
                                className="opacity-10"
                            />
                        </svg>
                    </div>
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
