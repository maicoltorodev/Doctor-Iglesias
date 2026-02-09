"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DesktopLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f2f0f4] overflow-hidden relative">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.4] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            <div className="relative flex flex-col items-center justify-center">

                {/* Aura de prestigio de fondo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute w-[400px] h-[400px] bg-gradient-radial from-white/60 via-white/30 to-transparent rounded-full blur-3xl"
                />

                {/* Logo Central con entrada cinemática */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-20 w-44 h-44 flex items-center justify-center"
                >
                    <Image
                        src="/logo.webp"
                        alt="Dr. Jorge Iglesias"
                        width={150}
                        height={150}
                        className="object-contain drop-shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
                        priority
                    />
                </motion.div>

                {/* Sistema de Anillos Animados Premium */}
                <div className="absolute inset-0 flex items-center justify-center">

                    {/* Anillo 1 - Exterior con pulso */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: [0, 0.15, 0.15, 0],
                            scale: [0.8, 1, 1, 1.1],
                            rotate: 360
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.8, 1]
                        }}
                        className="absolute w-[320px] h-[320px] border border-black/20 rounded-full"
                        style={{
                            boxShadow: '0 0 20px rgba(0,0,0,0.05)'
                        }}
                    />

                    {/* Anillo 2 - Giratorio con gradiente */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[280px] h-[280px]"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="url(#gradient1)"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                                strokeDasharray="10, 30"
                                opacity="0.3"
                            />
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="black" stopOpacity="0.3" />
                                    <stop offset="50%" stopColor="black" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="black" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>

                    {/* Anillo 3 - Puntillista rotatorio */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[240px] h-[240px]"
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
                                strokeDasharray="1, 15"
                                opacity="0.2"
                            />
                        </svg>
                    </motion.div>

                    {/* Anillo 4 - Pulso central */}
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.15, 0.25, 0.15]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute w-[200px] h-[200px] border-[1.5px] border-black/10 rounded-full"
                    />

                    {/* Anillo 5 - Detalles dinámicos */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[180px] h-[180px]"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="black"
                                strokeWidth="0.4"
                                strokeLinecap="round"
                                strokeDasharray="3, 20"
                                opacity="0.15"
                            />
                        </svg>
                    </motion.div>

                    {/* Anillo 6 - Partículas orbitales */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                scale: [0.5, 1, 0.5],
                                rotate: 360
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                            className="absolute w-[260px] h-[260px]"
                            style={{
                                transform: `rotate(${angle}deg)`
                            }}
                        >
                            <div
                                className="absolute top-0 left-1/2 w-1 h-1 bg-black/30 rounded-full"
                                style={{
                                    transform: 'translateX(-50%)'
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Texto de carga con fade in elegante */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 0.4, 0.4], y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className="absolute mt-60"
                >
                    <span className="text-[9px] tracking-[0.8em] uppercase font-bold text-black/50 italic">
                        Iniciando Experiencia
                    </span>
                </motion.div>

                {/* Línea de progreso sutil */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-80px] w-32 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent origin-left"
                />
            </div>
        </div>
    );
}
