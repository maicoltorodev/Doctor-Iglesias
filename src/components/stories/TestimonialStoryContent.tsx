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
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center"
    >
      <div className="w-full h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 lg:p-10 shadow-2xl flex flex-col justify-between">

        {/* TOP: QUOTE ICON & TEXT */}
        <div className="space-y-6">
          <div className="text-4xl text-black/10 font-serif italic mb-[-10px]">&ldquo;</div>
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-black/80 font-serif leading-relaxed"
          >
            <p className="text-xl lg:text-2xl italic">
              {content?.text || content?.testimonial}
            </p>
          </motion.blockquote>

          {/* CALIFICACIÓN */}
          {content?.rating && (
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`w-3 h-3 ${index < content.rating ? 'text-black/40 fill-current' : 'text-black/10'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0 .484.749.926 1.49 1.425l.747 2.982a4.5 4.5 0 01-.924 2.235L9.049 2.927zm-4.598 0l.747-2.982a4.5 4.5 0 00-.924-2.235L4.451 2.927c-.3.921-.921 1.603.921 1.902 0 .484-.749.926-1.49 1.425l-.747 2.982z" />
                </svg>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM: AUTHOR INFO */}
        <div className="flex items-center space-x-4 border-t border-black/5 pt-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/60 shadow-inner">
            {content?.avatar ? (
              <Image
                src={content.avatar}
                alt={content?.author || 'Autor'}
                fill
                className="object-cover grayscale-[0.2]"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full bg-black/5 flex items-center justify-center">
                <span className="text-black/20 text-lg font-serif">
                  {content?.author?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black">{content?.author}</p>
            <p className="text-[8px] uppercase tracking-[0.1em] text-black/40 mt-1 font-light italic">{content?.role || "Testimonio Verificado"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialStoryContent;
