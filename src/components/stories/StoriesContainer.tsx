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

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-[#e6e3e8] ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      <StoryProgress
        current={currentStoryIndex + 1}
        total={stories.length}
        progress={progress}
        sectionName={sectionName}
      />

      <div className="relative w-full h-full flex items-center justify-center">
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

      {stories.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
          <div className="flex items-center space-x-2 text-black/40 text-xs">
            <span>{currentStoryIndex + 1}</span>
            <span>/</span>
            <span>{stories.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesContainer;
