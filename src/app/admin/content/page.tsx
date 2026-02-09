import React from 'react';
import { db } from "@/db";
import { siteContent } from "@/db/schema";
import {
    FileText,
    ChevronRight,
    Layers,
    Zap,
    Info,
    Home,
    Briefcase,
    Users,
    Activity,
    Smartphone,
    Sparkles,
    BookOpen,
    ArrowRight,
    PenTool
} from 'lucide-react';
import Link from 'next/link';

// Icon mapping for sections
const iconMap: Record<string, any> = {
    hero: Home,
    about: Info,
    services_editorial: Briefcase,
    gallery_editorial: Layers,
    results_editorial: Activity,
    testimonials_editorial: Users,
    contact_editorial: Smartphone,
    common_content: Zap,
    nav_links: Layers,
    contact_info: Smartphone,
    fab: Zap
};

async function getSections() {
    return await db.select().from(siteContent);
}

export default async function EditorialManagement() {
    const sections = await getSections();

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-1000">
            {/* Main Featured Header Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-black/5 group shadow-2xl shadow-black/5">
                {/* Background Texture elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-marble-texture opacity-10 grayscale pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>

                <div className="relative z-10 p-12 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl">
                            <BookOpen size={24} />
                        </div>
                        <div className="px-4 py-2 rounded-full bg-black/5 border border-black/10 flex items-center gap-2">
                            <PenTool size={12} className="text-black/60" />
                            <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase">Sección Editorial</span>
                        </div>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl font-light tracking-tight text-black leading-[1.1]">
                            Gestión de <br />
                            <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif text-6xl pr-4">Contenido Editorial</span>
                        </h1>
                        <p className="text-xl text-black/50 leading-relaxed font-medium max-w-2xl">
                            Ajuste la narrativa y los mensajes clave de su sitio. Cada palabra define la excelencia de su práctica clínica y el prestigio de su marca.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid Title */}
            <div className="flex items-baseline justify-between pt-4">
                <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">Secciones Disponibles</h3>
                <div className="h-px bg-black/5 flex-1 mx-8"></div>
            </div>

            {/* Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => {
                    const Icon = iconMap[section.section] || FileText;
                    return (
                        <Link key={section.id} href={`/admin/content/${section.section}`} className="group h-full">
                            <div className="bg-white rounded-[2rem] p-8 border-2 border-black/10 shadow-lg shadow-black/[0.02] hover:shadow-[0px_20px_40px_rgba(0,0,0,0.2)] hover:border-black transition-all duration-500 hover:-translate-y-4 relative overflow-hidden h-full flex flex-col justify-between gap-8">
                                {/* Decorative circle */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-black/[0.02] rounded-full blur-2xl group-hover:bg-black/5 transition-all duration-500"></div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-start justify-between">
                                        <div className="p-4 rounded-2xl bg-black/[0.02] group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm border border-black/[0.05]">
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-45">
                                            <ArrowRight size={14} className="text-black/40" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-light tracking-tight text-black capitalize">
                                            {section.section.replace('_', ' ')}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                            <p className="text-[9px] text-black/40 tracking-[0.2em] uppercase font-bold">
                                                En línea y Activo
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-black/5 relative z-10 flex items-center justify-between">
                                    <p className="text-[8px] text-black/30 tracking-widest uppercase font-bold">
                                        Actualizado: {section.updatedAt?.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                    </p>
                                    <span className="text-[10px] font-bold text-black group-hover:underline underline-offset-4 decoration-black/20 decoration-2 transition-all">
                                        Editar →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
