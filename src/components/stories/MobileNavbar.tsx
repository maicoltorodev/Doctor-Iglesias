"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CtaButton } from '@/components/ui/mobile/CtaButton';
import {
  Users,
  Camera,
  Phone,
  Home,
  Stethoscope,
  Sparkles,
  Heart
} from 'lucide-react';

interface MobileNavbarProps {
  sectionName: string;
  currentSectionIndex?: number;
  onMenuClick?: () => void;
  onBookingClick?: () => void;
  onLogoClick?: () => void;
}

const SECTION_ICONS = [
  Users,       // 0: Nosotros
  Camera,      // 1: Galería
  Phone,       // 2: Contacto
  Home,        // 3: Inicio
  Stethoscope, // 4: Servicios
  Sparkles,    // 5: Resultados
  Heart        // 6: Testimonios
];

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  sectionName,
  currentSectionIndex = 3, // Default to Inicio
  onMenuClick,
  onBookingClick,
  onLogoClick
}) => {
  const Icon = SECTION_ICONS[currentSectionIndex];
  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      {/* FONDO DE TEXTURA DE MÁRMOL (IGUAL A DESKTOP) */}
      <div className="absolute inset-0 bg-marble-texture opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.2)] border-b border-black/5">
        <div className="absolute inset-0 marble-architectural-sheen opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between px-[6vw] h-[clamp(70px,10vh,90px)]">
        {/* LOGO IZQUIERDA */}
        <button
          onClick={onLogoClick}
          className="w-[clamp(50px,15vw,64px)] h-[clamp(50px,15vw,64px)] flex items-center justify-center active:scale-95 transition-transform cursor-pointer bg-black/[0.03] rounded-full border border-black/5"
        >
          <Icon size={32} strokeWidth={2} className="text-black" />
        </button>

        {/* BOTÓN CENTRAL (Agendar) */}
        <div className="flex-1 flex justify-center px-[2vw]">
          <CtaButton
            onClick={onBookingClick}
            isAutoShimmer={true}
            className="px-[4vw] py-[1.2vh] text-[clamp(8px,2.2vw,10px)] tracking-[0.2em] whitespace-nowrap"
          />
        </div>

        {/* MENÚ HAMBURGUESA DERECHA */}
        <button
          onClick={onMenuClick}
          className="w-[clamp(50px,15vw,64px)] h-[clamp(50px,15vw,64px)] flex items-center justify-center active:scale-95 transition-transform"
        >
          <div className="flex flex-col space-y-[0.8vh] items-end">
            <span className="w-[7vw] max-w-[32px] min-w-[24px] h-[2px] bg-black rounded-full"></span>
            <span className="w-[4.5vw] max-w-[20px] min-w-[16px] h-[2px] bg-black rounded-full"></span>
            <span className="w-[6vw] max-w-[28px] min-w-[20px] h-[2px] bg-black rounded-full"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;
