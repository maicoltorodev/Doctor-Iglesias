"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TestimonialStoryContentProps {
  content: any;
}

/**
 * TESTIMONIAL STORY CONTENT - Cards individuales de testimonios
 * 
 * CARACTERÍSTICAS:
 * - Foto de autor
 * - Texto en cursiva
 * - Nombre y cargo
 * - Animaciones de entrada
 */
export const TestimonialStoryContent: React.FC<TestimonialStoryContentProps> = ({ content }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-xl">
        {/* FOTO DE AUTOR */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
            {content?.avatar ? (
              <Image
                src={content.avatar}
                alt={content?.author || 'Autor'}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full bg-black/10 flex items-center justify-center">
                <span className="text-black/40 text-lg font-serif">
                  {content?.author?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            {content?.author && (
              <p className="text-sm font-bold text-black">{content.author}</p>
            )}
            {content?.role && (
              <p className="text-xs text-black/60">{content.role}</p>
            )}
          </div>
        </div>

        {/* TEXTO DEL TESTIMONIO */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-black/70 font-serif leading-relaxed"
        >
          <p className="text-lg italic">
            &ldquo;{content?.text || content?.testimonial}&rdquo;
          </p>
        </motion.blockquote>

        {/* CALIFICACIÓN OPCIONAL */}
        {content?.rating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-1 mt-4"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${index < content.rating ? 'text-yellow-400 fill-current' : 'text-black/10'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0 .484.749.926 1.49 1.425l.747 2.982a4.5 4.5 0 01-.924 2.235L9.049 2.927zm-4.598 0l.747-2.982a4.5 4.5 0 00-.924-2.235L4.451 2.927c-.3.921-.921 1.603.921 1.902 0 .484-.749.926-1.49 1.425l-.747 2.982z" />
              </svg>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
