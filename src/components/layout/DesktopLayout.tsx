"use client";

import React, { createContext, useContext } from "react";
import DesktopNavbar from "@/components/layout/desktop/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingAction from "@/components/ui/FloatingAction";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// --- Context Definition ---
// We can expose values from useSmoothScroll/useCustomCursor via Context
// so that Shell components can consume them.
interface DesktopScrollContextType {
    activeIndex: number;
    visibleSections: Record<string, boolean>;
    isLogoHovered: boolean;
    setIsLogoHovered: (v: boolean) => void;
}

const DesktopScrollContext = createContext<DesktopScrollContextType>({
    activeIndex: 0,
    visibleSections: {},
    isLogoHovered: false,
    setIsLogoHovered: () => { }
});

export const useDesktopScroll = () => useContext(DesktopScrollContext);

interface DesktopLayoutProps {
    children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
    const { scrollContainerRef, activeIndex, visibleSections, scrollToSection } = useSmoothScroll();
    const { cursorRef, cursorDotRef, isHovering, setIsHovering, isLogoHovered, setIsLogoHovered } = useCustomCursor();

    return (
        <DesktopScrollContext.Provider value={{
            activeIndex,
            visibleSections,
            isLogoHovered,
            setIsLogoHovered
        }}>
            <div className="relative h-[100dvh] bg-[#e6e3e8] font-sans overflow-hidden select-none">
                <DesktopNavbar activeIndex={activeIndex} scrollToSection={scrollToSection} isLogoHovered={isLogoHovered} />

                <div
                    ref={scrollContainerRef}
                    className="relative z-20 h-full flex overflow-hidden box-border overscroll-none scrollbar-hide"
                >
                    {children}
                </div>

                {/* ELEMENTOS FLOTANTES UI */}
                <CustomCursor cursorState={{ cursorRef, cursorDotRef, isHovering, setIsHovering, isLogoHovered, setIsLogoHovered }} />

                {/* FAB */}
                <FloatingAction />
            </div>
        </DesktopScrollContext.Provider>
    );
};

export default DesktopLayout;
