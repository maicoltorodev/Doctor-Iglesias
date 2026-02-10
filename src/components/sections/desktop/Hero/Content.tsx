import React from 'react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/desktop/CtaButton';

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

export const HeroText = ({ content }: { content: any }) => (
    <div className="overflow-hidden">
        <div className="text-xl lg:text-3xl font-extralight text-white/70 leading-relaxed tracking-[0.2em] max-w-5xl text-center font-serif italic uppercase">
            {content.slogan.text}
        </div>
    </div>
);

export const HeroCTA = ({ content }: { content: any }) => (
    <div className="pointer-events-auto">
        <CtaButton
            className="min-w-[280px] lg:min-w-[340px] px-12 py-5 lg:py-6"
            label={content.cta}
            isAutoShimmer={true}
        />
    </div>
);
