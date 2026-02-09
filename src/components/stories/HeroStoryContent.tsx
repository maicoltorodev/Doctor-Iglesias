"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Obra } from '@/components/ui/desktop/Obra';

interface HeroStoryContentProps {
  content: any;
}

/**
 * HERO STORY CONTENT - Núcleo central del recorrido
 * 
 * CARACTERÍSTICAS:
 * - Logo principal animado
 * - Texto editorial del Hero
 * - CTA de contacto
 * - Animaciones premium tipo mármol
 */
export const HeroStoryContent: React.FC<HeroStoryContentProps> = ({ content }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex flex-col items-center justify-center p-8 space-y-8"
    >
      {/* LOGO PRINCIPAL */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative w-48 h-16 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-2xl"></div>
        <div className="relative z-10">
          <img 
            src="/logo.webp" 
            alt="Dr. Jorge Iglesias Márquez"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* TÍTULO EDITORIAL */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center space-y-4 max-w-md"
      >
        <h1 className="text-4xl font-light text-black leading-tight">
          {content?.titleLight}{' '}
          <span className="font-serif italic text-black/40">{content?.titleBold}</span>
        </h1>
        {content?.subtitle && (
          <p className="text-lg text-black/60">{content.subtitle}</p>
        )}
      </motion.div>

      {/* CTA - CALL TO ACTION */}
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
            className="inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-black/80"
          >
            <span>{content.cta.text}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4-4m4 4H9" />
            </svg>
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HeroStoryContent;
