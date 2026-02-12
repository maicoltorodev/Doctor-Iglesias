"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomCursor from "@/components/ui/desktop/CustomCursor";
import { useCustomCursor } from "@/hooks/useCustomCursor";

const MaintenanceDesktop = () => {
    const cursorState = useCustomCursor();

    return (
        <main className="relative w-full h-screen overflow-hidden bg-[#f2f0f4] flex items-center justify-center">
            {/* Custom Cursor */}
            <CustomCursor cursorState={cursorState} />
            {/* Background with Marble Texture (Project Style) */}
            <div
                className="absolute inset-0 bg-marble-texture opacity-40"
                style={{ mixBlendMode: 'multiply' }}
            />

            {/* Subtle Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5" />

            {/* Noise Texture (Project Style) */}
            <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{ backgroundImage: "url('/noise.png')", mixBlendMode: 'overlay' }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image
                        src="/logo-full.webp"
                        alt="Dr. Jorge Iglesias"
                        width={320}
                        height={120}
                        className="mb-16 drop-shadow-[0_15px_35px_rgba(0,0,0,0.1)]"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl"
                >
                    <h1 className="text-[#171717] font-serif text-5xl md:text-7xl mb-8 tracking-tight leading-tight">
                        Estamos <span className="italic">remodelando</span> <br />
                        nuestra experiencia digital
                    </h1>

                    <div className="w-24 h-[1px] bg-black/10 mx-auto mb-10" />

                    <p className="text-black/50 font-sans text-sm md:text-base tracking-[0.4em] uppercase mb-16 font-medium">
                        Próximamente • Dr. Jorge Iglesias Márquez
                    </p>
                </motion.div>

                {/* Vertical Line Animation (Project Style) */}
                <motion.div
                    className="w-[1px] h-32 bg-gradient-to-b from-black/20 to-transparent"
                    initial={{ height: 0 }}
                    animate={{ height: 128 }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />
            </div>

            {/* Corner Decorative Elements with Marble Sheen */}
            <div className="absolute top-0 left-0 w-[40vw] h-[40vh] bg-white/40 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-black/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
        </main>
    );
};

export default MaintenanceDesktop;
