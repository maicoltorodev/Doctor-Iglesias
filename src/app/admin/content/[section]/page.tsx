import React from 'react';
import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from 'next/navigation';
import EditorialForm from '../../components/EditorialForm';
import { ChevronLeft, Edit3, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SectionPageProps {
    params: Promise<{
        section: string;
    }>;
}

export default async function SectionEditPage({ params }: SectionPageProps) {
    const { section: sectionName } = await params;

    const data = await db.query.siteContent.findFirst({
        where: eq(siteContent.section, sectionName)
    });

    if (!data) {
        notFound();
    }

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-1000">
            {/* Header Master */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-black/10 group shadow-2xl shadow-black/5">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-marble-texture opacity-10 grayscale pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>

                <div className="relative z-10 p-12 space-y-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <div className="space-y-6">
                        <Link
                            href="/admin/content"
                            className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors text-xs font-bold uppercase tracking-widest group/back"
                        >
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Volver a Editorial
                        </Link>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Edit3 size={14} className="text-black/40" />
                                <span className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">Editor de Sección</span>
                            </div>
                            <h1 className="text-5xl font-light tracking-tight text-black capitalize leading-[1.1]">
                                <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif pr-4">
                                    {sectionName.replace('_', ' ')}
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <EditorialForm
                section={sectionName}
                initialData={data.data}
            />
        </div>
    );
}
