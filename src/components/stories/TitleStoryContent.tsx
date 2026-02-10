"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TitleStoryContentProps {
  content: any;
}

/**
 * TITLE STORY CONTENT - Títulos editoriales de secciones
 * 
 * CARACTERÍSTICAS:
 * - Subtítulo decorativo
 * - Título principal
 * - Descripción opcional
 * - Animaciones de entrada suaves
 */
export const TitleStoryContent: React.FC<TitleStoryContentProps> = ({ content }) => {
  // Soporte para estructura anidada (content.editorial) o directa
  const data = content?.editorial || content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center font-sans"
    >
      <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 py-16 shadow-2xl space-y-8 flex flex-col items-center justify-center text-center">
        {/* SUBTÍTULO DECORATIVO */}
        {(data?.subtitle || data?.category) && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.5em] uppercase font-bold text-black/30"
          >
            {data.subtitle || data.category}
          </motion.span>
        )}

        {/* TÍTULO PRINCIPAL */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-light text-black leading-[1.15]"
        >
          {data?.titleLight ? (
            <>
              <div className="block mb-1">{data?.titleLight}</div>
              <span className="font-serif italic text-black/50 block">{data?.titleBold}</span>
            </>
          ) : (
            <span className="font-serif italic text-black/50 block">{data?.title || data?.label}</span>
          )}
        </motion.h2>

        {/* LÍNEA DECORATIVA */}
        <div className="w-12 h-[1px] bg-black/10" />

        {/* DESCRIPCIÓN OPCIONAL */}
        {data?.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-black/60 leading-relaxed font-light tracking-wide max-w-[280px]"
          >
            {data.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default TitleStoryContent;
