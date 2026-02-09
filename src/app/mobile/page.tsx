import React from "react";
import MobileStoriesLayout from "@/components/layout/MobileStoriesLayout";
import { getAllContent } from "@/services/contentService";

// PRODUCCIÓN: Renderizado estático para máximo rendimiento
export const dynamic = 'force-static';
export const revalidate = false;

export default async function MobilePage() {
    // Cargar datos del CMS en el servidor
    const content = await getAllContent();

    return (
        <MobileStoriesLayout content={content}>
            {/* MobileStoriesLayout recibe datos pre-cargados */}
        </MobileStoriesLayout>
    );
}
