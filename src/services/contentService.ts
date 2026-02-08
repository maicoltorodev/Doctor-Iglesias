import { db } from "@/db";
import { siteContent, services, galleryItems, results, testimonials } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";

/**
 * ESTRATEGIA DE RENDIMIENTO: PURE STATIC (ISR)
 * Este fetcher solo corre una vez en tiempo de build o cuando se invalida el tag.
 * No tiene tiempo de expiración (revalidate: false) porque confiamos en la invalidación manual del CMS.
 */
const getStaticData = unstable_cache(
    async () => {
        const [rawEditorial, rawServices, rawGallery, rawResults, rawTestimonials] = await Promise.all([
            db.select().from(siteContent),
            db.query.services.findMany({ orderBy: [asc(services.order)] }),
            db.query.galleryItems.findMany({ orderBy: [asc(galleryItems.order)] }),
            db.query.results.findMany({ orderBy: [asc(results.order)] }),
            db.query.testimonials.findMany({ orderBy: [asc(testimonials.order)] }),
        ]);

        const editorialMap = rawEditorial.reduce((acc, curr) => {
            acc[curr.section] = curr.data;
            return acc;
        }, {} as Record<string, any>);

        return {
            editorial: editorialMap,
            services: rawServices,
            gallery: rawGallery,
            results: rawResults.map(item => ({
                title: item.title,
                id: item.caseId,
                before: item.beforeImage,
                after: item.afterImage
            })),
            testimonials: rawTestimonials
        };
    },
    ["site-master-payload"],
    {
        tags: ["content", "services", "gallery", "results", "testimonials"]
        // Eliminado revalidate para que sea PERMANENTE hasta revalidateTag
    }
);

export async function getAllContent() {
    const data = await getStaticData();
    const { editorial, services, gallery, results, testimonials } = data;

    return {
        NAV_LINKS: editorial?.nav_links || [],
        CONTACT_INFO: editorial?.contact_info || {},
        COMMON_CONTENT: editorial?.common_content || {},
        HERO_CONTENT: editorial?.hero || {},
        ABOUT_CONTENT: editorial?.about || {},
        GALLERY_CONTENT: editorial?.gallery_editorial || {},
        GALLERY_LIST: gallery || [],
        SERVICES_CONTENT: editorial?.services_editorial || {},
        CONTACT_CONTENT: editorial?.contact_editorial || {},
        SERVICES_LIST: services || [],
        RESULTS_CONTENT: editorial?.results_editorial || {},
        RESULTS_LIST: results || [],
        TESTIMONIALS_CONTENT: editorial?.testimonials_editorial || {},
        TESTIMONIALS_LIST: testimonials || [],
        FAB_CONTENT: editorial?.fab || { sectionMessages: {} }
    };
}

/**
 * Obtiene un servicio específico por su slug
 */
export async function getServiceBySlug(slug: string) {
    const data = await getStaticData();
    return data.services.find(service => service.slug === slug);
}
