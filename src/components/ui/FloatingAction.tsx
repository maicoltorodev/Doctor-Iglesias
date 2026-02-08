import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CONTACT_INFO, NAV_LINKS } from '@/constants/content';
import { useFABStore } from '@/hooks/useFABStore';
import { useDesktopScroll } from '@/components/layout/DesktopLayout';
import { useMobileScroll } from '@/components/layout/MobileLayout';
import { useIsMobile } from '@/hooks/useIsMobile';

interface FloatingActionProps {
    className?: string;
}

const FloatingAction: React.FC<FloatingActionProps> = ({ className = "" }) => {
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

    // Guardamos el activeKey en una ref para que el intervalo lo consulte sin reiniciarse
    const activeKeyRef = useRef(activeKey);
    useEffect(() => {
        activeKeyRef.current = activeKey;
    }, [activeKey]);

    // --- BASE DE DATOS DE MENSAJES (45 TOTAL) ---
    const sectionMessages: Record<number, string[]> = {
        0: [ // NOSOTROS
            "Todos tenemos una historia!",
            "Ética y excelencia médica",
            "Más de 10 años cuidando pieles",
            "Nuestra misión es tu bienestar",
            "Compromiso con la dermatología"
        ],
        1: [ // GALERIA
            "Explora nuestra clínica",
            "Tecnología de última generación",
            "Espacios diseñados para tu confort",
            "Nuestras instalaciones premium",
            "Vanguardia en cada rincón"
        ],
        2: [ // CONTACTO
            "¿Agendamos tu valoración?",
            "Hablemos por WhatsApp hoy",
            "Estamos listos para atenderte",
            "Tu cita a un solo click",
            "Resolvamos tus dudas ahora"
        ],
        3: [ // INICIO
            "¡Llego la hora de agendar!",
            "Tu piel, es una prioridad absoluta",
            "Dermatología estética de lujo",
            "Descubre tu mejor versión",
            "Cuidado experto y personalizado"
        ],
        4: [ // SERVICIOS
            "Tratamientos faciales avanzados",
            "Tecnología láser de punta",
            "Soluciones para cada tipo de piel",
            "Procedimientos mínimamente invasivos",
            "Renueva tu piel con nosotros"
        ],
        5: [ // RESULTADOS
            "Casos reales, cambios naturales",
            "Mira el poder del rejuvenecimiento",
            "Testimonios visuales de éxito",
            "Resultados que hablan por sí solos",
            "Transformaciones que inspiran"
        ],
        6: [ // TESTIMONIOS
            "La confianza de mis pacientes",
            "Lo que dicen quienes nos visitan",
            "Experiencias que avalan nuestro trabajo",
            "Seguridad y satisfacción garantizada",
            "Historias reales de cuidado facial"
        ]
    };

    const generalPhrases = [
        "¿Te gustaría agendar una cita?",
        "Tu piel merece atención experta",
        "Escríbeme para una valoración",
        "Dermatología de alta gama",
        "Agenda tu espacio exclusivo",
        "¿Dudas sobre algún tratamiento?",
        "Resultados naturales garantizados",
        "Cuidamos cada detalle de tu piel",
        "Expertos en rejuvenecimiento",
        "La salud de tu piel es lo primero"
    ];

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
    }, [isMounted, hasInteracted, setHasInteracted]);

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
    }, [isMounted, showMessage]);

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
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="whitespace-nowrap">{currentMessage || "Agendar con el Doctor"}</span>
                    </p>
                    {/* Conector Sutil */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-[1px] bg-black/10 ${isLeftAligned ? '-left-2' : '-right-2'}`}></div>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                <div
                    className="absolute inset-0 rounded-full bg-emerald-400/40 animate-fab-double-pulse will-change-transform transform-gpu"
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
