"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Obra } from '@/components/ui/desktop/Obra';

interface ServiceStoryContentProps {
  content: any;
}

/**
 * SERVICE STORY CONTENT - Cards individuales de servicios
 * 
 * CARACTERÍSTICAS:
 * - Reutiliza componente Obra existente
 * - Formato card premium
 * - Animaciones de entrada
 * - Responsive optimizado
 */
export const ServiceStoryContent: React.FC<ServiceStoryContentProps> = ({ content }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center p-6"
    >
      <Obra
        src={content?.image || '/placeholder-service.jpg'}
        alt={content?.title}
        category={content?.category}
        title={content?.title}
        overlayTitle={content?.overlayTitle}
        overlayDescription={content?.overlayDescription}
        overlayTag={content?.overlayTag || "Ver Detalles"}
        href={content?.href}
        className="w-full max-w-md"
      />
    </motion.div>
  );
};

export default ServiceStoryContent;
