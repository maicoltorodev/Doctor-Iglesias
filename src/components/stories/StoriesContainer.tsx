"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeGestures } from '../../hooks/useSwipeGestures';
import { StoryProgress } from './StoryProgress';
import { HeroStoryContent } from './HeroStoryContent';
import { TitleStoryContent } from './TitleStoryContent';
import { ServiceStoryContent } from './ServiceStoryContent';
import { PhotoStoryContent } from './PhotoStoryContent';
import { TestimonialStoryContent } from './TestimonialStoryContent';
import { ResultStoryContent } from './ResultStoryContent';
import { ContentStoryContent } from './ContentStoryContent';
import { MobileNavbar } from './MobileNavbar';
import { MobileMenu } from './MobileMenu';
import { CONTACT_INFO, FAB_CONTENT } from '@/constants/content';
import { MobileFloatingActionButton } from '@/components/ui/mobile/MobileFloatingActionButton';

export interface Story {
  id: string;
  type: 'title' | 'service' | 'photo' | 'testimonial' | 'content' | 'hero' | 'result';
  content: any;
  section: string;
}

interface StoriesContainerProps {
  stories: Story[]; // Stories de la sección para el progreso visual interno
  currentStory: Story;
  currentStoryIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onHomeClick?: () => void;
  onSectionClick?: (index: number) => void;
  allSections?: { name: string; index: number }[];
  currentSectionIndex?: number;
  sectionName: string;
  className?: string;
  fabContent?: any;
  contactInfo?: any;
}

const renderStoryContent = (story: Story) => {
  switch (story.type) {
    case 'hero':
      return <HeroStoryContent content={story.content} />;
    case 'title':
      return <TitleStoryContent content={story.content} />;
    case 'service':
      return <ServiceStoryContent content={story.content} />;
    case 'photo':
      return <PhotoStoryContent content={story.content} />;
    case 'testimonial':
      return <TestimonialStoryContent content={story.content} />;
    case 'result':
      return <ResultStoryContent content={story.content} />;
    case 'content':
      return <ContentStoryContent content={story.content} />;
    default:
      return <div>Story type not supported</div>;
  }
};

export const StoriesContainer: React.FC<StoriesContainerProps> = ({
  stories,
  currentStory,
  currentStoryIndex,
  onNext,
  onPrev,
  onHomeClick,
  onSectionClick,
  allSections = [],
  currentSectionIndex = 0,
  sectionName,
  className = "",
  fabContent = FAB_CONTENT,
  contactInfo = CONTACT_INFO
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tracking de posición global para dirección de animación
  const [globalID, setGlobalID] = useState(currentStory?.id);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (currentStory?.id !== globalID) {
      setGlobalID(currentStory?.id);
    }
  }, [currentStory, globalID]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    onNext();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    onPrev();
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useSwipeGestures(containerRef, {
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    threshold: 40,
    preventScroll: true
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, onNext, onPrev]);

  // Progreso de la sección
  const progress = ((currentStoryIndex + 1) / stories.length) * 100;

  // Handlers para navbar
  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleBookingClick = () => {
    window.open(CONTACT_INFO.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Variantes para transición Premium (3D Cinematic)
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      rotateY: direction > 0 ? 30 : -30,
      scale: 0.9,
      opacity: 0,
    }),
    center: {
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      rotateY: direction > 0 ? -30 : 30,
      scale: 0.9,
      opacity: 0,
      zIndex: 0
    })
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-[#e6e3e8] ${className}`}
      style={{ touchAction: 'pan-y', perspective: '1200px' }}
    >
      {/* NAVBAR PERSISTENTE - Overlay */}
      <MobileNavbar
        sectionName={sectionName}
        currentSectionIndex={currentSectionIndex}
        onMenuClick={handleMenuClick}
        onBookingClick={handleBookingClick}
        onLogoClick={onHomeClick}
      />

      {/* CONTENIDO FULL SCREEN - Con Stage Proporcional */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentStory?.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 35 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.5 },
              filter: { duration: 0.4 }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
            className={`w-full h-full flex items-center justify-center ${currentStory?.type === 'hero' ? 'p-0' : 'p-4'}`}
          >
            {currentStory && (
              <div className={`flex items-center justify-center ${currentStory.type === 'hero'
                ? 'w-full h-full'
                : 'w-[92%] h-[74%] mt-[-5vh]'
                }`}>
                {renderStoryContent(currentStory)}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM NAV BAR (ESTILO ULTRA-MINIMALISTA CON SAFE AREA) */}
      <div className="absolute bottom-0 left-0 right-0 z-[50] h-[calc(5rem+env(safe-area-inset-bottom,0px))] pointer-events-none">
        <div className="relative h-full flex justify-between items-center px-8 pb-[max(1rem,env(safe-area-inset-bottom,1.5rem))]">
          {/* BOTÓN ANTERIOR (FLOTANTE) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9, x: -5 }}
            onClick={handlePrev}
            className={`pointer-events-auto flex items-center justify-center group transition-opacity duration-300`}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div
                className="w-3.5 h-3.5 bg-black/40 group-hover:bg-black transition-colors"
                style={{
                  clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                  backgroundImage: 'url(/marmol.webp)',
                  backgroundSize: 'cover'
                }}
              />
            </div>
          </motion.button>

          {/* NÚCLEO CENTRAL - NAVEGACIÓN & SECCIÓN (MÁRMOL PURO) */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center px-6 py-2.5 rounded-full shadow-lg overflow-hidden"
              style={{
                backgroundImage: 'url(/marmol.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay sutil para profundidad */}
              <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />

              {/* Dots de progreso (Stories) */}
              <div className="relative z-10 flex space-x-1.5 mb-1.5">
                {stories.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      width: idx === currentStoryIndex ? 16 : 4,
                      backgroundColor: idx === currentStoryIndex ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'
                    }}
                    className="h-[1.5px] rounded-full transition-all duration-500"
                  />
                ))}
              </div>

              {/* Nombre de la Sección */}
              <motion.span
                key={sectionName}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-[7px] uppercase tracking-[0.4em] text-black/70 font-black"
              >
                {sectionName}
              </motion.span>
            </motion.div>
          </div>

          {/* BOTÓN SIGUIENTE (FLOTANTE) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9, x: 5 }}
            onClick={handleNext}
            className={`pointer-events-auto flex items-center justify-center group transition-opacity duration-300`}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div
                className="w-3.5 h-3.5 bg-black/40 group-hover:bg-black transition-colors"
                style={{
                  clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                  backgroundImage: 'url(/marmol.webp)',
                  backgroundSize: 'cover'
                }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* BOTÓN FLOTANTE DE CONTACTO (FAB EXCLUSIVO MÓVIL) */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-[6vw] bottom-[14vh] z-[90] flex items-center justify-end pointer-events-none"
          >
            <MobileFloatingActionButton
              activeIndex={currentSectionIndex}
              fabContent={fabContent}
              contactInfo={contactInfo}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENÚ OVERLAY */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sections={allSections}
        currentSectionIndex={currentSectionIndex}
        onSectionClick={(index) => {
          if (onSectionClick) onSectionClick(index);
          setIsMenuOpen(false);
        }}
      />
    </div>
  );
};

export default StoriesContainer;
