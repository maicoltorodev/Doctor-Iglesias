"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HeroStoryContentProps {
  content: any;
}

/**
 * HERO STORY CONTENT - Minimalista centrada
 * 
 * DISEÑO ULTRA-MINIMALISTA:
 * - Video hero como único fondo
 * - Logo-full con glassmorphism en centro absoluto
 * - Sin elementos adicionales
 * - Experiencia cinematográfica pura
 */
export const HeroStoryContent: React.FC<HeroStoryContentProps> = ({ content }) => {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* VIDEO HERO - Fondo cinematográfico con zoom lento */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "linear" }}
        className="absolute inset-0 overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center grayscale-[0.1] brightness-75 scale-105"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Capa de profundidad */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* COMPONENTE CENTRAL - LOGO & TEXTO (JERARQUÍA DESKTOP) */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-12 w-full -translate-y-18">
          {/* 1. LOGO CARD (ADAPTADA AL LOGO) - SIN ANIMACIÓN DE ENTRADA */}
          <div className="relative w-[98%] max-w-[520px] h-28 flex items-center justify-center cursor-pointer">
            {/* Card glassmorphism premium - ALINEADA CON ESTÉTICA FAB */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] shadow-2xl transform-gpu backface-hidden"></div>

            {/* Logo container - Máxima fidelidad al aspecto horizontal */}
            <div className="relative z-10 w-full h-full p-2 flex items-center justify-center">
              <img
                src="/logo-full.webp"
                alt="Dr. Jorge Iglesias Márquez"
                className="w-full h-full object-contain drop-shadow-sm p-1"
              />
            </div>
          </div>

          {/* 2. SLOGAN TEXT (ESTILO UNIFICADO) */}
          {content?.slogan && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-center px-6"
            >
              <div className="text-xl lg:text-2xl font-extralight text-white/70 leading-relaxed tracking-[0.2em] font-serif italic uppercase">
                {content.slogan.text}
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
};

export default HeroStoryContent;
