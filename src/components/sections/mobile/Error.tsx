'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackLink } from '@/components/ui/BackLink';
import { ERROR_PAGES_CONTENT } from '@/constants/content';
import FloatingAction from "@/components/ui/FloatingAction";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function MobileError({ error, reset }: ErrorProps) {
    const { serverError: content } = ERROR_PAGES_CONTENT;

    useEffect(() => {
        console.error(error);
    }, [error]);

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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="pt-6 w-full"
                >
                    <button
                        onClick={() => reset()}
                        className="w-full py-5 bg-black text-white text-[10px] tracking-[0.3em] uppercase font-bold rounded-xl shadow-xl active:scale-95 transition-all duration-300"
                    >
                        {content.cta}
                    </button>
                </motion.div>
            </div>

            <FloatingAction className="right-6 bottom-6 scale-90" />
        </main>
    );
}
