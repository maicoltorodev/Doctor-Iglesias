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
    Smartphone
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
        <div className="space-y-12 pb-20">
            <div className="flex flex-col gap-4">
                <p className="text-white/40 max-w-2xl leading-relaxed">
                    Seleccione una sección para editar su contenido textual. Estos cambios afectan directamente la narrativa y los mensajes clave del sitio.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => {
                    const Icon = iconMap[section.section] || FileText;
                    return (
                        <Link key={section.id} href={`/admin/content/${section.section}`}>
                            <div className="group bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-500 flex flex-col items-center text-center space-y-6">
                                <div className="p-5 rounded-2xl bg-white/5 text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                                    <Icon size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-light tracking-tight capitalize">
                                        {section.section.replace('_', ' ')}
                                    </h3>
                                    <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase font-bold">
                                        Última edición: {section.updatedAt?.toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="pt-4 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                                    Editar Sección <ChevronRight size={14} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
