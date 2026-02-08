"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useFABStore } from '@/hooks/useFABStore';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { useMobileScroll } from '@/components/layout/MobileLayout';
import { useIsMobile } from '@/hooks/useIsMobile';

interface FloatingActionProps {
    className?: string;
    fabContent: any;
    contactInfo: any;
}

const FloatingAction: React.FC<FloatingActionProps> = ({ className = "", fabContent, contactInfo }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { hasInteracted, setHasInteracted } = useFABStore();
    const [isMounted, setIsMounted] = useState(false);
    const isMobile = useIsMobile();

    // Obtener el índice activo del contexto correspondiente
    const desktopContext = useDesktopScroll();
    const mobileContext = useMobileScroll();

    // Si isMobile es true, usamos mobileContext. Si es false (Desktop), desktopContext.
    const activeIndex = isMobile ? mobileContext.activeIndex : desktopContext.activeIndex;

    // Normalizar el índice según la versión (Móvil tiene orden diferente en el DOM)
    const getSectionKey = (idx: number) => {
        if (isMobile) {
            // Orden en MobileLayout: [Contact, About, Hero, Services, Results]
            const mobileMap: Record<number, number> = {
                0: 2, // Index 0 es Contacto
                1: 0, // Index 1 es Nosotros (About)
                2: 3, // Index 2 es Hero (Inicio)
                3: 4, // Index 3 es Servicios
                4: 5  // Index 4 es Resultados
            };
            return mobileMap[idx] ?? 3;
        }
        return idx;
    };

    const activeKey = getSectionKey(activeIndex);

    // Referencia para el activeKey para el intervalo
    const activeKeyRef = useRef(activeKey);
    useEffect(() => {
        activeKeyRef.current = activeKey;
    }, [activeKey]);

    // --- BASE DE DATOS DE MENSAJES (ESTADÍSTICAS CENTRALIZADAS) ---
    const sectionMessages: Record<number, string[]> = fabContent.sectionMessages;
    const generalPhrases = fabContent.generalPhrases;

    // Detect if positioned on left to adjust message side
    const isLeftAligned = className.includes("left-");

    // Función para intentar reproducir sonido (Instancia nueva cada vez para asegurar reproducción)
    const playNotification = () => {
        const audio = new Audio('/notificacion.mp3');
        audio.volume = 0.4;
        audio.play().catch(() => {
            // Si el navegador bloquea, al menos no rompe el flujo
        });
    };

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 0);
        audioRef.current = new Audio('/notificacion.mp3');
        audioRef.current.volume = 0.4;
    }, []);

    // EFECTO: Bienvenida automática a los 2 segundos
    useEffect(() => {
        if (!isMounted || hasInteracted) return;

        const welcomeTimer = setTimeout(() => {
            const currentSectionMsgs = sectionMessages[activeKeyRef.current] || sectionMessages[3];
            setCurrentMessage(currentSectionMsgs[0]);
            setShowMessage(true);
            playNotification();
            setHasInteracted(true); // Para que solo salga una vez por sesión

            setTimeout(() => setShowMessage(false), 5000);
        }, 2000);

        return () => clearTimeout(welcomeTimer);
    }, [isMounted, hasInteracted, setHasInteracted, sectionMessages]);

    // EFECTO: Ciclo de 20 segundos (Pool de 15 mensajes: 5 sección + 10 generales)
    useEffect(() => {
        if (!isMounted) return;

        const interval = setInterval(() => {
            if (showMessage) return; // No interrumpir si ya hay un mensaje visible

            const currentSectionMsgs = sectionMessages[activeKeyRef.current] || sectionMessages[3];
            const pool = [...currentSectionMsgs, ...generalPhrases];
            const randomMsg = pool[Math.floor(Math.random() * pool.length)];

            setCurrentMessage(randomMsg);
            setShowMessage(true);
            playNotification();

            setTimeout(() => setShowMessage(false), 6000);
        }, 20000); // 20 Segundos exactos

        return () => clearInterval(interval);
    }, [isMounted, showMessage, sectionMessages, generalPhrases]);

    // No mostrar nada hasta que estemos montados para evitar hidratación incorrecta con el localStorage
    if (!isMounted) return null;

    return (
        /* FAB: Botón Flotante Jorge Iglesias */
        <div
            className={`fixed bottom-10 z-[200] flex items-center justify-center group pointer-events-none ${className || 'right-10'}`}
        >
            {/* Mensaje de Notificación: Diseño de Etiqueta de Lujo con Framer Motion */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: isLeftAligned ? -20 : 20,
                            scale: 0.8
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            x: isLeftAligned ? -10 : 10,
                            scale: 0.95,
                            transition: { duration: 0.4, ease: "easeIn" }
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        className={`absolute ${isLeftAligned ? 'left-[calc(100%+30px)]' : 'right-[calc(100%+30px)]'}`}
                    >
                        <div className="relative bg-[#FDFCFB] border border-[#F0EBE3] px-10 py-5 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                            <p className="text-[10px] lg:text-[11px] tracking-[0.3em] font-medium text-black uppercase flex items-center space-x-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="whitespace-nowrap">{currentMessage || fabContent.defaultMessage}</span>
                            </p>
                            {/* Conector Sutil */}
                            <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-[1px] bg-black/5 ${isLeftAligned ? '-left-2' : '-right-2'}`}></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB: Botón de Cristal con Flote Orgánico */}
            <motion.a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                    y: [0, -12, 0, -8, 0],
                    x: [0, 4, -4, 2, 0],
                    rotate: [0, 2, -2, 1, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`
                    relative w-20 h-20 lg:w-24 lg:h-24 rounded-full pointer-events-auto
                    bg-white/10 backdrop-blur-xl border border-white/20
                    shadow-[0_20px_40px_rgba(0,0,0,0.15)]
                    flex items-center justify-center overflow-hidden
                    transition-colors duration-300 ease-out
                    hover:bg-white/20 hover:border-white/40
                    group/fab transform-gpu will-change-transform
                `}
            >
                {/* Reflejo de luz interno sutil */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover/fab:opacity-100 transition-opacity duration-500"></div>

                {/* Logo Central */}
                <div className="relative z-10 w-1/2 h-1/2 transition-transform duration-500 ease-out group-hover/fab:scale-110 group-hover/fab:rotate-6">
                    <Image
                        src="/logo.webp"
                        alt="Dr. Jorge Iglesias Márquez"
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                        priority
                    />
                </div>

                {/* Onda de choque de cristal al hover */}
                <div className="absolute inset-0 rounded-full border border-white/40 opacity-0 group-hover/fab:opacity-100 transition-opacity duration-300 pointer-events-none scale-110"></div>
            </motion.a>

            {/* Sombra de levitación suave */}
            <div className="absolute inset-0 -z-10 bg-black/5 rounded-full blur-2xl group-hover:bg-black/10 transition-colors duration-1000 scale-90"></div>
        </div>
    );
};

export default FloatingAction;
