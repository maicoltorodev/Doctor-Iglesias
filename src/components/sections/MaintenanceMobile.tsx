"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MaintenanceMobile = () => {
    return (
        <main className="relative w-full h-[100dvh] bg-[#f2f0f4] flex flex-col items-center justify-between py-12 lg:py-24 px-8 overflow-hidden">
            {/* Background Texture (Marble) */}
            <div
                className="absolute inset-0 bg-marble-texture opacity-30 pointer-events-none"
                style={{ mixBlendMode: 'multiply' }}
            />

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.1] pointer-events-none"
                style={{ backgroundImage: "url('/noise.png')", mixBlendMode: 'overlay' }}
            />

            {/* Top Logo - centered and scaled for mobile */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full flex justify-center mt-4"
            >
                <div className="relative w-[180px] h-[60px] xs:w-[220px] xs:h-[80px]">
                    <Image
                        src="/logo-full.webp"
                        alt="Dr. Jorge Iglesias"
                        fill
                        className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.05)]"
                        priority
                    />
                </div>
            </motion.div>

            {/* Central Messaging - using flex-grow to center better */}
            <div className="relative z-10 flex flex-col items-center text-center my-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h1 className="text-[#171717] font-serif text-3xl xs:text-4xl sm:text-5xl mb-4 leading-tight">
                        Estamos <br />
                        <span className="italic">remodelando</span>
                    </h1>

                    <p className="text-black/50 font-sans text-[9px] xs:text-[10px] tracking-[0.3em] uppercase font-bold px-4">
                        Nuestra experiencia digital
                    </p>
                </motion.div>

                <motion.div
                    className="w-10 h-[1px] bg-black/10 my-8 xs:my-10"
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-black/30 text-[8px] xs:text-[9px] tracking-[0.4em] uppercase font-bold"
                >
                    PRÓXIMAMENTE
                </motion.p>
            </div>

            {/* Bottom Signature - pinned to avoid floating on keyboard or small screens */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="relative z-10 mb-4"
            >
                <p className="text-black/60 text-[8px] xs:text-[9px] tracking-[0.35em] uppercase font-bold text-center">
                    Dr. Jorge Iglesias Márquez<br />
                    <span className="opacity-50 text-[7px] tracking-[0.2em]">Bogotá, Colombia</span>
                </p>
            </motion.div>

            {/* Dynamic Light Background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-white/60 blur-[100px] rounded-full pointer-events-none -z-0" />
        </main>
    );
};

export default MaintenanceMobile;
