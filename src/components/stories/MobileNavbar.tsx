"use client";

import React from 'react';
import { motion } from 'framer-motion';

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
          
          {/* ZONA IZQUIERDA - Logo minimalista */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            {/* Subtle glow en hover */}
            <div className="absolute inset-0 bg-white/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Logo container */}
            <div className="relative w-20 h-8 flex items-center justify-center">
              <img 
                src="/logo.webp" 
                alt="Dr. Jorge Iglesias Márquez"
                className="w-full h-full object-contain filter brightness-110 contrast-105"
              />
            </div>
          </motion.div>

          {/* ZONA CENTRAL - CTA premium */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBookingClick}
            className="relative group"
          >
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main button */}
            <div className="relative bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5">
              <div className="flex items-center space-x-2">
                {/* Icono calendario */}
                <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                
                {/* Texto */}
                <span className="text-white text-xs font-light tracking-wider uppercase">
                  Agendar
                </span>
              </div>
            </div>
          </motion.button>

          {/* ZONA DERECHA - Menú arquitectónico */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onMenuClick}
            className="relative group"
          >
            {/* Subtle background */}
            <div className="absolute inset-0 bg-white/5 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Menu lines container */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center space-y-1.5">
                {/* Línea superior */}
                <motion.div 
                  className="w-5 h-0.5 bg-white/80 rounded-full"
                  animate={{ width: onMenuClick ? "20px" : "20px" }}
                  transition={{ duration: 0.3 }}
                />
                {/* Línea media */}
                <motion.div 
                  className="w-5 h-0.5 bg-white/60 rounded-full"
                  animate={{ width: onMenuClick ? "16px" : "20px" }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                />
                {/* Línea inferior */}
                <motion.div 
                  className="w-5 h-0.5 bg-white/40 rounded-full"
                  animate={{ width: onMenuClick ? "12px" : "20px" }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </div>
            </div>
          </motion.button>

        </div>

        {/* INDICADOR DE SECCIÓN - Typography premium */}
        <motion.div
          key={sectionName}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-3 text-center"
        >
          <div className="relative inline-block">
            {/* Subtle underline */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            {/* Texto */}
            <p className="text-white/50 text-[10px] font-light tracking-[0.3em] uppercase leading-none">
              {sectionName}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileNavbar;
