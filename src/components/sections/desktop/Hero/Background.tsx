"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_CONTENT } from '@/constants/content';

// Registrar ScrollTrigger para GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const HeroBackground = ({ content }: { content: any }) => {
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        // Efecto Parallax Sutil
        gsap.to(videoRef.current, {
            x: "-15%",
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "left left",
                end: "right left",
                scrub: true,
                horizontal: true
            }
        });
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div ref={videoRef} className="absolute inset-0 w-[120%] h-full scale-110">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center grayscale-[0.2] brightness-90"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Overlay de profundidad */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

            {/* Guías de Eje Central (Refinadas) */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 opacity-20 pointer-events-none">
                <div className="h-24 w-[1px] bg-gradient-to-t from-black to-transparent"></div>
                <p className="text-[9px] tracking-[0.8em] uppercase text-black rotate-180 [writing-mode:vertical-lr] font-bold">{content.sideTexts.left}</p>
            </div>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 opacity-20 pointer-events-none">
                <p className="text-[9px] tracking-[0.8em] uppercase text-black [writing-mode:vertical-lr] font-bold">{content.sideTexts.right}</p>
                <div className="h-24 w-[1px] bg-gradient-to-b from-black to-transparent"></div>
            </div>
        </div>
    );
};
