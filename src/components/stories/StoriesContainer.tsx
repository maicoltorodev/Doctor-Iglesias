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
import { ContentStoryContent } from './ContentStoryContent';
import { MobileNavbar } from './MobileNavbar';

export interface Story {
  id: string;
  type: 'title' | 'service' | 'photo' | 'testimonial' | 'content' | 'hero';
  content: any;
  section: string;
}

interface StoriesContainerProps {
  stories: Story[];
  currentStoryIndex: number;
  onStoryChange: (index: number) => void;
  sectionName: string;
  className?: string;
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
    case 'content':
      return <ContentStoryContent content={story.content} />;
    default:
      return <div>Story type not supported</div>;
  }
};

export const StoriesContainer: React.FC<StoriesContainerProps> = ({
  stories,
  currentStoryIndex,
  onStoryChange,
  sectionName,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSwipeLeft = () => {
    if (isTransitioning || currentStoryIndex >= stories.length - 1) return;
    
    setIsTransitioning(true);
    onStoryChange(currentStoryIndex + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleSwipeRight = () => {
    if (isTransitioning || currentStoryIndex <= 0) return;
    
    setIsTransitioning(true);
    onStoryChange(currentStoryIndex - 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  useSwipeGestures(containerRef, {
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 50,
    preventScroll: true
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleSwipeRight();
      if (e.key === 'ArrowRight') handleSwipeLeft();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStoryIndex, isTransitioning]);

  const currentStory = stories[currentStoryIndex];
  const progress = ((currentStoryIndex + 1) / stories.length) * 100;

  // Handlers para navbar
  const handleMenuClick = () => {
    // TODO: Implementar menú lateral
    console.log('Menu clicked');
  };

  const handleBookingClick = () => {
    // TODO: Implementar modal de agendamiento
    console.log('Booking clicked');
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-[#e6e3e8] ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* NAVBAR PERSISTENTE */}
      <MobileNavbar
        sectionName={sectionName}
        onMenuClick={handleMenuClick}
        onBookingClick={handleBookingClick}
      />

      <StoryProgress
        current={currentStoryIndex + 1}
        total={stories.length}
        progress={progress}
        sectionName={sectionName}
      />

      <div className="relative w-full h-full flex items-center justify-center pt-20">
        <AnimatePresence>
          <motion.div
            key={currentStory?.id}
            initial={{ 
              opacity: 0, 
              x: currentStoryIndex > 0 ? 100 : -100,
              scale: 0.9 
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              x: currentStoryIndex < stories.length - 1 ? -100 : 100,
              scale: 0.9 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              mass: 0.8 
            }}
            className="w-full h-full flex items-center justify-center p-6"
          >
            {currentStory && (
              <div className="w-full h-full max-w-lg mx-auto flex items-center justify-center">
                {renderStoryContent(currentStory)}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTONES DE NAVEGACIÓN INFERIORES */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8 pointer-events-none">
        {/* BOTÓN IZQUIERDO - Story Anterior */}
        {currentStoryIndex > 0 && (
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwipeRight}
            className="pointer-events-auto relative group"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full blur-lg group-hover:bg-white/20 transition-all duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-14 h-14 flex items-center justify-center">
              <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </motion.button>
        )}

        {/* CONTADOR CENTRAL */}
        {stories.length > 1 && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white/40 text-xs bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
            <span>{currentStoryIndex + 1}</span>
            <span>/</span>
            <span>{stories.length}</span>
          </div>
        )}

        {/* BOTÓN DERECHO - Story Siguiente */}
        {currentStoryIndex < stories.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwipeLeft}
            className="pointer-events-auto relative group ml-auto"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full blur-lg group-hover:bg-white/20 transition-all duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-14 h-14 flex items-center justify-center">
              <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default StoriesContainer;
