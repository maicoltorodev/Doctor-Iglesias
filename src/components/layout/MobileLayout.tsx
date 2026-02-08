"use client";

import React, { useRef, useState, useEffect, createContext, useContext } from "react";
import MobileNavbar from "@/components/layout/mobile/Navbar";
import FloatingAction from "@/components/ui/FloatingAction";

// --- Context Definition ---
interface MobileScrollContextType {
    activeIndex: number;
}

const MobileScrollContext = createContext<MobileScrollContextType>({ activeIndex: 0 });

export const useMobileScroll = () => useContext(MobileScrollContext);

// --- Layout Component ---
interface MobileLayoutProps {
    children: React.ReactNode;
    navLinks: any[];
    fabContent: any;
    contactInfo: any;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, navLinks, fabContent, contactInfo }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial Scroll to Hero
    useEffect(() => {
        if (containerRef.current) {
            // Slight delay to ensure content is painted
            setTimeout(() => {
                const heroSection = containerRef.current?.querySelector('#hero');
                if (heroSection) {
                    heroSection.scrollIntoView({ inline: 'start' });
                }
            }, 50);
        }
    }, []);

    const scrollToSection = (id: string) => {
        if (containerRef.current) {
            const section = containerRef.current.querySelector(`#${id}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', inline: 'start' });
            }
        }
    };

    const handleScroll = () => {
        if (!containerRef.current) return;

        const scrollLeft = containerRef.current.scrollLeft;
        const width = window.innerWidth;
        const index = Math.round(scrollLeft / width);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    return (
        <MobileScrollContext.Provider value={{ activeIndex }}>
            <div className="relative h-[100dvh] bg-[#e6e3e8] overflow-hidden">
                <MobileNavbar
                    activeIndex={activeIndex}
                    scrollToSection={scrollToSection}
                    navLinks={navLinks}
                />

                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="relative z-20 h-full flex overflow-hidden snap-x snap-mandatory scrollbar-hide touch-pan-x overscroll-none"
                >
                    {children}
                </div>

                {/* FAB MOVIL */}
                <FloatingAction
                    className="right-6 bottom-6 scale-90"
                    fabContent={fabContent}
                    contactInfo={contactInfo}
                />
            </div>
        </MobileScrollContext.Provider>
    );
};

export default MobileLayout;
