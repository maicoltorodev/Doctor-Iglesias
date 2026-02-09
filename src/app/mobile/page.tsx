import React from "react";
import MobileStoriesLayout from "@/components/layout/MobileStoriesLayout";
import { getAllContent } from "@/services/contentService";

// SSR: Permitir acceso a variables de entorno del servidor
export const dynamic = 'force-dynamic';

export default async function MobilePage() {
    // Cargar datos del CMS en el servidor con acceso a variables de entorno
    const content = await getAllContent();

    return (
        <MobileStoriesLayout content={content}>
            {/* MobileStoriesLayout recibe datos pre-cargados */}
        </MobileStoriesLayout>
    );
}
