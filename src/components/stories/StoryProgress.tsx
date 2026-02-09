"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StoryProgressProps {
  current: number;
  total: number;
  progress: number; // 0-100
  sectionName: string;
  className?: string;
}

/**
 * STORY PROGRESS - Indicadores de progreso tipo Instagram
 * 
 * CARACTERÍSTICAS:
 * - Indicadores visuales para cada story
 * - Barra de progreso animada
 * - Contador "X/Y" dinámico
 * - Animaciones suaves con Framer Motion
 */
export const StoryProgress: React.FC<StoryProgressProps> = ({
  current,
  total,
  progress,
  sectionName,
  className = ""
}) => {
  // No mostrar si solo hay un story
  if (total <= 1) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-black/5 backdrop-blur-sm ${className}`}>
      <div className="container mx-auto px-6 py-4">
        {/* SECCIÓN ACTUAL */}
        <div className="text-center mb-3">
          <span className="text-xs tracking-[0.3em] uppercase font-bold text-black/40">
            {sectionName}
          </span>
        </div>

        {/* INDICADORES INDIVIDUALES */}
        <div className="flex items-center justify-center space-x-1 mb-3">
          {Array.from({ length: total }).map((_, index) => (
            <motion.div
              key={index}
              className="relative h-1 flex-1 max-w-8 bg-black/20 rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: index < current ? 1 : 0,
                backgroundColor: index < current ? '#000' : 'rgba(0,0,0,0.1)'
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.05
              }}
            >
              {/* BARRA DE PROGRESO INTERNA */}
              {index === current - 1 && (
                <motion.div
                  className="absolute inset-0 bg-black origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (progress % (100 / total)) / (100 / total) }}
                  transition={{ 
                    duration: 0.1,
                    ease: "linear"
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CONTADOR */}
        <div className="text-center">
          <span className="text-xs font-medium text-black/60">
            {current} / {total}
          </span>
        </div>
      </div>
    </div>
  );
};
