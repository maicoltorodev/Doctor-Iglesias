
import React from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import DesktopLayout from "@/components/layout/DesktopLayout";

// Mobile Sections (Server Components)
import MobileHero from "@/components/sections/mobile/Hero";
import MobileAbout from "@/components/sections/mobile/About";
import MobileServices from "@/components/sections/mobile/Services";
import MobileResults from "@/components/sections/mobile/Results";
import MobileContact from "@/components/sections/mobile/Contact";

// Desktop Sections (Server Components)
import DesktopHero from "@/components/sections/desktop/Hero";
import DesktopAbout from "@/components/sections/desktop/About";
import DesktopServices from "@/components/sections/desktop/Services";
import DesktopResults from "@/components/sections/desktop/Results";
import DesktopContact from "@/components/sections/desktop/Contact";

import { isMobileDevice } from "@/lib/device";

import DesktopGallery from "@/components/sections/desktop/Gallery";
import DesktopTestimonials from "@/components/sections/desktop/Testimonials";

// This is a Server Component. It does not need 'use client'.
export default async function Page() {
    const isMobile = await isMobileDevice();

    if (isMobile) {
        return (
            <MobileLayout>
                <MobileContact />
                <MobileAbout />
                <MobileHero />
                <MobileServices />
                <MobileResults />
            </MobileLayout>
        );
    }

    return (
        <DesktopLayout>
            <DesktopAbout />
            <DesktopGallery />
            <DesktopContact />
            <DesktopHero />
            <DesktopServices />
            <DesktopResults />
            <DesktopTestimonials />
        </DesktopLayout>
    );
}
