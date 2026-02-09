import React from 'react';
import Image from 'next/image';
import { SERVICE_DETAIL_CONTENT, COMMON_CONTENT } from '@/constants/content';
import { ServiceCursor } from "@/components/ui/ServiceCursor";
import FloatingAction from "@/components/ui/FloatingAction";
import { CtaButton } from '@/components/ui/CtaButton';
import { Clock, Activity, Calendar, Sparkles } from 'lucide-react';
import { Obra } from '@/components/ui/desktop/Obra';
import { BackLink } from '@/components/ui/BackLink';
import { MarbleBackground } from '@/components/layout/desktop/MarbleBackground';
import { Accordion } from '@/components/ui/Accordion';

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

interface DesktopServiceDetailProps {
    service: Service;
    fabContent: any;
    contactInfo: any;
}

export default function DesktopServiceDetail({ service, fabContent, contactInfo }: DesktopServiceDetailProps) {
    const imgSrc = service.image || "/imagen-ph-1.webp";
    const faqs = service.faqs || [];

    return (
        <main className="h-screen w-full bg-[#f2f0f4] relative overflow-hidden flex flex-col selection:bg-black/10 selection:text-black">

            {/* Texture Overlay (Noise) - Static */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden text-black">
                <div className="absolute inset-0 opacity-[0.4] bg-[url('/noise.png')] mix-blend-overlay"></div>
            </div>

            {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Client Island) */}
            <MarbleBackground />

            {/* CONTENIDO CENTRAL SCROLLEABLE */}
            <div
                className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden z-30 scrollbar-hide relative box-border"
                data-lenis-prevent="true"
            >
                {/* BARRA DE NAVEGACIÓN SUPERIOR (Client Component used as island) */}
                <div className="absolute top-8 lg:top-12 left-0 right-0 z-[60] flex items-center justify-center px-8 lg:px-20 pointer-events-none">
                    <BackLink />
                </div>

                <section className="min-h-screen flex flex-col items-center justify-center px-8 lg:px-20 max-w-7xl w-full mx-auto relative pt-40 lg:pt-0">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                        {/* COLUMNA IZQUIERDA: TITULAR Y DESCRIPCIÓN */}
                        <div className="lg:col-span-7 space-y-12 lg:pr-12">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 opacity-40">
                                    <span className="h-[1px] w-12 bg-black"></span>
                                    <p className="text-[10px] tracking-[0.6em] uppercase font-bold italic font-serif text-black">{SERVICE_DETAIL_CONTENT.badges.protocol}</p>
                                </div>
                                <h1 className="relative">
                                    <span className="text-6xl lg:text-[100px] xl:text-[130px] font-extralight tracking-tighter leading-[0.8] text-black block">
                                        {service.label}
                                    </span>
                                    <span className="font-serif italic text-black/25 tracking-[0.2em] uppercase text-xl lg:text-[40px] xl:text-[50px] block mt-4 lg:mt-8">
                                        Excelencia <span className="text-black/10">/</span> Médica
                                    </span>
                                </h1>
                            </div>

                            <div className="space-y-10">
                                <p className="text-xl lg:text-2xl font-serif italic text-black/50 leading-relaxed max-w-xl border-l border-black/10 pl-8">
                                    "{service.description}"
                                </p>

                                <div className="flex items-center space-x-8 pt-4">
                                    <CtaButton label={SERVICE_DETAIL_CONTENT.cta} className="min-w-[260px] py-6 shadow-xl" />
                                    <div className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-black/10 to-transparent"></div>
                                </div>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: IMAGEN PRINCIPAL */}
                        <div className="lg:col-span-5 relative">
                            <div className="absolute -inset-10 border border-black/[0.03] rounded-full rotate-45 pointer-events-none"></div>

                            <div className="relative z-10 scale-105 lg:scale-110 translate-x-4 lg:translate-x-12">
                                <Obra
                                    src={imgSrc}
                                    alt={service.label}
                                    category={SERVICE_DETAIL_CONTENT.cardLabels.category}
                                    title={service.label}
                                    overlayTitle={SERVICE_DETAIL_CONTENT.cardLabels.overlayTitle}
                                    overlayDescription={SERVICE_DETAIL_CONTENT.cardLabels.overlayDescription}
                                    overlayTag={SERVICE_DETAIL_CONTENT.cardLabels.overlayTag}
                                    hideInfo={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20">
                        <div className="w-[1px] h-16 bg-gradient-to-b from-black to-transparent"></div>
                    </div>
                </section>

                {/* 2. BARRA DE DATOS CLÍNICOS */}
                <section className="w-full py-12 lg:py-24 relative z-40">
                    <div className="max-w-7xl mx-auto px-6 lg:px-20">
                        <div className="text-center mb-12 opacity-40">
                            <span className="text-[9px] tracking-[0.6em] uppercase font-bold">{SERVICE_DETAIL_CONTENT.badges.technical}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {[
                                { icon: Clock, label: "Duración", value: service.specs?.duration.value, sub: service.specs?.duration.sub },
                                { icon: Activity, label: "Recuperación", value: service.specs?.recovery.value, sub: service.specs?.recovery.sub },
                                { icon: Calendar, label: "Frecuencia", value: service.specs?.frequency.value, sub: service.specs?.frequency.sub },
                                { icon: Sparkles, label: "Resultado", value: service.specs?.result.value, sub: service.specs?.result.sub }
                            ].map((item, i) => (
                                <div key={i} className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 hover:bg-white/60 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                        <div className="w-10 h-10 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-black/60 group-hover:text-black group-hover:scale-110 transition-all duration-500 mb-2">
                                            <item.icon strokeWidth={1.5} size={18} />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-black/40 block mb-1">{item.label}</span>
                                            <span className="text-2xl lg:text-3xl font-light text-black block tracking-tight group-hover:tracking-normal transition-all duration-500">{item.value}</span>
                                        </div>
                                        <div className="w-8 h-[1px] bg-black/10 group-hover:w-16 transition-all duration-500"></div>
                                        <span className="text-xs font-serif italic text-black/50 group-hover:text-black/70 transition-colors">
                                            {item.sub}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. SECCIÓN DE BENEFICIOS */}
                <section className="w-full max-w-7xl mx-auto py-24 lg:py-40 px-8 lg:px-20 relative z-30">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                        <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-10">
                            <div>
                                <span className="text-[10px] tracking-[0.5em] uppercase font-extrabold text-black/30 block mb-6">{SERVICE_DETAIL_CONTENT.benefits.subtitle}</span>
                                <h2 className="text-5xl lg:text-7xl font-light text-black leading-[0.9]">
                                    {SERVICE_DETAIL_CONTENT.benefits.titleLight} <br />
                                    <span className="font-serif italic text-black/40 relative">
                                        {SERVICE_DETAIL_CONTENT.benefits.titleBold}
                                        <span className="absolute -bottom-2 left-0 w-24 h-[2px] bg-black/10"></span>
                                    </span>
                                </h2>
                            </div>
                            <p className="text-black/60 text-sm leading-relaxed max-w-[300px] font-medium border-l-2 border-black/5 pl-6">
                                {SERVICE_DETAIL_CONTENT.benefits.description}
                            </p>
                        </div>

                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-8">
                            {service.benefits.map((benefit: string, i: number) => (
                                <div
                                    key={i}
                                    className="group relative bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/50 hover:border-white/60 p-8 lg:p-10 rounded-2xl transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden"
                                >
                                    <span className="absolute top-2 right-4 text-6xl font-serif italic text-black/[0.03] group-hover:text-black/[0.06] transition-colors duration-500 scale-150 origin-top-right">
                                        0{i + 1}
                                    </span>
                                    <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black group-hover:scale-150 transition-all duration-500"></div>
                                            <div className="h-[1px] w-8 bg-black/10 group-hover:w-16 transition-all duration-500"></div>
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-light text-black leading-tight group-hover:translate-x-1 transition-transform duration-500">
                                            {benefit}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. PREGUNTAS FRECUENTES (Client Island) */}
                <section className="w-full py-20 lg:py-32 relative z-30">
                    <div className="max-w-4xl mx-auto px-8 lg:px-20">
                        <div className="text-center mb-16 space-y-4">
                            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/30">{SERVICE_DETAIL_CONTENT.faq.subtitle}</span>
                            <h2 className="text-3xl lg:text-5xl font-light text-black">{SERVICE_DETAIL_CONTENT.faq.titleLight} <span className="font-serif italic text-black/40">{SERVICE_DETAIL_CONTENT.faq.titleBold}</span></h2>
                        </div>
                        <Accordion items={faqs} />
                    </div>
                </section>

                {/* FOOTER - Static */}
                <footer className="w-full pb-32 pt-12 flex flex-col items-center justify-center relative">
                    <div className="w-20 h-[1px] bg-black/10 mb-20"></div>
                    <div className="text-center space-y-4">
                        <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-black/20 block">{COMMON_CONTENT.legacyTag}</span>
                        <div className="h-10 opacity-20 grayscale brightness-0 flex justify-center">
                            <Image src="/logo.webp" alt="Signature" width={120} height={30} className="object-contain" />
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col items-center opacity-10 space-y-2">
                        <span className="text-[8px] tracking-widest font-bold text-black uppercase">{COMMON_CONTENT.copyright} 2026 ®</span>
                        <span className="text-[8px] tracking-widest font-serif italic font-bold text-black uppercase">{COMMON_CONTENT.allRightsReserved}</span>
                    </div>
                </footer>
            </div>

            {/* CURSOR (Client Island) */}
            <ServiceCursor />

            {/* FAB (Client component) */}
            <FloatingAction
                className="left-10"
                fabContent={fabContent}
                contactInfo={contactInfo}
            />
        </main>
    );
}
