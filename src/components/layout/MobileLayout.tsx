"use client";

import React, { useRef, useState, useEffect, createContext, useContext } from "react";
import MobileNavbar from "@/components/layout/mobile/Navbar";
import MobileFloatingAction from "@/components/ui/FloatingAction/Mobile";

/**
 * CONTEXT DE SCROLL MOBILE
 * 
 * PROPÓSITO: Proveer estado global del scroll activo a todos los componentes mobile
 * USO: Navbar usa este contexto para mostrar la sección activa
 */
interface MobileScrollContextType {
    activeIndex: number; // Índice de la sección actualmente visible
}

const MobileScrollContext = createContext<MobileScrollContextType>({ activeIndex: 0 });

export const useMobileScroll = () => {
    const context = useContext(MobileScrollContext);
    if (!context) throw new Error("useMobileScroll must be used within a MobileScrollProvider");
    return context;
};

/**
 * LAYOUT PRINCIPAL MOBILE
 * 
 * FUNCIÓN CRÍTICA: Implementar scroll VERTICAL nativo (Regla #1)
 * DIFERENCIA CLAVE: Desktop usa scroll horizontal, Mobile usa vertical
 * 
 * FLUJO LÓGICO:
 * 1. Observer detecta qué sección está visible (50% threshold)
 * 2. Actualiza estado activeIndex para navbar
 * 3. scrollToSection permite navegación programática
 * 
 * TECNOLOGÍA: Intersection Observer API (performance óptimo)
 * BENEFICIO: No requiere polling, usa detección nativa del browser
 */
interface MobileLayoutProps {
    children: React.ReactNode;
    navLinks: any[];
    fabContent: any;
    contactInfo: any;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, navLinks, fabContent, contactInfo }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // === LÓGICA PRINCIPAL: DETECCIÓN DE SECCIÓN VISIBLE ===
    // Mobile usa scroll vertical nativo con Intersection Observer
    // Esto es MÁS EFICIENTE que polling de scroll position
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Seleccionamos todas las secciones que tienen ID (navegables)
        const sections = container.querySelectorAll('section[id]');
        
        // Intersection Observer: API nativa para detectar visibilidad de elementos
        // VENTAJA: No consume CPU constantemente como scroll listeners
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Solo procesamos cuando la sección entra en vista
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        
                        // Buscamos el índice correspondiente en navLinks
                        const sectionIndex = navLinks.findIndex(link => link.id === sectionId);
                        
                        // Actualizamos estado solo si encontramos coincidencia
                        if (sectionIndex !== -1) {
                            setActiveIndex(sectionIndex);
                        }
                    }
                });
            },
            {
                threshold: 0.5, // 50% de la sección visible para activar
                rootMargin: '-20% 0px -70% 0px' // Ajuste para mejor detección en mobile
            }
        );

        // Registramos todas las secciones para observación
        sections.forEach((section) => observer.observe(section));

        // Limpieza: removemos observers cuando el componente se desmonta
        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [navLinks]); // Dependencia: se re-ejecuta si navLinks cambia

    // === NAVEGACIÓN PROGRAMÁTICA ===
    // Permite scroll suave a una sección específica (usado por navbar)
    const scrollToSection = (id: string) => {
        const section = containerRef.current?.querySelector(`#${id}`);
        if (section) {
            // scrollIntoView con comportamiento suave y alineación superior
            // NOTA: 'block: start' asegura alineación con top de viewport
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' // Scroll vertical nativo (NO horizontal)
            });
        }
    };

    return (
        <MobileScrollContext.Provider value={{ activeIndex }}>
            {/* CONTENEDOR PRINCIPAL MOBILE */}
            <div className="relative min-h-screen bg-[#e6e3e8]">
                <MobileNavbar
                    activeIndex={activeIndex}
                    scrollToSection={scrollToSection}
                    navLinks={navLinks}
                />

                {/* 
                CONTENEDOR VERTICAL NATIVO
                CLAVE: Sin clases de scroll horizontal (snap-x, flex-row)
                BENEFICIO: Performance óptimo en dispositivos táctiles
                */}
                <div
                    ref={containerRef}
                    className="relative z-20 w-full"
                >
                    {children}
                </div>

                {/* FAB FLOTANTE - Siempre visible en mobile */}
                <MobileFloatingAction
                    className="right-6 bottom-6 scale-90"
                    fabContent={fabContent}
                    contactInfo={contactInfo}
                />

            </div>
        </MobileScrollContext.Provider>
    );
};

export default MobileLayout;
