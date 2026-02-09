"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DesktopLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f2f0f4] overflow-hidden relative">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.4] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="relative flex flex-col items-center justify-center">

                {/* Logo Central con entrada cinemática */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-20 flex items-center justify-center"
                >
                    <Image
                        src="/logo.webp"
                        alt="Dr. Jorge Iglesias"
                        width={140}
                        height={140}
                        className="object-contain drop-shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                        priority
                    />
                </motion.div>

                {/* Sistema de Anillos Minimalista */}
                <div className="absolute inset-0 flex items-center justify-center">

                    {/* Anillo Exterior - Giratorio con gap */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[240px] h-[240px]"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="280, 22"
                                opacity="0.2"
                            />
                        </svg>
                    </motion.div>

                    {/* Anillo Interior - Giratorio inverso con gap */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[180px] h-[180px]"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="260, 42"
                                opacity="0.3"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Texto de carga con fade in elegante */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.4] }}
                    transition={{
                        delay: 0.5,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className="absolute mt-48"
                >
                    <span className="text-[9px] tracking-[0.8em] uppercase font-bold text-black/50 italic">
                        Iniciando Experiencia
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
