import React from 'react';
import Image from 'next/image';
import { EditorialCard } from '@/components/ui/EditorialCard';

export const AboutScreen1 = ({ content }: { content: any }) => (
    <div className="space-y-6">
        <div className="flex items-center space-x-6">
            <span className="h-[1px] w-12 bg-black/20"></span>
            <p className="text-[10px] tracking-[0.6em] uppercase font-bold text-black/40 italic font-serif">{content.subtitle}</p>
        </div>
        <h2 className="text-4xl font-extralight tracking-tighter leading-[0.8] text-black">
            {content.titleLight} <br />
            <span className="font-serif italic text-black/40 tracking-widest uppercase text-2xl">& {content.titleBold}</span>
        </h2>
        <div className="space-y-8 max-w-lg mt-8">
            <p className="text-xl font-serif italic text-black/70 leading-[1.1]">
                &quot;{content.description}&quot;
            </p>
            <div className="h-[1px] w-full bg-gradient-to-r from-black/10 via-black/5 to-transparent"></div>
            <div className="space-y-4">
                <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-black/20">{content.footerTag}</p>
            </div>
        </div>
    </div>
);

export const AboutScreen2 = ({ content }: { content: any }) => (
    <>
        <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation transition-all duration-700 ease-in-out">
            <Image
                src={content.image || "/doctor.webp"}
                alt={content.name || "Doctor"}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-[1.5s]"
                priority
                quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="absolute top-[calc(100%+2rem)] left-0 right-0 space-y-3 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">{content.category}</p>
            <p className="text-lg font-light text-black/80 leading-tight">{content.name}</p>
        </div>
    </>
);

export const AboutScreen3 = ({ content }: { content: any }) => (
    <>
        <EditorialCard
            subtitle={content.subtitle}
            titleLight={content.titleLight}
            titleBold={content.titleBold}
            description={content.description}
            footerTag={content.footerTag}
        />
        <div className="flex items-center mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="animate-guide-left transform">
                <svg width="100" height="80" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/50 overflow-visible">
                    <path d="M48 20L2 20M2 20L20 4M2 20L20 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    </>
);
