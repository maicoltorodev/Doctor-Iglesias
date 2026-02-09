import { db } from "@/db";
import { siteContent, services, galleryItems, results, testimonials } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";

/**
 * SERVICIO DE CONTENIDO - CORAZÓN DEL ISR (Incremental Static Regeneration)
 * 
 * ESTRATEGIA DE RENDIMIENTO: PURE STATIC (Regla #4 - Máxima Prioridad)
 * 
 * FLUJO LÓGICO CRÍTICO:
 * 1. Build time: Se genera contenido estático una sola vez
 * 2. Runtime: Sirve HTML pre-generado (velocidad máxima)
 * 3. CMS changes: Invalidación manual via revalidateTag()
 * 4. Next request: Vuelve a generar estático con datos nuevos
 * 
 * BENEFICIOS:
 * - Velocidad de sitio estático
 * - SEO perfecto (HTML pre-renderizado)
 * - Actualizaciones en tiempo real del CMS
 * - Carga cero en servidor para requests repetidas
 */

/**
 * FUNCIÓN PRINCIPAL DE CACHE ISR
 * 
 * PROPÓSITO: Obtener TODOS los datos del CMS y cachearlos permanentemente
 * TECNOLOGÍA: unstable_cache de Next.js con tags de invalidación
 * 
 * IMPORTANTE: Este fetcher solo corre:
 * - A. En tiempo de build (generación estática)
 * - B. Cuando se invalida manualmente desde el admin CMS
 * 
 * SIN EXPIRACIÓN: revalidate: false (confiamos en invalidación manual)
 */
const getStaticData = unstable_cache(
    async () => {
        // === DATA FETCHING PARALELO ===
        // Promise.all para máxima eficiencia: todas las queries en paralelo
        // Esto reduce tiempo de espera vs queries secuenciales
        const [rawEditorial, rawServices, rawGallery, rawResults, rawTestimonials] = await Promise.all([
            db.select().from(siteContent),                    // Contenido editorial (hero, about, etc)
            db.query.services.findMany({ orderBy: [asc(services.order)] }),  // Servicios ordenados
            db.query.galleryItems.findMany({ orderBy: [asc(galleryItems.order)] }), // Galería ordenada
            db.query.results.findMany({ orderBy: [asc(results.order)] }),        // Casos de éxito ordenados
            db.query.testimonials.findMany({ orderBy: [asc(testimonials.order)] }), // Testimonios ordenados
        ]);

        // === NORMALIZACIÓN DE DATOS ===
        // Convertimos array de editorial a objeto clave-valor para acceso rápido
        // Ej: { hero: {...}, about: {...}, contact: {...} }
        const editorialMap = rawEditorial.reduce((acc, curr) => {
            acc[curr.section] = curr.data;
            return acc;
        }, {} as Record<string, any>);

        // === ESTRUCTURA UNIFICADA ===
        // Retornamos todos los datos en un solo objeto para consistencia
        return {
            editorial: editorialMap,
            services: rawServices,
            gallery: rawGallery,
            results: rawResults.map(item => ({
                // Normalizamos estructura de resultados para consistencia frontend
                title: item.title,
                id: item.caseId,        // Mapeo caseId → id
                before: item.beforeImage,  // Mapeo beforeImage → before
                after: item.afterImage    // Mapeo afterImage → after
            })),
            testimonials: rawTestimonials
        };
    },
    ["site-master-payload"], // Clave única de cache para este dataset
    {
        tags: ["content", "services", "gallery", "results", "testimonials"], // Tags para invalidación selectiva
        // SIN REVALIDACIÓN AUTOMÁTICA - confiamos en invalidación manual del CMS
    }
);

/**
 * FUNCIÓN PÚBLICA PRINCIPAL
 * 
 * PROPÓSITO: Proveer contenido estructurado a todos los componentes
 * USO: Usada en page.tsx (desktop) y mobile/page.tsx
 * 
 * FLUJO:
 * 1. Obtiene datos cacheados (o genera si es primera vez)
 * 2. Normaliza nombres de sección (múltiples keys posibles)
 * 3. Retorna estructura consistente para componentes
 */
export async function getAllContent() {
    const data = await getStaticData();
    const { editorial, services, gallery, results, testimonials } = data;

    // === NORMALIZACIÓN DE SECCIONES ===
    // Helper para obtener contenido con múltiples llaves posibles
    // PROBLEMA: CMS puede cambiar nombres de sección (hero vs hero_content)
    // SOLUCIÓN: Intentar múltiples keys en orden de preferencia
    const getSect = (keys: string[]) => {
        for (const key of keys) {
            if (editorial?.[key]) return editorial[key];
        }
        return {}; // Retornar objeto vacío si no se encuentra nada
    };

    // === ESTRUCTURA FINAL PARA COMPONENTES ===
    // Mapeamos todos los datos a la estructura esperada por los componentes
    return {
        // Navegación y datos globales
        NAV_LINKS: editorial?.nav_links || [],
        CONTACT_INFO: editorial?.contact_info || {},
        COMMON_CONTENT: editorial?.common_content || {},
        
        // Secciones principales con fallback de múltiples keys
        HERO_CONTENT: getSect(['hero', 'hero_content']),
        ABOUT_CONTENT: getSect(['about', 'nosotros', 'about_content']),
        GALLERY_CONTENT: getSect(['gallery_editorial', 'galeria', 'gallery']),
        SERVICES_CONTENT: getSect(['services_editorial', 'servicios', 'services']),
        CONTACT_CONTENT: getSect(['contact_editorial', 'contacto', 'contact']),
        RESULTS_CONTENT: getSect(['results_editorial', 'resultados', 'results']),
        TESTIMONIALS_CONTENT: getSect(['testimonials_editorial', 'testimonios', 'testimonials']),
        
        // Listas de items (directamente de base de datos)
        GALLERY_LIST: gallery || [],
        SERVICES_LIST: services || [],
        RESULTS_LIST: results || [],
        TESTIMONIALS_LIST: testimonials || [],
        
        // Floating Action Button content
        FAB_CONTENT: editorial?.fab || { sectionMessages: {} }
    };
}

/**
 * FUNCIÓN ESPECÍFICA PARA DETALLE DE SERVICIO
 * 
 * PROPÓSITO: Obtener un servicio específico por su slug
 * USO: Páginas de detalle /servicio/[slug]
 * 
 * BENEFICIO: Aprovecha el mismo cache de getStaticData()
 */
export async function getServiceBySlug(slug: string) {
    const data = await getStaticData();
    return data.services.find(service => service.slug === slug);
}
