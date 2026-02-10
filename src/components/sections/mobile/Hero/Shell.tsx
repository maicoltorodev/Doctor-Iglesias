import React from 'react';
import { motion, Variants } from 'framer-motion';

interface HeroShellProps {
    background: React.ReactNode;
    logo: React.ReactNode;
    text: React.ReactNode;
    cta: React.ReactNode;
}

const HeroShell: React.FC<HeroShellProps> = ({ background, logo, text, cta }) => {
    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1] as [number, number, number, number]
            }
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.15
            }
        }
    };

    return (
        <section id="hero" className="w-full min-h-screen relative overflow-hidden bg-[#e6e3e8] section-contain">
            {background}

            {/* CONTENIDO UNIFICADO Y SIMPLIFICADO */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 pointer-events-none text-white"
            >
                <div className="flex flex-col items-center justify-center pointer-events-auto w-full space-y-8 translate-y-[4vh]">

                    {/* LOGO WRAPPER */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full max-w-[280px] h-24 flex items-center justify-center p-4"
                    >
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-2xl"></div>
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {logo}
                        </div>
                    </motion.div>

                    {/* TEXTO Y CTA */}
                    <div className="flex flex-col items-center space-y-16">
                        <motion.div variants={itemVariants}>
                            {text}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            {cta}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroShell;
