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
 * DISEÑO UI/UX PROFESIONAL:
 * - Video hero con overlay gradiente para legibilidad máxima
 * - Jerarquía visual clara con 3 niveles de información
 * - Micro-interacciones táctiles premium
 * - Optimizado para thumbs y mobile-first
 * - Autoridad médica inmediata
 */
export const HeroStoryContent: React.FC<HeroStoryContentProps> = ({ content }) => {
  return (
    <div className="relative w-full h-full bg-black">
      {/* VIDEO HERO - Fondo con optimización mobile */}
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

      {/* OVERLAY GRADIENT PROFESIONAL - Legibilidad y profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

      {/* CONTENIDO SUPERPUESTO - Estructura jerárquica */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full h-full flex flex-col justify-between p-6 pt-20 pb-8"
      >
        {/* ENCABEZADO PROFESIONAL */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center space-y-4 mt-8"
        >
          {/* SELLO DE AUTORIDAD MÉDICA */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl"></div>
            <div className="relative px-4 py-2">
              <p className="text-xs font-light tracking-widest text-white/90 uppercase">
                Dr. Jorge Iglesias Márquez
              </p>
            </div>
          </motion.div>

          {/* LOGO PREMIUM */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative w-28 h-10 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"></div>
            <div className="relative z-10">
              <img 
                src="/logo.webp" 
                alt="Dr. Jorge Iglesias Márquez"
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* MENSAJE PRINCIPAL - Centro de atención */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex-1 flex flex-col items-center justify-center space-y-6"
        >
          {/* TÍTULO JERÁRQUICO - Impacto inmediato */}
          <div className="text-center space-y-3 max-w-sm">
            <motion.h1 
              className="text-4xl font-light text-white leading-tight tracking-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              {content?.titleLight}{' '}
              <motion.span 
                className="font-serif italic text-white/70 block mt-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                {content?.titleBold}
              </motion.span>
            </motion.h1>
            
            {content?.subtitle && (
              <motion.p 
                className="text-base text-white/60 leading-relaxed px-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                {content.subtitle}
              </motion.p>
            )}
          </div>

          {/* INDICADOR DE SWIPE - UX Guidance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="flex flex-col items-center space-y-2"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4-4m4 4H9" />
              </svg>
            </motion.div>
            <p className="text-xs text-white/40 tracking-wider uppercase">
              Desliza para explorar
            </p>
          </motion.div>
        </motion.div>

        {/* CTA ESTRATÉGICO - Bottom positioning */}
        {content?.cta && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="flex flex-col items-center space-y-3"
          >
            {/* CTA PRIMARIO */}
            <motion.a
              href={content.cta.href}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur-lg group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4">
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm font-medium tracking-wide">
                    {content.cta.text}
                  </span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-white/80"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4-4m4 4H9" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.a>

            {/* SECUNDARIO - Contacto directo */}
            <motion.a
              href="tel:+1234567890"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/50 text-xs tracking-wider underline underline-offset-2 hover:text-white/70 transition-colors duration-300"
            >
              Contacto Directo
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroStoryContent;
