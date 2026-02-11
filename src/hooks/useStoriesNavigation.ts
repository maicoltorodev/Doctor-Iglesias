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
 * HOOK DE NAVEGACIÓN DE STORIES - Versión Refactorizada (Lista Plana)
 * 
 * CARACTERÍSTICAS:
 * - Un solo índice global para todo el sitio.
 * - Navegación lineal pura y robusta.
 * - Eliminación de race conditions entre secciones.
 */
export const useStoriesNavigation = (
  allStories: Story[],
  initialIndex: number = 0
) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const navigationHistory = useRef<number[]>([initialIndex]);
  const isInitialized = useRef(false);

  // Sincronizar el índice cuando los datos terminan de cargar
  useEffect(() => {
    if (!isInitialized.current && initialIndex !== -1 && initialIndex !== currentIndex) {
      setCurrentIndex(initialIndex);
      isInitialized.current = true;
    }
  }, [initialIndex, currentIndex]);

  const totalStories = allStories.length;
  const currentStory = allStories[currentIndex];

  // === NAVEGACIÓN ===
  const nextStory = useCallback(() => {
    if (currentIndex < totalStories - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      navigationHistory.current.push(newIndex);
    }
  }, [currentIndex, totalStories]);

  const previousStory = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      navigationHistory.current.push(newIndex);
    }
  }, [currentIndex]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < totalStories) {
      setCurrentIndex(index);
      navigationHistory.current.push(index);
    }
  }, [totalStories]);

  // Buscar el índice óptimo para una sección (el Título)
  const goToSection = useCallback((sectionKey: string) => {
    // Intentar encontrar la historia de tipo 'title' en esa sección
    let targetIndex = allStories.findIndex(s => s.section === sectionKey && s.type === 'title');

    // Fallback: primer índice de la sección
    if (targetIndex === -1) {
      targetIndex = allStories.findIndex(s => s.section === sectionKey);
    }

    if (targetIndex !== -1) {
      goToIndex(targetIndex);
    }
  }, [allStories, goToIndex]);

  // === UTILIDADES ===
  const getProgress = useCallback(() => {
    // Progreso dentro de la sección actual
    const sectionStories = allStories.filter(s => s.section === currentStory?.section);
    const storyInSectionIndex = sectionStories.findIndex(s => s.id === currentStory?.id);

    return {
      total: ((currentIndex + 1) / totalStories) * 100,
      story: ((storyInSectionIndex + 1) / sectionStories.length) * 100,
      currentStoryInSection: storyInSectionIndex,
      totalStoriesInCurrentSection: sectionStories.length
    };
  }, [currentIndex, totalStories, allStories, currentStory]);

  const canGoNext = currentIndex < totalStories - 1;
  const canGoPrevious = currentIndex > 0;

  // === TECLADO ===
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextStory();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousStory();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStory, previousStory]);

  return {
    currentIndex,
    currentStory,
    nextStory,
    previousStory,
    goToIndex,
    goToSection,
    getProgress,
    canGoNext,
    canGoPrevious,
    totalStories,
    sectionName: currentStory?.section || ""
  };
};

// Helper para obtener el nombre legible de la sección (opcional)
export const getSectionDisplayName = (sectionKey: string): string => {
  const mapping: Record<string, string> = {
    'about': 'Nosotros',
    'gallery': 'Galería',
    'contact': 'Contacto',
    'hero': 'Inicio',
    'services': 'Servicios',
    'results': 'Resultados',
    'testimonials': 'Testimonios'
  };
  return mapping[sectionKey] || sectionKey;
};

