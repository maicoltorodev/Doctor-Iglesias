import React from "react";
import DesktopLayout from "@/components/layout/DesktopLayout";
import DesktopHero from "@/components/sections/desktop/Hero";
import DesktopAbout from "@/components/sections/desktop/About";
import DesktopServices from "@/components/sections/desktop/Services";
import DesktopResults from "@/components/sections/desktop/Results";
import DesktopContact from "@/components/sections/desktop/Contact";
import DesktopGallery from "@/components/sections/desktop/Gallery";
import DesktopTestimonials from "@/components/sections/desktop/Testimonials";

import { getAllContent } from "@/services/contentService";
import "./page.css";

// PRODUCCIÓN: Renderizado estático para máximo rendimiento
// La página se genera una vez y se sirve como HTML pre-renderizado
// Solo se actualiza cuando el CMS dispara revalidateTag()
export const dynamic = 'force-static';
export const revalidate = false;

export default async function DesktopPage() {
    const content = await getAllContent();

    return (
        <DesktopLayout
            navLinks={content.NAV_LINKS}
            heroContent={content.HERO_CONTENT}
            fabContent={content.FAB_CONTENT}
            contactInfo={content.CONTACT_INFO}
        >
            <DesktopAbout content={content.ABOUT_CONTENT} />
            <DesktopGallery content={content.GALLERY_CONTENT} items={content.GALLERY_LIST} />
            <DesktopContact editorial={content.CONTACT_CONTENT} info={content.CONTACT_INFO} />
            <DesktopHero content={content.HERO_CONTENT} />
            <DesktopServices content={content.SERVICES_CONTENT} items={content.SERVICES_LIST} />
            <DesktopResults content={content.RESULTS_CONTENT} items={content.RESULTS_LIST} />
            <DesktopTestimonials content={content.TESTIMONIALS_CONTENT} items={content.TESTIMONIALS_LIST} />
        </DesktopLayout>
    );
}
