"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MobileLoading() {
    return (
        <div className="flex items-center justify-center min-h-[100dvh] bg-[#f2f0f4] overflow-hidden relative">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.3] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="relative flex flex-col items-center justify-center">

                {/* Logo Central con entrada cinemática */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-20 flex items-center justify-center"
                >
                    <Image
                        src="/logo.webp"
                        alt="Cargando..."
                        width={100}
                        height={100}
                        className="object-contain drop-shadow-[0_2px_15px_rgba(0,0,0,0.06)]"
                        priority
                    />
                </motion.div>

                {/* Sistema de Anillos Minimalista */}
                <div className="absolute inset-0 flex items-center justify-center">

                    {/* Anillo Exterior - Giratorio con gap */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[160px] h-[160px]"
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
                                strokeDasharray="260, 42"
                                opacity="0.2"
                            />
                        </svg>
                    </motion.div>

                    {/* Anillo Interior - Giratorio inverso con gap */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[120px] h-[120px]"
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
                                strokeDasharray="240, 62"
                                opacity="0.25"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Texto de carga */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0.3] }}
                    transition={{
                        delay: 0.4,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.8
                    }}
                    className="absolute mt-32"
                >
                    <span className="text-[8px] tracking-[0.6em] uppercase font-bold text-black/40 italic">
                        Cargando
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
