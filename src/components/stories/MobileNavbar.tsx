"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CtaButton } from '@/components/ui/CtaButton';

interface MobileNavbarProps {
  sectionName: string;
  onMenuClick?: () => void;
  onBookingClick?: () => void;
}

/**
 * MOBILE NAVBAR - Navegación premium persistente en Stories
 * 
 * DISEÑO UI/UX PROFESIONAL:
 * - Minimalismo arquitectónico con elementos mármol
 * - Jerarquía visual clara con 3 zonas funcionales
 * - Micro-interacciones sutiles y premium
 * - Autoridad médica constante pero elegante
 * - Integración perfecta con video hero
 * - CTA Button premium igual que desktop
 */
export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  sectionName,
  onMenuClick,
  onBookingClick
}) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Fondo arquitectónico premium */}
      <div className="relative">
        {/* Capa base - integración con video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-xl"></div>
        
        {/* Textura mármol sutil */}
        <div className="absolute inset-0 bg-marble-texture opacity-5"></div>
        
        {/* Sheen arquitectónico */}
        <div className="marble-architectural-sheen"></div>
        
        {/* Borde inferior elegante */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* ZONA IZQUIERDA - Logo */}
          <div className="w-20 h-8 flex items-center justify-center">
            <img 
              src="/logo.webp" 
              alt="Dr. Jorge Iglesias Márquez"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ZONA CENTRAL - CTA Button (contenedor flex-1 para centrado real) */}
          <div className="flex-1 flex items-center justify-center">
            <CtaButton 
              onClick={onBookingClick}
              className="px-6 py-2.5 text-[10px] tracking-[0.25em] !flex !w-auto"
            />
          </div>

          {/* ZONA DERECHA - Menú */}
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <div className="w-5 h-0.5 bg-white/80 rounded-full" />
              <div className="w-5 h-0.5 bg-white/60 rounded-full" />
              <div className="w-5 h-0.5 bg-white/40 rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavbar;
