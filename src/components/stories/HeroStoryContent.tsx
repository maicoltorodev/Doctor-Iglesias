"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Obra } from '@/components/ui/desktop/Obra';

interface HeroStoryContentProps {
  content: any;
}

/**
 * HERO STORY CONTENT - Núcleo central del recorrido (Mobile)
 * 
 * CARACTERÍSTICAS:
 * - Video hero adaptado para mobile (autoplay, muted, loop)
 * - Contenido superpuesto optimizado para pantalla pequeña
 * - Animaciones premium con Framer Motion
 * - Performance optimizada para móviles
 */
export const HeroStoryContent: React.FC<HeroStoryContentProps> = ({ content }) => {
  return (
    <div className="relative w-full h-full">
      {/* VIDEO HERO - Fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center grayscale-[0.2] brightness-90"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay de profundidad para legibilidad */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      {/* CONTENIDO SUPERPUESTO */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full flex flex-col items-center justify-center p-8 space-y-6"
      >
        {/* LOGO PRINCIPAL - Adaptado para mobile */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative w-32 h-12 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] shadow-2xl"></div>
          <div className="relative z-10">
            <img 
              src="/logo.webp" 
              alt="Dr. Jorge Iglesias Márquez"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* TÍTULO EDITORIAL - Optimizado para mobile */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center space-y-3 max-w-sm"
        >
          <h1 className="text-3xl font-light text-black leading-tight">
            {content?.titleLight}{' '}
            <span className="font-serif italic text-black/40">{content?.titleBold}</span>
          </h1>
          {content?.subtitle && (
            <p className="text-base text-black/60">{content.subtitle}</p>
          )}
        </motion.div>

        {/* CTA - Adaptado para touch */}
        {content?.cta && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative"
          >
            <motion.a
              href={content.cta.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-black/80"
            >
              <span>{content.cta.text}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4-4m4 4H9" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroStoryContent;
