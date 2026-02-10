import React from 'react';
import Image from 'next/image';
import { SERVICE_DETAIL_CONTENT, COMMON_CONTENT } from '@/constants/content';
import MobileFloatingAction from "@/components/ui/FloatingAction/Mobile";
import { CtaButton } from '@/components/ui/mobile/CtaButton';
import { Clock, Activity, Calendar, Sparkles } from 'lucide-react';
import { MobileServiceHeader } from '@/components/layout/mobile/ServiceHeader';
import { Accordion } from '@/components/ui/mobile/Accordion';

interface Service {
    id: number;
    label: string;
    slug: string;
    description: string;
    image: string;
    specs?: {
        duration: { value: string; sub: string };
        recovery: { value: string; sub: string };
        frequency: { value: string; sub: string };
        result: { value: string; sub: string };
    };
    benefits: string[];
    faqs: { question: string; answer: string }[];
}

interface MobileServiceDetailProps {
    service: Service;
    fabContent: any;
    contactInfo: any;
}

export default function MobileServiceDetail({ service, fabContent, contactInfo }: MobileServiceDetailProps) {
    const faqs = service.faqs || [];

    return (
        <main className="min-h-[100dvh] bg-[#f2f0f4] relative flex flex-col selection:bg-black/10 selection:text-black">

            {/* Texture Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.3] bg-[url('/noise.png')] mix-blend-overlay"></div>

            {/* Header / Navigation (Client Island) */}
            <MobileServiceHeader />

            {/* Scrollable Content */}
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-24 pb-32 px-6 space-y-12">

                {/* HERO SECTION MOBILE (Static) */}
                <section className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 opacity-40">
                            <span className="h-[1px] w-8 bg-black"></span>
                            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-black">{SERVICE_DETAIL_CONTENT.badges.protocol}</p>
                        </div>
                        <h1 className="text-5xl font-extralight tracking-tighter leading-[0.9] text-black">
                            {service.label}
                        </h1>
                        <p className="text-lg font-serif italic text-black/50 leading-relaxed border-l border-black/10 pl-5">
                            "{service.description}"
                        </p>
                    </div>

                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={service.image}
                            alt={service.label}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/70 block mb-1">
                                {SERVICE_DETAIL_CONTENT.cardLabels.category}
                            </span>
                            <p className="text-white text-sm font-serif italic">Cod. {service.id.toString().padStart(3, '0')}</p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <CtaButton label={SERVICE_DETAIL_CONTENT.cta} className="w-full py-5 shadow-xl" />
                    </div>
                </section>

                {/* SPECS GRID MOBILE (Static) */}
                <section className="grid grid-cols-2 gap-3">
                    {[
                        { icon: Clock, label: "Duración", value: service.specs?.duration.value },
                        { icon: Activity, label: "Recuperación", value: service.specs?.recovery.value },
                        { icon: Calendar, label: "Frecuencia", value: service.specs?.frequency.value },
                        { icon: Sparkles, label: "Resultado", value: service.specs?.result.value }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white/50 backdrop-blur-md border border-white/60 rounded-xl p-5 flex flex-col items-center text-center space-y-2"
                        >
                            <item.icon size={16} className="text-black/40" />
                            <span className="text-[8px] tracking-widest uppercase font-bold text-black/30">{item.label}</span>
                            <span className="text-base font-light text-black">{item.value}</span>
                        </div>
                    ))}
                </section>

                {/* BENEFITS MOBILE (Static) */}
                <section className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-[9px] tracking-[0.4em] uppercase font-extrabold text-black/30 block mb-1">{SERVICE_DETAIL_CONTENT.benefits.subtitle}</span>
                        <h2 className="text-4xl font-light text-black">
                            {SERVICE_DETAIL_CONTENT.benefits.titleLight} <span className="font-serif italic text-black/40">{SERVICE_DETAIL_CONTENT.benefits.titleBold}</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {service.benefits.map((benefit, i) => (
                            <div
                                key={i}
                                className="bg-white/40 border border-white/60 p-5 rounded-xl flex items-center space-x-4"
                            >
                                <span className="text-xs font-serif italic text-black/20">0{i + 1}</span>
                                <span className="text-sm font-light text-black">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ MOBILE (Client Island) */}
                <section className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-black/30">{SERVICE_DETAIL_CONTENT.faq.subtitle}</span>
                        <h2 className="text-3xl font-light text-black">{SERVICE_DETAIL_CONTENT.faq.titleLight} <span className="font-serif italic text-black/40">{SERVICE_DETAIL_CONTENT.faq.titleBold}</span></h2>
                    </div>
                    <Accordion items={faqs} />
                </section>

                {/* FOOTER MOBILE (Static) */}
                <footer className="pt-12 pb-8 flex flex-col items-center space-y-10 border-t border-black/5">
                    <div className="text-center space-y-4">
                        <span className="text-[9px] tracking-[0.5em] uppercase font-bold text-black/20">{COMMON_CONTENT.legacyTag}</span>
                        <Image src="/logo.webp" alt="Logo" width={100} height={25} className="opacity-20 grayscale" />
                    </div>
                    <div className="flex flex-col items-center opacity-10 space-y-1">
                        <span className="text-[7px] tracking-widest font-bold text-black uppercase">{COMMON_CONTENT.copyright} 2026 ®</span>
                        <span className="text-[7px] tracking-widest font-serif italic font-bold text-black uppercase">{COMMON_CONTENT.allRightsReserved}</span>
                    </div>
                </footer>
            </div>

            {/* Client Components that remain at the bottom/top of the tree */}
            <MobileFloatingAction
                className="right-6 bottom-6 scale-90"
                fabContent={fabContent}
                contactInfo={contactInfo}
            />
        </main>
    );
}
