import React from 'react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';

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
        <div className="text-3xl lg:text-5xl font-extralight text-black/70 leading-relaxed tracking-[0.1em] max-w-4xl text-center font-serif italic">
            {content.slogan.italic} <br />
            <span className="font-sans not-italic font-bold text-black tracking-[0.3em] uppercase text-2xl lg:text-4xl">{content.slogan.bold}</span>
        </div>
    </div>
);

export const HeroCTA = ({ content }: { content: any }) => (
    <div className="pointer-events-auto">
        <CtaButton
            className="min-w-[280px] lg:min-w-[340px] px-12 py-5 lg:py-6"
            label={content.cta}
        />
    </div>
);
