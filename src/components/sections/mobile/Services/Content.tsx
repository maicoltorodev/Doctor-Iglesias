import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ServicesEditorial = ({ content }: { content: any }) => (
    <div className="editorial-card transition-all duration-700 ease-in-out">
        <div className="editorial-card-inner">
            <div className="w-auto space-y-12">
                <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                        <span className="h-[1px] w-12 bg-black/10"></span>
                        <p className="text-[10px] tracking-[0.6em] uppercase font-bold text-black/30 italic font-serif">{content?.editorial?.subtitle || "Servicios"}</p>
                    </div>
                    <h3 className="text-4xl font-extralight tracking-tighter leading-none text-black whitespace-nowrap">
                        {content?.editorial?.titleLight || "Nuestros"} <br />
                        <span className="font-serif italic text-black/40 tracking-widest uppercase text-2xl">{content?.editorial?.titleBold || "Servicios"}</span>
                    </h3>
                </div>

                <div className="space-y-8 max-w-lg">
                    <p className="text-lg font-serif italic text-black/60 leading-tight">
                        &quot;{content.editorial.description}&quot;
                    </p>
                    <div className="flex items-center space-x-6 pt-4">
                        <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">{content.editorial.footerTag}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

interface ServiceCardContentProps {
    spec: { slug: string; label: string };
    imgSrc: string;
    category?: string;
}

export const ServiceCardContent: React.FC<ServiceCardContentProps> = ({ spec, imgSrc, category = "Especialidad" }) => (
    <Link
        href={`/servicio/${spec.slug}`}
        className="flex-shrink-0 w-60 group relative block"
    >
        <div className="relative aspect-[3/4.5] rounded-[40px] overflow-hidden ring-1 ring-black/10 shadow-premium-levitation transition-all duration-700 ease-in-out">
            <div className="absolute inset-0 z-0">
                <Image
                    src={imgSrc}
                    alt={spec.label}
                    fill
                    sizes="240px"
                    className="object-cover transition-all duration-[2s] saturate-[0.8] brightness-[0.9]"
                    quality={95}
                />
            </div>
        </div>

        <div className="absolute top-[calc(100%+2rem)] left-0 right-0 space-y-3 text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">{category}</p>
            <p className="text-lg font-light text-black/80 leading-tight">{spec.label}</p>
        </div>
    </Link>
);
