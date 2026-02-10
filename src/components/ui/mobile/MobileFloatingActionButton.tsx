"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useFABStore } from '@/hooks/useFABStore';

import { Phone, MessageCircle, X } from 'lucide-react';

interface MobileFloatingActionButtonProps {
    activeIndex: number;
    fabContent: any;
    contactInfo: any;
    className?: string;
}

/**
 * MOBILE FLOATING ACTION BUTTON - Versión ultra-optimizada con Contact Hub
 */
export const MobileFloatingActionButton: React.FC<MobileFloatingActionButtonProps> = ({
    activeIndex,
    fabContent,
    contactInfo,
    className = ""
}) => {
    const [showMessage, setShowMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const { hasInteracted, setHasInteracted } = useFABStore();
    const [isMounted, setIsMounted] = useState(false);

    const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Lógica de montaje segura
    useEffect(() => {
        setIsMounted(true);
        return () => {
            if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, []);

    // Función para obtener mensajes según la sección
    const getRandomMessage = useCallback((sectionIdx: number) => {
        const messages = fabContent.sectionMessages[sectionIdx] || fabContent.sectionMessages[3];
        const general = fabContent.generalPhrases || [];
        const pool = [...messages, ...general];
        return pool[Math.floor(Math.random() * pool.length)];
    }, [fabContent]);

    // Reproducción de audio
    const playNotification = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
                // Silenciar errores de audio (políticas de autoplay de navegadores)
            });
        }
    }, []);

    // Lógica de mensajes recurrentes (Cíclica)
    useEffect(() => {
        if (!isMounted || isModalOpen) return;

        // Función para mostrar un mensaje
        const triggerMessage = () => {
            const message = getRandomMessage(activeIndex);
            setCurrentMessage(message);
            setShowMessage(true);
            playNotification();

            // Ocultar tras 6 segundos
            hideTimerRef.current = setTimeout(() => {
                setShowMessage(false);
            }, 6000);
        };

        // Primer disparo con delay inicial (4s)
        const initialDelay = setTimeout(triggerMessage, 4000);

        // Ciclo recurrente cada 25 segundos
        messageIntervalRef.current = setInterval(triggerMessage, 25000);

        return () => {
            clearTimeout(initialDelay);
            if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        };
    }, [isMounted, activeIndex, getRandomMessage, playNotification, isModalOpen]);

    if (!isMounted) return null;

    return (
        <>
            <div className={`flex flex-row items-center pointer-events-none`}>

                {/* AUDIO NOTIFICACIÓN */}
                <audio ref={audioRef} src="/notificacion.mp3" preload="auto" />

                {/* BURBUJA DE TEXTO (HORIZONTAL & MINIMALISTA) */}
                <AnimatePresence>
                    {showMessage && !isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 10, scale: 0.95, filter: 'blur(4px)' }}
                            className="mr-3"
                        >
                            <div className="bg-[#fdfcfb]/95 backdrop-blur-md border border-[#f0ebe3] px-4 py-2 rounded-full shadow-lg">
                                <p className="text-[8px] uppercase tracking-[0.25em] font-bold text-black flex items-center space-x-2">
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="whitespace-nowrap">{currentMessage}</span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BOTÓN CIRCULAR (LOGO) */}
                <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative w-16 h-16 pointer-events-auto bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-full flex items-center justify-center p-2.5 overflow-hidden"
                >
                    {/* Glow interno sutil */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent" />

                    <div className="relative z-10 w-full h-full">
                        <Image
                            src="/logo.webp"
                            alt="Contacto"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </motion.button>

                {/* Sombra de apoyo */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-black/5 rounded-full blur-2xl -z-10 scale-90" />
            </div>

            {/* MODAL DE CONTACTO (CONTACT HUB) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                            className="relative w-full max-w-[320px] bg-[#fdfcfb] rounded-[32px] shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-marble-texture bg-cover p-8 text-center border-b border-black/5">
                                <h3 className="text-xl font-serif italic text-black tracking-widest uppercase mb-2">Contacto</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold">Dr. Jorge Iglesias</p>
                            </div>

                            {/* Options */}
                            <div className="flex flex-col">
                                {/* WhatsApp */}
                                <a
                                    href={contactInfo.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-6 bg-white active:bg-black/[0.02] transition-colors border-b border-black/5 group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <MessageCircle size={20} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black">WhatsApp</p>
                                            <p className="text-[8px] uppercase tracking-[0.1em] text-black/30">Respuesta inmediata</p>
                                        </div>
                                    </div>
                                    <span className="text-black/10 group-active:text-black/30">→</span>
                                </a>

                                {/* Llamar */}
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex items-center justify-between p-6 bg-white active:bg-black/[0.02] transition-colors group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Phone size={20} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black">Llamar Ahora</p>
                                            <p className="text-[8px] uppercase tracking-[0.1em] text-black/30">{contactInfo.phone}</p>
                                        </div>
                                    </div>
                                    <span className="text-black/10 group-active:text-black/30">→</span>
                                </a>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-4 bg-black/[0.02] text-[8px] uppercase tracking-[0.4em] font-bold text-black/40 border-t border-black/5 active:text-black transition-colors"
                            >
                                Cerrar
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
