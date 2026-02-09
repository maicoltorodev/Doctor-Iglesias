import React from "react";
import MobileStoriesLayout from "@/components/layout/MobileStoriesLayout";

// PRODUCCIÓN: Renderizado estático para máximo rendimiento
export const dynamic = 'force-static';
export const revalidate = false;

export default function MobilePage() {
    return (
        <MobileStoriesLayout>
            {/* MobileStoriesLayout carga los datos del CMS internamente */}
        </MobileStoriesLayout>
    );
}
