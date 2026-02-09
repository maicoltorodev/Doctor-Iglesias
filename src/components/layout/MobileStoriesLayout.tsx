"use client";

import React from 'react';
import { StoriesContainer, Story } from '../stories/StoriesContainer';
import { useStoriesNavigation, SectionStories } from '../../hooks/useStoriesNavigation';

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
  content?: any; // Datos pre-cargados del CMS
}

const MobileStoriesLayout: React.FC<MobileStoriesLayoutProps> = ({ children, content }) => {
  // === DATOS DESDE CMS ===
  const [allSections, setAllSections] = React.useState<SectionStories[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Cargar datos del CMS (solo si no vienen como props)
  React.useEffect(() => {
    const loadStoriesData = async () => {
      try {
        // Si vienen datos pre-cargados, usarlos directamente
        if (content) {
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
                ...content.SERVICES_LIST.map((service: any, index: number) => ({
                  id: `service-${index}`,
                  type: 'service' as const,
                  content: service,
                  section: 'services'
                }))
              ]
            },

            // RESULTS (Derecha 2) - 1 + N stories dinámicos
            {
              sectionName: 'Resultados',
              stories: [
                {
                  id: 'results-title',
                  type: 'title',
                  content: content.RESULTS_CONTENT,
                  section: 'results'
                },
                ...content.RESULTS_LIST.map((result: any, index: number) => ({
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
                ...content.TESTIMONIALS_LIST.map((testimonial: any, index: number) => ({
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
                  type: 'content',
                  content: content.CONTACT_INFO?.map || null,
                  section: 'contact'
                },
                {
                  id: 'contact-clinic',
                  type: 'content',
                  content: content.CONTACT_INFO?.clinic || null,
                  section: 'contact'
                },
                {
                  id: 'contact-info',
                  type: 'content',
                  content: content.CONTACT_INFO?.info || null,
                  section: 'contact'
                },
                {
                  id: 'contact-social',
                  type: 'content',
                  content: content.CONTACT_INFO?.social || null,
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
                ...content.GALLERY_LIST.map((photo: any, index: number) => ({
                  id: `photo-${index}`,
                  type: 'photo' as const,
                  content: photo,
                  section: 'gallery'
                }))
              ]
            },

            // ABOUT (Izquierda 3) - 5 stories fijos
            {
              sectionName: 'Nosotros',
              stories: [
                {
                  id: 'about-mission',
                  type: 'content',
                  content: content.ABOUT_CONTENT?.mission || null,
                  section: 'about'
                },
                {
                  id: 'about-history',
                  type: 'content',
                  content: content.ABOUT_CONTENT?.history || null,
                  section: 'about'
                },
                {
                  id: 'about-values',
                  type: 'content',
                  content: content.ABOUT_CONTENT?.values || null,
                  section: 'about'
                },
                {
                  id: 'about-marble',
                  type: 'content',
                  content: content.ABOUT_CONTENT?.marble || null,
                  section: 'about'
                },
                {
                  id: 'about-team',
                  type: 'content',
                  content: content.ABOUT_CONTENT?.team || null,
                  section: 'about'
                }
              ]
            }
          ];

          setAllSections(sections);
          setLoading(false);
          return;
        }

        // Sino, cargarlos del CMS (fallback para desarrollo)
        // NOTA: Este código no debería ejecutarse en producción
        // Los datos siempre vienen desde Server Component
        console.error('MobileStoriesLayout: No content provided - fallback not implemented');
        setLoading(false);
        return;
        
      } catch (error) {
        console.error('Error loading stories data:', error);
        setLoading(false);
      }
    };

    loadStoriesData();
  }, [content]);

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
