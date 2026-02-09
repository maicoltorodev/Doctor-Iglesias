"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MobileNavbarProps {
  sectionName: string;
  onMenuClick?: () => void;
  onBookingClick?: () => void;
}

/**
 * MOBILE NAVBAR - Navegación persistente en Stories
 * 
 * CARACTERÍSTICAS:
 * - Posicionamiento fijo sobre todas las stories
 * - Diseño minimalista premium
 * - Interacciones táctiles optimizadas
 * - Autoridad médica constante
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
    >
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* LOGO IZQUIERDA - Autoridad médica */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative w-20 h-8 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg"></div>
          <div className="relative z-10">
            <img 
              src="/logo.webp" 
              alt="Dr. Jorge Iglesias Márquez"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>
        </motion.div>

        {/* BOTÓN CENTRAL - Agendar CTA */}
        <motion.button
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBookingClick}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur-md group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white text-xs font-medium tracking-wide">
                Agendar
              </span>
            </div>
          </div>
        </motion.button>

        {/* BOTÓN DERECHO - Menú */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="relative w-10 h-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center justify-center space-y-1">
            <div className="w-5 h-0.5 bg-white/80"></div>
            <div className="w-5 h-0.5 bg-white/80"></div>
            <div className="w-5 h-0.5 bg-white/80"></div>
          </div>
        </motion.button>

      </div>

      {/* INDICADOR DE SECCIÓN ACTUAL */}
      <motion.div
        key={sectionName}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 pb-2"
      >
        <div className="text-center">
          <p className="text-xs text-white/60 tracking-widest uppercase">
            {sectionName}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileNavbar;
