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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex flex-col items-center justify-center p-8"
    >
      <div className="text-center space-y-6 max-w-lg">
        {/* SUBTÍTULO DECORATIVO */}
        {content?.subtitle && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.4em] uppercase font-bold text-black/30"
          >
            {content.subtitle}
          </motion.span>
        )}

        {/* TÍTULO PRINCIPAL */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl lg:text-4xl font-light text-black leading-tight"
        >
          {content?.titleLight}{' '}
          <span className="font-serif italic text-black/40">{content?.titleBold}</span>
        </motion.h2>

        {/* DESCRIPCIÓN OPCIONAL */}
        {content?.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base lg:text-lg text-black/60 leading-relaxed max-w-2xl mt-6"
          >
            {content.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default TitleStoryContent;
