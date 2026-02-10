"use client";

import { useState, useCallback, useRef, useEffect } from 'react';

export interface Story {
  id: string;
  type: 'title' | 'service' | 'photo' | 'testimonial' | 'content' | 'hero';
  content: any;
  section: string;
}

export interface SectionStories {
  sectionName: string;
  stories: Story[];
}

/**
 * HOOK DE NAVEGACIÓN DE STORIES - Estado global de navegación
 * 
 * CARACTERÍSTICAS:
 * - Gestión de estado de story actual
 * - Navegación entre secciones
 * - Historial de navegación
 * - Accesibilidad y atajos de teclado
 */
export const useStoriesNavigation = (
  allSections: SectionStories[],
  initialSectionIndex: number = 0,
  initialStoryIndex: number = 0
) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialSectionIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const navigationHistory = useRef<Array<{ section: number; story: number }>>([{
    section: initialSectionIndex,
    story: initialStoryIndex
  }]);

  const currentSection = allSections[currentSectionIndex];
  const currentStories = currentSection?.stories || [];
  const totalSections = allSections.length;

  // === NAVEGACIÓN ENTRE STORIES ===
  const nextStory = useCallback(() => {
    if (currentStoryIndex < currentStories.length - 1) {
      // Siguiente story en la misma sección
      const newIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(newIndex);

      // Guardar en historial
      navigationHistory.current.push({
        section: currentSectionIndex,
        story: newIndex
      });
    } else if (currentSectionIndex < totalSections - 1) {
      // Pasar a siguiente sección
      const nextSectionIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextSectionIndex);
      setCurrentStoryIndex(0);

      navigationHistory.current.push({
        section: nextSectionIndex,
        story: 0
      });
    }
  }, [currentStoryIndex, currentStories.length, currentSectionIndex, totalSections]);

  const previousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      // Story anterior en la misma sección
      const newIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(newIndex);

      navigationHistory.current.push({
        section: currentSectionIndex,
        story: newIndex
      });
    } else if (currentSectionIndex > 0) {
      // Volver a sección anterior
      const prevSectionIndex = currentSectionIndex - 1;
      const prevSection = allSections[prevSectionIndex];
      const lastStoryIndex = prevSection?.stories.length - 1 || 0;

      setCurrentSectionIndex(prevSectionIndex);
      setCurrentStoryIndex(lastStoryIndex);

      navigationHistory.current.push({
        section: prevSectionIndex,
        story: lastStoryIndex
      });
    }
  }, [currentStoryIndex, currentSectionIndex, allSections]);

  // === NAVEGACIÓN DIRECTA ===
  const goToStory = useCallback((sectionIndex: number, storyIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < totalSections) {
      const section = allSections[sectionIndex];
      if (section && storyIndex >= 0 && storyIndex < section.stories.length) {
        setCurrentSectionIndex(sectionIndex);
        setCurrentStoryIndex(storyIndex);

        navigationHistory.current.push({
          section: sectionIndex,
          story: storyIndex
        });
      }
    }
  }, [allSections, totalSections]);

  const goToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < totalSections) {
      setCurrentSectionIndex(sectionIndex);
      setCurrentStoryIndex(0);

      navigationHistory.current.push({
        section: sectionIndex,
        story: 0
      });
    }
  }, [totalSections]);

  // === UTILIDADES ===
  const getCurrentStory = useCallback(() => {
    return currentStories[currentStoryIndex];
  }, [currentStories, currentStoryIndex]);

  const getProgress = useCallback(() => {
    const sectionProgress = ((currentSectionIndex + 1) / totalSections) * 100;
    const storyProgress = ((currentStoryIndex + 1) / currentStories.length) * 100;

    return {
      section: sectionProgress,
      story: storyProgress,
      total: ((currentSectionIndex * currentStories.length) + currentStoryIndex + 1) /
        getTotalStories(allSections) * 100
    };
  }, [currentSectionIndex, currentStoryIndex, currentStories.length, totalSections, allSections]);

  const canGoNext = useCallback(() => {
    return currentStoryIndex < currentStories.length - 1 ||
      currentSectionIndex < totalSections - 1;
  }, [currentStoryIndex, currentStories.length, currentSectionIndex, totalSections]);

  const canGoPrevious = useCallback(() => {
    return currentStoryIndex > 0 || currentSectionIndex > 0;
  }, [currentStoryIndex, currentSectionIndex]);

  // === ACCESIBILIDAD - TECLADO ===
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextStory();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          previousStory();
          break;
        case 'Home':
          e.preventDefault();
          goToSection(0);
          break;
        case 'End':
          e.preventDefault();
          goToSection(totalSections - 1);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          e.preventDefault();
          const sectionIndex = parseInt(e.key) - 1;
          if (sectionIndex < totalSections) {
            goToSection(sectionIndex);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStory, previousStory, goToSection, totalSections]);

  return {
    // Estado actual
    currentSectionIndex,
    currentStoryIndex,
    currentSection,
    currentStories,
    currentStory: getCurrentStory(),

    // Navegación
    nextStory,
    previousStory,
    goToStory,
    goToSection,

    // Utilidades
    getProgress,
    canGoNext,
    canGoPrevious,

    // Historial
    navigationHistory: navigationHistory.current,
    totalStories: getTotalStories(allSections)
  };
};

// Helper function
const getTotalStories = (sections: SectionStories[]): number => {
  return sections.reduce((total, section) => total + section.stories.length, 0);
};
