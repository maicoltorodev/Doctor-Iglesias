"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MobileLoading() {
    return (
        <div className="flex items-center justify-center min-h-[100dvh] w-full bg-[#f2f0f4] overflow-hidden relative">

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none z-0" />

            <div className="relative flex items-center justify-center">

                {/* Anillo Exterior (Rápido) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                >
                    <svg width="160" height="160" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="48"
                            fill="none" stroke="black" strokeWidth="1.5"
                            strokeDasharray="120 200"
                            className="opacity-40"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>

                {/* Anillo Medio (Inverso) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                >
                    <svg width="130" height="130" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="48"
                            fill="none" stroke="black" strokeWidth="1.8"
                            strokeDasharray="80 250"
                            className="opacity-20"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>

                {/* Anillo Interior (Suave) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="48"
                            fill="none" stroke="black" strokeWidth="1.2"
                            strokeDasharray="180 100"
                            className="opacity-10"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 flex items-center justify-center"
                >
                    <Image
                        src="/logo.webp"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                        priority
                    />
                </motion.div>

            </div>
        </div>
    );
}