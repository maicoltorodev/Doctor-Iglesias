"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CtaButton } from '@/components/ui/CtaButton';

interface MobileNavbarProps {
    activeIndex: number;
    scrollToSection: (id: string) => void;
    navLinks: any[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ activeIndex, scrollToSection, navLinks }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMobileLinkClick = (id: string) => {
        setIsMenuOpen(false);
        scrollToSection(id);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-[70px] z-[100]">
                {/* FONDO DE TEXTURA DE MÁRMOL */}
                <div className="absolute inset-0 bg-marble-texture opacity-100 shadow-md">
                    <div className="absolute inset-0 marble-architectural-sheen opacity-50"></div>
                </div>

                {/* CONTENIDO DEL NAVBAR */}
                <div className="relative z-10 w-full h-full px-6 flex items-center justify-between">
                    {/* Logo Izquierda */}
                    <motion.button
                        onClick={() => scrollToSection('hero')}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="active:scale-110 transition-transform hover:scale-110 duration-300"
                    >
                        <Image
                            src="/logo.webp"
                            alt="Dr. Jorge Iglesias Márquez"
                            width={120}
                            height={30}
                            className="h-7 w-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.15)] filter brightness-0"
                            priority
                        />
                    </motion.button>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <CtaButton
                            className="w-[120px] h-[36px]"
                            label="Agendar"
                        />
                    </div>

                    {/* Hamburguesa Derecha */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
                        aria-label="Abrir menú"
                    >
                        <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                        <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* --- MOBILE FULLSCREEN MENU --- */}
            <div
                className={`fixed inset-0 z-[90] bg-white transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="absolute inset-0 bg-marble-texture opacity-50"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8">
                    {navLinks.filter(link => !link.isLogo).map((link, idx) => (
                        <button
                            key={link.id}
                            onClick={() => handleMobileLinkClick(link.id)}
                            className={`text-2xl tracking-[0.3em] uppercase font-light text-black transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                } ${activeIndex === link.index ? 'font-medium scale-110' : ''}`}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                            {link.label}
                        </button>
                    ))}

                    <div className={`mt-8 transition-all duration-500 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        <CtaButton
                            label="Agendar Cita"
                            className="px-8 py-5"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileNavbar;
