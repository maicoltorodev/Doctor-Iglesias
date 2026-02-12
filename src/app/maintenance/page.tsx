import React from "react";
import { isMobileDevice } from "@/lib/device";
import MaintenanceDesktop from "@/components/sections/MaintenanceDesktop";
import MaintenanceMobile from "@/components/sections/MaintenanceMobile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Estamos Remodelando | Dr. Jorge Iglesias Márquez",
    description: "Estamos trabajando en una nueva experiencia digital para ti. Próximamente.",
};

export default async function MaintenancePage() {
    const isMobile = await isMobileDevice();

    if (isMobile) {
        return <MaintenanceMobile />;
    }

    return <MaintenanceDesktop />;
}
