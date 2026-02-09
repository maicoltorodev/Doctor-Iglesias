"use client";

import React from 'react';
import { StoriesContainer, Story } from '../stories/StoriesContainer';
import { useStoriesNavigation, SectionStories } from '../../hooks/useStoriesNavigation';
import { getAllContent } from '@/services/contentService';

/**
 * MOBILE STORIES LAYOUT - Layout principal para navegación tipo Instagram
 * 
 * CARACTERÍSTICAS:
 * - Reemplaza al MobileLayout tradicional
 * - Navegación tipo stories entre secciones
 * - Indicadores de progreso globales
 * - 100% CMS-driven
 */
interface MobileStoriesLayoutProps {
  children?: React.ReactNode; // Mantener compatibilidad temporal
}

const MobileStoriesLayout: React.FC<MobileStoriesLayoutProps> = ({ children }) => {
  // === DATOS DESDE CMS ===
  const [allSections, setAllSections] = React.useState<SectionStories[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Cargar datos del CMS
  React.useEffect(() => {
    const loadStoriesData = async () => {
      try {
        const content = await getAllContent();
        
        // === MAPEO DE SECCIONES A STORIES ===
        const sections: SectionStories[] = [
          // HERO (Núcleo Central) - 1 story
          {
            sectionName: 'Inicio',
            stories: [
              {
                id: 'hero-1',
                type: 'hero',
                content: content.HERO_CONTENT,
                section: 'hero'
              }
            ]
          },

          // SERVICES (Derecha 1) - 1 + N stories dinámicos
          {
            sectionName: 'Servicios',
            stories: [
              {
                id: 'services-title',
                type: 'title',
                content: content.SERVICES_CONTENT,
                section: 'services'
              },
              ...content.SERVICES_LIST.map((service, index) => ({
                id: `service-${index}`,
                type: 'service' as const,
                content: service,
                section: 'services'
              }))
            ]
          },

          // RESULTS (Derecha 2) - 5 stories fijos
          {
            sectionName: 'Resultados',
            stories: [
              {
                id: 'results-title',
                type: 'title',
                content: content.RESULTS_CONTENT,
                section: 'results'
              },
              ...content.RESULTS_LIST.map((result, index) => ({
                id: `result-${index}`,
                type: 'content' as const,
                content: result,
                section: 'results'
              }))
            ]
          },

          // TESTIMONIALS (Derecha 3) - 1 + N stories dinámicos
          {
            sectionName: 'Testimonios',
            stories: [
              {
                id: 'testimonials-title',
                type: 'title',
                content: content.TESTIMONIALS_CONTENT,
                section: 'testimonials'
              },
              ...content.TESTIMONIALS_LIST.map((testimonial, index) => ({
                id: `testimonial-${index}`,
                type: 'testimonial' as const,
                content: testimonial,
                section: 'testimonials'
              }))
            ]
          },

          // CONTACT (Izquierda 1) - 5 stories fijos
          {
            sectionName: 'Contacto',
            stories: [
              {
                id: 'contact-title',
                type: 'title',
                content: content.CONTACT_CONTENT,
                section: 'contact'
              },
              {
                id: 'contact-map',
                type: 'content' as const,
                content: {
                  type: 'map',
                  title: 'Ubicación',
                  data: content.CONTACT_INFO
                },
                section: 'contact'
              },
              {
                id: 'contact-clinic',
                type: 'content' as const,
                content: {
                  type: 'clinic',
                  title: 'Clínica',
                  data: content.CONTACT_INFO
                },
                section: 'contact'
              },
              {
                id: 'contact-info',
                type: 'content' as const,
                content: {
                  type: 'info',
                  title: 'Datos de Contacto',
                  data: content.CONTACT_INFO
                },
                section: 'contact'
              },
              {
                id: 'contact-social',
                type: 'content' as const,
                content: {
                  type: 'social',
                  title: 'Redes Sociales',
                  data: content.CONTACT_INFO
                },
                section: 'contact'
              }
            ]
          },

          // GALLERY (Izquierda 2) - 1 + N stories dinámicos
          {
            sectionName: 'Galería',
            stories: [
              {
                id: 'gallery-title',
                type: 'title',
                content: content.GALLERY_CONTENT,
                section: 'gallery'
              },
              ...content.GALLERY_LIST.map((photo, index) => ({
                id: `gallery-photo-${index}`,
                type: 'photo' as const,
                content: photo,
                section: 'gallery'
              }))
            ]
          },

          // ABOUT (Izquierda 3) - 5 stories fijos
          {
            sectionName: 'Sobre Nosotros',
            stories: [
              {
                id: 'about-title',
                type: 'title',
                content: content.ABOUT_CONTENT,
                section: 'about'
              },
              {
                id: 'about-mission',
                type: 'content' as const,
                content: {
                  type: 'mission',
                  title: 'Misión y Visión',
                  data: content.ABOUT_CONTENT
                },
                section: 'about'
              },
              {
                id: 'about-history',
                type: 'content' as const,
                content: {
                  type: 'history',
                  title: 'Historia',
                  data: content.ABOUT_CONTENT
                },
                section: 'about'
              },
              {
                id: 'about-values',
                type: 'content' as const,
                content: {
                  type: 'values',
                  title: 'Valores',
                  data: content.ABOUT_CONTENT
                },
                section: 'about'
              },
              {
                id: 'about-marbles',
                type: 'content' as const,
                content: {
                  type: 'marbles',
                  title: 'Piezas de Mármol',
                  data: content.ABOUT_CONTENT
                },
                section: 'about'
              }
            ]
          }
        ];

        setAllSections(sections);
        setLoading(false);
      } catch (error) {
        console.error('Error loading stories data:', error);
        setLoading(false);
      }
    };

    loadStoriesData();
  }, []);

  // === NAVEGACIÓN DE STORIES ===
  const navigation = useStoriesNavigation(allSections);

  // === ESTADO DE CARGA ===
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e6e3e8]">
        <div className="text-black/40">Cargando historias...</div>
      </div>
    );
  }

  // === RENDERIZADO PRINCIPAL ===
  if (navigation.currentSection && navigation.currentStories.length > 0) {
    return (
      <StoriesContainer
        stories={navigation.currentStories}
        currentStoryIndex={navigation.currentStoryIndex}
        onStoryChange={(index) => navigation.goToStory(navigation.currentSectionIndex, index)}
        sectionName={navigation.currentSection.sectionName}
      />
    );
  }

  // Fallback - Mantener compatibilidad con children temporalmente
  return (
    <div className="min-h-screen bg-[#e6e3e8]">
      {children}
    </div>
  );
};

export default MobileStoriesLayout;
