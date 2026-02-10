"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PhotoStoryContentProps {
  content: any;
}

/**
 * PHOTO STORY CONTENT - Fotos individuales de galería
 * 
 * CARACTERÍSTICAS:
 * - Optimizado con Next/Image
 * - Aspect ratio consistente
 * - Animaciones de entrada
 * - Loading states
 */
export const PhotoStoryContent: React.FC<PhotoStoryContentProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="relative w-full h-full flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-3 shadow-2xl overflow-hidden group">

        {/* IMAGE CONTAINER */}
        <div className="relative w-full flex-1 rounded-[32px] overflow-hidden">
          <Image
            src={content?.src || '/placeholder-photo.jpg'}
            alt={content?.alt || content?.title || 'Foto de galería'}
            fill
            className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            sizes="(max-width: 768px) 90vw, 400px"
            priority={false}
          />

          {/* Overlay opcional con información */}
          {(content?.title || content?.description) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {content?.title && (
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50 mb-2">
                    {content.category || "Galería"}
                  </p>
                )}
                {content?.title && (
                  <h3 className="text-xl font-serif italic text-white mb-2 leading-tight">
                    {content.title}
                  </h3>
                )}
                {content?.description && (
                  <p className="text-[10px] uppercase tracking-wider text-white/70 font-light leading-relaxed max-w-[200px]">
                    {content.description}
                  </p>
                )}
              </motion.div>
            </div>
          )}
        </div>

        {/* BOTTOM DECORATIVE TAG (SMALL) */}
        <div className="h-10 flex items-center justify-center">
          <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-black/20">Desliza para ver más</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoStoryContent;
