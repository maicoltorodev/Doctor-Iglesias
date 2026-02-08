"use client";

import { BackLink } from '@/components/ui/BackLink';
import { motion } from 'framer-motion';
import { ERROR_PAGES_CONTENT } from '@/constants/content';
import FloatingAction from "@/components/ui/FloatingAction";

export default function MobileNotFound() {
    const { notFound: content } = ERROR_PAGES_CONTENT;

    return (
        <main className="relative flex flex-col items-center justify-center min-h-[100dvh] bg-[#f2f0f4] overflow-hidden text-center px-8 selection:bg-black/10 selection:text-black">

            {/* Nav de Retorno (Top) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-8 left-0 right-0 z-50 flex justify-center scale-90"
            >
                <BackLink />
            </motion.div>

            {/* Fondo de Ruido Sutil */}
            <div className="absolute inset-0 z-0 opacity-[0.3] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            {/* Contenido Principal */}
            <div className="relative z-20 flex flex-col items-center space-y-10 w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <span className="text-[40vw] font-serif italic text-black/[0.05] leading-none block">
                        {content.code}
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4"
                >
                    <p className="text-[9px] tracking-[0.5em] uppercase font-bold text-black/40">{content.badge}</p>
                    <h1 className="text-4xl font-light text-black leading-tight">
                        {content.titleLight} <br />
                        <span className="font-serif italic text-black/50">{content.titleBold}</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-sm font-light text-black/60 leading-relaxed"
                >
                    {content.description}
                </motion.p>
            </div>

            {/* Decoración Minimalista */}
            <div className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent"></div>
            </div>

            <FloatingAction className="right-6 bottom-6 scale-90" />
        </main>
    );
}
