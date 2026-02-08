"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { useRouter } from 'next/navigation';

interface HeroInteractiveContentProps {
    logo: React.ReactNode;
    text: React.ReactNode;
    cta: React.ReactNode;
}

export const HeroInteractiveContent = ({ logo, text, cta }: HeroInteractiveContentProps) => {
    const { setIsLogoHovered } = useDesktopScroll();
    const router = useRouter();
    const [clickCount, setClickCount] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleLogoClick = () => {
        setClickCount(prev => {
            const next = prev + 1;
            if (next >= 7) {
                return 7;
            }
            return next;
        });

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setClickCount(0), 3000);
    };

    // Navegación segura fuera del ciclo de renderizado
    useEffect(() => {
        if (clickCount >= 7) {
            router.push('/admin');
            setClickCount(0);
        }
    }, [clickCount, router]);

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
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 lg:p-16 pointer-events-none"
        >
            <div className="flex flex-col items-center justify-center pointer-events-auto w-full max-w-[900px] space-y-8 lg:space-y-12 translate-y-[2vh]">

                {/* LOGO WRAPPER - Estático (Sin animación de entrada) */}
                <div
                    onMouseEnter={() => setIsLogoHovered?.(true)}
                    onMouseLeave={() => setIsLogoHovered?.(false)}
                    onClick={handleLogoClick}
                    className="relative w-full max-w-[300px] lg:max-w-[750px] h-32 lg:h-[240px] flex items-center justify-center p-2 lg:p-4 transition-transform duration-700 hover:scale-[1.02] cursor-pointer"
                >
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border border-white/20 rounded-[40px] lg:rounded-[60px] shadow-2xl transform-gpu will-change-[backdrop-filter,transform] backface-hidden"></div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {logo}
                    </div>
                </div>

                {/* TEXTO Y CTA */}
                <div className="flex flex-col items-center space-y-12 lg:space-y-20">
                    <motion.div variants={itemVariants}>
                        {text}
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        {cta}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
