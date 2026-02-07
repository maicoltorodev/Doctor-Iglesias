import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CONTACT_INFO } from '@/constants/content';
import { useFABStore } from '@/hooks/useFABStore';

interface FloatingActionProps {
    className?: string;
}

const FloatingAction: React.FC<FloatingActionProps> = ({ className = "" }) => {
    const [showMessage, setShowMessage] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { hasInteracted, setHasInteracted } = useFABStore();
    const [isMounted, setIsMounted] = useState(false);

    // Detect if positioned on left to adjust message side
    const isLeftAligned = className.includes("left-");

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 0);
        // Inicializar el audio
        audioRef.current = new Audio('/notificacion.mp3');
        audioRef.current.volume = 1.0;

        const handleFirstInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);

                // Pequeño delay para que el efecto no sea tan brusco tras el click
                setTimeout(() => {
                    setShowMessage(true);
                    if (audioRef.current) {
                        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
                    }

                    // Ocultar el mensaje después de 8 segundos (un poco más largo para que dé tiempo a leer tras navegar)
                    setTimeout(() => setShowMessage(false), 8000);
                }, 800);

                // Limpiar el listener después del primer uso
                window.removeEventListener('click', handleFirstInteraction);
            }
        };

        if (isMounted && !hasInteracted) {
            window.addEventListener('click', handleFirstInteraction);
        }

        return () => window.removeEventListener('click', handleFirstInteraction);
    }, [hasInteracted, setHasInteracted, isMounted]);

    // No mostrar nada hasta que estemos montados para evitar hidratación incorrecta con el localStorage
    if (!isMounted) return null;

    return (
        /* FAB: Botón Flotante Jorge Iglesias */
        <div
            className={`fixed bottom-10 z-[200] flex items-center justify-center group pointer-events-none ${className || 'right-10'}`}
        >
            {/* Mensaje de Notificación: Diseño de Etiqueta de Lujo */}
            <div
                className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
                ${isLeftAligned
                        ? `left-[calc(100%+30px)] ${showMessage ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0 blur-sm'}`
                        : `right-[calc(100%+30px)] ${showMessage ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 blur-sm'}`
                    }`}
            >
                <div className="relative bg-white/40 backdrop-blur-2xl border border-white/40 px-10 py-5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <p className="text-[10px] lg:text-[11px] tracking-[0.4em] font-medium text-black uppercase flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse"></span>
                        <span>Agendar <span className="font-serif italic text-black/40 lowercase tracking-normal text-sm">con el</span> Doctor</span>
                    </p>
                    {/* Conector Sutil */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-[1px] bg-black/10 ${isLeftAligned ? '-left-2' : '-right-2'}`}></div>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                <div
                    className="absolute inset-0 rounded-full bg-black/20 animate-fab-double-pulse will-change-transform transform-gpu"
                />
            </div>

            {/* FAB: Botón de Cristal (Glassmorphism) - OPTIMIZED */}
            <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
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

                {/* Onda de choque de cristal al hover - Removed animate-ping which is heavy */}
                <div className="absolute inset-0 rounded-full border border-white/40 opacity-0 group-hover/fab:opacity-100 transition-opacity duration-300 pointer-events-none scale-110"></div>
            </a>

            {/* Sombra de levitación suave */}
            <div className="absolute inset-0 -z-10 bg-black/5 rounded-full blur-2xl group-hover:bg-black/10 transition-colors duration-1000 scale-90"></div>
        </div>
    );
};

export default FloatingAction;
