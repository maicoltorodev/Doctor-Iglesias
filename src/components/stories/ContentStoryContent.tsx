"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ContentStoryContentProps {
  content: any;
}

/**
 * CONTENT STORY CONTENT - Contenido genérico flexible
 * 
 * CARACTERÍSTICAS:
 * - Soporta HTML dinámico
 * - Maps de contacto
 * - Datos estructurados
 * - Animaciones de entrada
 */
export const ContentStoryContent: React.FC<ContentStoryContentProps> = ({ content }) => {
  const renderContentByType = () => {
    switch (content?.type) {
      case 'map':
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-light mb-4">{content.title}</h3>
            <div className="w-full h-64 bg-black/5 rounded-xl flex items-center justify-center">
              <p className="text-black/60">Mapa interactivo</p>
            </div>
          </div>
        );

      case 'clinic':
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-light mb-4">{content.title}</h3>
            <div className="w-full h-64 bg-black/5 rounded-xl overflow-hidden">
              <img 
                src={content.data?.clinicImage || '/placeholder-clinic.jpg'}
                alt="Clínica"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-light mb-4">{content.title}</h3>
            <div className="space-y-3 text-black/70">
              {content.data?.address && (
                <p>{content.data.address}</p>
              )}
              {content.data?.phone && (
                <p>{content.data.phone}</p>
              )}
              {content.data?.email && (
                <p>{content.data.email}</p>
              )}
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-light mb-4">{content.title}</h3>
            <div className="flex justify-center space-x-4">
              {content.data?.whatsapp && (
                <a 
                  href={content.data.whatsappUrl}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"
                >
                  W
                </a>
              )}
              {content.data?.instagram && (
                <a 
                  href={content.data.instagram}
                  className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white"
                >
                  I
                </a>
              )}
            </div>
          </div>
        );

      case 'mission':
      case 'history':
      case 'values':
      case 'marbles':
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-light mb-4">{content.title}</h3>
            <div className="text-black/70 leading-relaxed max-w-lg">
              {content.data?.description && (
                <p>{content.data.description}</p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div 
            className="text-center space-y-6"
            dangerouslySetInnerHTML={{ __html: content?.content || content }}
          />
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center p-6"
    >
      <div className="w-full max-w-lg">
        {renderContentByType()}
      </div>
    </motion.div>
  );
};

export default ContentStoryContent;
