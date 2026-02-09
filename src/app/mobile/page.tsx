import React from "react";
import MobileStoriesLayout from "@/components/layout/MobileStoriesLayout";
import MobileHero from "@/components/sections/mobile/Hero";
import MobileAbout from "@/components/sections/mobile/About";
import MobileServices from "@/components/sections/mobile/Services";
import MobileResults from "@/components/sections/mobile/Results";
import MobileContact from "@/components/sections/mobile/Contact";
import MobileGallery from "@/components/sections/mobile/Gallery";
import MobileTestimonials from "@/components/sections/mobile/Testimonials";

import { getAllContent } from "@/services/contentService";

// PRODUCCIÓN: Renderizado estático para máximo rendimiento
// La página se genera una vez y se sirve como HTML pre-renderizado
// Solo se actualiza cuando el CMS dispara revalidateTag()
export const dynamic = 'force-static';
export const revalidate = false;

export default async function MobilePage() {
    const content = await getAllContent();

    return (
        <MobileStoriesLayout>
            {/* Los componentes individuales ahora se renderizan dentro del sistema de stories */}
            <MobileHero content={content.HERO_CONTENT} />
            <MobileAbout content={content.ABOUT_CONTENT} />
            <MobileGallery content={content.GALLERY_CONTENT} items={content.GALLERY_LIST} />
            <MobileContact editorial={content.CONTACT_CONTENT} info={content.CONTACT_INFO} />
            <MobileServices content={content.SERVICES_CONTENT} items={content.SERVICES_LIST} />
            <MobileResults content={content.RESULTS_CONTENT} items={content.RESULTS_LIST} />
            <MobileTestimonials content={content.TESTIMONIALS_CONTENT} items={content.TESTIMONIALS_LIST} />
        </MobileStoriesLayout>
    );
}
