"use client";

import React from 'react';
import { useMobileScroll } from '@/components/layout/MobileLayout';

interface AboutShellProps {
    screen1: React.ReactNode;
    screen2: React.ReactNode;
    screen3: React.ReactNode;
}

const AboutShell: React.FC<AboutShellProps> = ({ screen1, screen2, screen3 }) => {
    // Assuming About is index 1
    const { activeIndex } = useMobileScroll();
    const isVisible = activeIndex === 1;

    return (
        <section id="nosotros" className="w-fit h-full flex-shrink-0 relative bg-[#e6e3e8] text-black flex items-center overflow-hidden section-contain">
            <div className="relative z-20 flex items-center h-full">
                <div className="flex flex-row gap-0 items-center">

                    {/* SCREEN 1 */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <div
                            className="flex-shrink-0 w-[85vw] space-y-8 transition-all duration-[1000ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '400ms'
                            }}
                        >
                            {screen1}
                        </div>
                    </div>

                    {/* SCREEN 2 */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <div
                            className="flex-shrink-0 w-60 group transition-all duration-[1000ms]"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: '600ms'
                            }}
                        >
                            {screen2}
                        </div>
                    </div>

                    {/* SCREEN 3 */}
                    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 snap-center">
                        <div id="nosotros-title" className={`flex flex-col items-center justify-center flex-shrink-0 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} w-[85vw]`}>
                            {screen3}
                        </div>
                    </div>

                </div>

                {/* MARBLES */}
                <div className={`absolute inset-0 z-50 pointer-events-none`}>
                    <div className="absolute bottom-0 left-0 w-[160px] h-[65px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-left"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} peer-hover:!-translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-left bg-marble-texture"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-[160px] h-[65px] pointer-events-none">
                        <div className="peer absolute inset-0 pointer-events-auto cursor-pointer z-20 clip-triangle-right"></div>
                        <div className={`absolute inset-0 shadow-architectural-poly transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:100ms] ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} peer-hover:!translate-x-[120%] z-10`}>
                            <div className="absolute inset-0 clip-triangle-right bg-marble-texture"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutShell;
