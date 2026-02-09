"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MobileLoading() {
    return (
        <div className="flex items-center justify-center min-h-[100dvh] bg-[#f2f0f4] overflow-hidden relative">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.3] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="relative flex flex-col items-center justify-center">

                {/* Aura de prestigio de fondo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute w-[200px] h-[200px] bg-gradient-radial from-white/50 via-white/20 to-transparent rounded-full blur-2xl"
                />

                {/* Logo Central con entrada cinemática */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-20 w-28 h-28 flex items-center justify-center"
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

                {/* Sistema de Anillos Animados Mobile (Optimizado) */}
                <div className="absolute inset-0 flex items-center justify-center">

                    {/* Anillo 1 - Exterior con pulso */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: [0, 0.2, 0.2, 0],
                            scale: [0.8, 1, 1, 1.1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.8, 1]
                        }}
                        className="absolute w-[180px] h-[180px] border border-black/15 rounded-full"
                    />

                    {/* Anillo 2 - Giratorio principal */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[160px] h-[160px]"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="black"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeDasharray="8, 25"
                                opacity="0.25"
                            />
                        </svg>
                    </motion.div>

                    {/* Anillo 3 - Contra-rotatorio */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[140px] h-[140px]"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="black"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                                strokeDasharray="1, 12"
                                opacity="0.15"
                            />
                        </svg>
                    </motion.div>

                    {/* Anillo 4 - Pulso central */}
                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute w-[120px] h-[120px] border border-black/10 rounded-full"
                    />

                    {/* Partículas orbitales (menos para mobile) */}
                    {[0, 120, 240].map((angle, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.3, 0],
                                scale: [0.5, 1, 0.5],
                                rotate: 360
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "easeInOut"
                            }}
                            className="absolute w-[150px] h-[150px]"
                            style={{
                                transform: `rotate(${angle}deg)`
                            }}
                        >
                            <div
                                className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-black/25 rounded-full"
                                style={{
                                    transform: 'translateX(-50%)'
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Texto de carga */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0.3] }}
                    transition={{
                        delay: 0.8,
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    className="absolute mt-40"
                >
                    <span className="text-[8px] tracking-[0.6em] uppercase font-bold text-black/40 italic">
                        Cargando
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
