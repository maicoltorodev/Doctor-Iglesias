"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CtaButton } from '@/components/ui/CtaButton';

// Registrar ScrollTrigger para GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const HeroBackground = () => {
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        // Efecto Parallax Sutil: El video se mueve un poco más lento que el scroll
        gsap.to(videoRef.current, {
            x: "-15%", // Pequeño desplazamiento horizontal relativo
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
                <p className="text-[9px] tracking-[0.8em] uppercase text-black rotate-180 [writing-mode:vertical-lr] font-bold">Legado</p>
            </div>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 opacity-20 pointer-events-none">
                <p className="text-[9px] tracking-[0.8em] uppercase text-black [writing-mode:vertical-lr] font-bold">Ciencia</p>
                <div className="h-24 w-[1px] bg-gradient-to-b from-black to-transparent"></div>
            </div>
        </div>
    );
};

export const HeroLogo = () => (
    <div className="relative w-full h-full">
        <Image
            src="/logo-full.webp"
            alt="Dr. Jorge Iglesias Márquez"
            fill
            className="object-contain"
            priority
            unoptimized={true}
        />
    </div>
);

export const HeroText = () => (
    <div className="overflow-hidden">
        <p className="text-3xl lg:text-5xl font-extralight text-black/70 leading-relaxed tracking-[0.1em] max-w-4xl text-center font-serif italic">
            Excelencia Quirúrgica & <br />
            <span className="font-sans not-italic font-bold text-black tracking-[0.3em] uppercase text-2xl lg:text-4xl">Arte en Dermatología</span>
        </p>
    </div>
);

export const HeroCTA = () => (
    <div className="pointer-events-auto">
        <CtaButton
            className="min-w-[280px] lg:min-w-[340px] px-12 py-5 lg:py-6"
            label="Agendar Cita"
        />
    </div>
);
