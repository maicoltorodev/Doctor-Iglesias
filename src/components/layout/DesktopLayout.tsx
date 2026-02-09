"use client";

import React from "react";
import DesktopNavbar from "@/components/layout/desktop/Navbar";
import CustomCursor from "@/components/ui/desktop/CustomCursor";
import DesktopFloatingAction from "@/components/ui/FloatingAction/Desktop";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { DesktopScrollProvider, useDesktopScroll } from "@/components/providers/DesktopScrollProvider";

interface DesktopLayoutProps {
    children: React.ReactNode;
    navLinks: any[];
    heroContent: any;
    fabContent: any;
    contactInfo: any;
}

const LayoutContent: React.FC<Omit<DesktopLayoutProps, 'navLinks'>> = ({
    children,
    heroContent,
    fabContent,
    contactInfo
}) => {
    const context = useDesktopScroll();
    const { activeIndex, isLogoHovered, setIsLogoHovered, navLinks, scrollContainerRef } = context || {
        activeIndex: 3,
        isLogoHovered: false,
        setIsLogoHovered: () => { },
        navLinks: [],
        scrollContainerRef: { current: null }
    };
    const { scrollToSection } = useSmoothScroll();
    const { cursorRef, cursorDotRef, isHovering, setIsHovering } = useCustomCursor();

    return (
        <div className="relative h-[100dvh] bg-[#e6e3e8] font-sans overflow-hidden select-none">
            <DesktopNavbar
                activeIndex={activeIndex}
                scrollToSection={scrollToSection}
                isLogoHovered={isLogoHovered}
                navLinks={navLinks}
                heroContent={heroContent}
            />

            <div
                ref={scrollContainerRef}
                className="relative z-20 h-full flex overflow-hidden box-border overscroll-none scrollbar-hide"
            >
                {children}
            </div>

            {/* ELEMENTOS FLOTANTES UI */}
            <CustomCursor cursorState={{ cursorRef, cursorDotRef, isHovering, setIsHovering, isLogoHovered, setIsLogoHovered }} />

            {/* FAB */}
            <DesktopFloatingAction
                fabContent={fabContent}
                contactInfo={contactInfo}
            />

        </div>
    );
};

const DesktopLayout: React.FC<DesktopLayoutProps> = (props) => {
    return (
        <DesktopScrollProvider navLinks={props.navLinks}>
            <LayoutContent {...props} />
        </DesktopScrollProvider>
    );
};

export default DesktopLayout;
export { useDesktopScroll };

