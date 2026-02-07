"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { BackLink } from '@/components/ui/BackLink';
import { motion } from 'framer-motion';

export default function NotFound() {
    const cursorState = useCustomCursor();

    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#f2f0f4] overflow-hidden text-center selection:bg-black/10 selection:text-black">

            {/* Nav de Retorno (Top) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-12 lg:top-20 left-0 right-0 z-50 flex justify-center"
            >
                <BackLink />
            </motion.div>

            {/* Fondo de Ruido Sutil */}
            <div className="absolute inset-0 z-0 opacity-[0.4] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>

            {/* Elemento Tipográfico Gigante (Fondo) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
            >
                <span className="text-[30vw] font-serif italic text-black/[0.03] leading-none translate-y-10">
                    404
                </span>
            </motion.div>

            {/* Contenido Principal */}
            <div className="relative z-20 flex flex-col items-center space-y-12 max-w-2xl px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <p className="text-[10px] tracking-[0.6em] uppercase font-bold text-black/40">Coordenadas Incorrectas</p>
                    <h1 className="text-5xl lg:text-7xl font-light text-black leading-tight">
                        Este espacio aún <br />
                        <span className="font-serif italic text-black/50">no ha sido esculpido.</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base lg:text-lg font-light text-black/60 max-w-md leading-relaxed"
                >
                    La página que buscas no forma parte de nuestra galería actual.
                    Te invitamos a redescubrir la armonía en nuestra colección principal.
                </motion.p>
            </div>

            {/* Decoración de Mármol (Marca) - ANIMADA */}
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[100px] md:h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)] z-10">
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 clip-triangle-left bg-marble-texture border-t border-r border-white/20"
                >
                    {/* Brillo Especular */}
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/60 to-transparent transform -rotate-[19.8deg] origin-top-right translate-y-[0.5px]"></div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[100px] md:h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)] z-10">
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20"
                >
                    {/* Brillo Especular */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                </motion.div>
            </div>

            <CustomCursor cursorState={cursorState} />
        </main>
    );
}
