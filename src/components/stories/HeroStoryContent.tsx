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
    <div className="relative w-full h-full bg-black">
      {/* VIDEO HERO - Fondo cinematográfico */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center scale-105 grayscale-[0.1] brightness-95"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LOGO-FULL CENTRADO - Único elemento */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Card glassmorphism premium */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"></div>
          
          {/* Sheen arquitectónico */}
          <div className="marble-architectural-sheen rounded-3xl"></div>
          
          {/* Logo-full container */}
          <div className="relative z-10 p-8">
            <img 
              src="/logo-full.webp" 
              alt="Dr. Jorge Iglesias Márquez"
              className="w-48 h-16 object-contain filter drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroStoryContent;
