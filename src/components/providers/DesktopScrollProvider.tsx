"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";

interface DesktopScrollContextType {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    visibleSections: Record<string, boolean>;
    setVisibleSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    isLogoHovered: boolean;
    setIsLogoHovered: React.Dispatch<React.SetStateAction<boolean>>;
    navLinks: any[];
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const DesktopScrollContext = createContext<DesktopScrollContextType | undefined>(undefined);

export const DesktopScrollProvider = ({ children, navLinks }: { children: React.ReactNode, navLinks: any[] }) => {
    const [activeIndex, setActiveIndex] = useState(3); // Inicio
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <DesktopScrollContext.Provider value={{
            activeIndex,
            setActiveIndex,
            visibleSections,
            setVisibleSections,
            isLogoHovered,
            setIsLogoHovered,
            navLinks,
            scrollContainerRef
        }}>
            {children}
        </DesktopScrollContext.Provider>
    );
};

export const useDesktopScroll = () => {
    return useContext(DesktopScrollContext);
};
