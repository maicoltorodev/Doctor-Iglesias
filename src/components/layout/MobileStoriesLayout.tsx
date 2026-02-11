"use client";

import React from 'react';
import { StoriesContainer, Story } from '../stories/StoriesContainer';
import { useStoriesNavigation, SectionStories, getSectionDisplayName } from '../../hooks/useStoriesNavigation';

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
            // ABOUT (Extremo Izquierda)
            {
              sectionName: 'Nosotros',
              stories: [
                {
                  id: 'about-doctor',
                  type: 'service',
                  content: content.ABOUT_CONTENT?.doctor || null,
                  section: 'about'
                },
                {
                  id: 'about-experience',
                  type: 'content',
                  content: content.ABOUT_CONTENT?.experience || null,
                  section: 'about'
                },
                {
                  id: 'about-philosophy',
                  type: 'content',
                  content: content.ABOUT_CONTENT?.philosophy || null,
                  section: 'about'
                },
                {
                  id: 'about-title',
                  type: 'title',
                  content: content.ABOUT_CONTENT?.editorial || null,
                  section: 'about'
                }
              ]
            },

            // GALLERY (Izquierda)
            {
              sectionName: 'Galería',
              stories: [
                ...[...content.GALLERY_LIST].map((photo: any, index: number) => ({
                  id: `photo-${index}`,
                  type: 'photo' as const,
                  content: photo,
                  section: 'gallery'
                })),
                {
                  id: 'gallery-title',
                  type: 'title',
                  content: content.GALLERY_CONTENT,
                  section: 'gallery'
                }
              ]
            },

            // CONTACT (Cerca del centro Izquierda)
            {
              sectionName: 'Contacto',
              stories: [
                {
                  id: 'contact-social',
                  type: 'content',
                  content: {
                    type: 'social',
                    title: 'Canales Digitales',
                    data: {
                      socials: content.CONTACT_INFO?.socials || []
                    }
                  },
                  section: 'contact'
                },
                {
                  id: 'contact-info',
                  type: 'content',
                  content: {
                    type: 'info',
                    category: 'Atención Directa',
                    title: 'Contacto',
                    data: {
                      address: content.CONTACT_INFO?.address,
                      phone: content.CONTACT_INFO?.phone,
                      email: content.CONTACT_INFO?.email
                    }
                  },
                  section: 'contact'
                },
                {
                  id: 'contact-clinic',
                  type: 'content',
                  content: {
                    type: 'clinic',
                    category: content.CONTACT_CONTENT?.cards?.clinic?.category,
                    title: content.CONTACT_CONTENT?.cards?.clinic?.title,
                    data: {
                      clinicImage: '/clinica.webp'
                    }
                  },
                  section: 'contact'
                },
                {
                  id: 'contact-map',
                  type: 'content',
                  content: {
                    type: 'map',
                    title: content.CONTACT_CONTENT?.cards?.map?.title,
                    data: {
                      embedUrl: content.CONTACT_INFO?.mapEmbedUrl
                    }
                  },
                  section: 'contact'
                },
                {
                  id: 'contact-title',
                  type: 'title',
                  content: content.CONTACT_CONTENT,
                  section: 'contact'
                }
              ]
            },

            // INICIO (NÚCLEO CENTRAL) - Index 3
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

            // SERVICES (Derecha)
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
                  content: {
                    ...service,
                    category: content.SERVICES_CONTENT?.cards?.category,
                    overlayTag: content.SERVICES_CONTENT?.cards?.overlayTag,
                    title: service.label
                  },
                  section: 'services'
                }))
              ]
            },

            // RESULTS (Más a la derecha)
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
                  type: 'result' as const,
                  content: {
                    ...result,
                    comparison: content.RESULTS_CONTENT.comparison
                  },
                  section: 'results'
                }))
              ]
            },

            // TESTIMONIALS (Extremo Derecha)
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

  // === NAVEGACIÓN DE STORIES (LISTA PLANA) ===
  const allStories = React.useMemo(() => {
    return allSections.flatMap(section => section.stories);
  }, [allSections]);

  const initialStoryIndex = React.useMemo(() => {
    // Buscar primero por tipo 'hero' (estándar)
    let idx = allStories.findIndex(s => s.type === 'hero');
    // Fallback: buscar por sección 'hero'
    if (idx === -1) idx = allStories.findIndex(s => s.section === 'hero');
    return idx;
  }, [allStories]);

  const navigation = useStoriesNavigation(allStories, initialStoryIndex !== -1 ? initialStoryIndex : 0);

  // === ESTADO DE CARGA ===
  if (loading || allStories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e6e3e8]">
        <div className="text-black/40">Cargando historias...</div>
      </div>
    );
  }

  // === RENDERIZADO PRINCIPAL ===
  const sectionStories = allStories.filter(s => s.section === navigation.currentStory?.section);
  const storyInSectionIndex = sectionStories.findIndex(s => s.id === navigation.currentStory?.id);

  return (
    <StoriesContainer
      stories={sectionStories} // Solo pasamos las necesarias para el progreso visual interno
      currentStory={navigation.currentStory}
      currentStoryIndex={storyInSectionIndex}
      onNext={() => navigation.nextStory()}
      onPrev={() => navigation.previousStory()}
      onHomeClick={() => navigation.goToSection('hero')}
      onSectionClick={(index) => {
        const sectionName = allSections[index].stories[0].section;
        navigation.goToSection(sectionName);
      }}
      allSections={allSections.map((s, i) => ({ name: s.sectionName, index: i }))}
      currentSectionIndex={allSections.findIndex(s => s.stories.some(st => st.id === navigation.currentStory?.id))}
      sectionName={getSectionDisplayName(navigation.sectionName)}
    />
  );
};

export default MobileStoriesLayout;
