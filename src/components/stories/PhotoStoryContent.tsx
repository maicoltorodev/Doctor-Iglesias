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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center p-6"
    >
      <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={content?.src || '/placeholder-photo.jpg'}
          alt={content?.alt || content?.title || 'Foto de galería'}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false}
        />
        
        {/* Overlay opcional con información */}
        {(content?.title || content?.description) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {content?.title && (
                <p className="text-white text-sm font-medium">{content.title}</p>
              )}
              {content?.description && (
                <p className="text-white/80 text-xs mt-1">{content.description}</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PhotoStoryContent;
