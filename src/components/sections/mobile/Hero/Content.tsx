import React from 'react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';

export const HeroBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover object-center">
            <source src="/video.mp4" type="video/mp4" />
        </video>
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

export const HeroText = ({ content }: { content: any }) => (
    <p className="text-2xl lg:text-5xl font-normal text-black/60 leading-tight tracking-[0.08em] max-w-4xl text-center">
        {content.slogan.mobile}
    </p>
);

export const HeroCTA = ({ content }: { content: any }) => (
    <CtaButton
        className="min-w-[280px] lg:min-w-[320px] py-4 lg:py-5 text-base lg:text-lg bg-black hover:bg-black/90 border border-white/10"
        label={content.cta}
    />
);
