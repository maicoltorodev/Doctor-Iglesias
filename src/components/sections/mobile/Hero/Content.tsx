import React from 'react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';

export const HeroBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover object-center">
            <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Guías de Eje Central (Opcional, mantener solo si aporta) */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 opacity-20 pointer-events-none">
            <div className="h-20 w-[1px] bg-black"></div>
            <p className="text-[9px] tracking-[0.6em] uppercase rotate-180 [writing-mode:vertical-lr]">Legado</p>
        </div>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 opacity-20 pointer-events-none">
            <p className="text-[9px] tracking-[0.6em] uppercase [writing-mode:vertical-lr]">Ciencia</p>
            <div className="h-20 w-[1px] bg-black"></div>
        </div>
    </div>
);

export const HeroLogo = () => (
    <div className="relative w-full h-full text-black">
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
    <p className="text-2xl lg:text-5xl font-normal text-black/60 leading-tight tracking-[0.08em] max-w-4xl text-center">
        Expertos en el cuidado de tu piel
    </p>
);

export const HeroCTA = () => (
    <CtaButton
        className="min-w-[280px] lg:min-w-[320px] py-4 lg:py-5 text-base lg:text-lg bg-black hover:bg-black/90 border border-white/10"
        label="Agendar Cita"
    />
);
