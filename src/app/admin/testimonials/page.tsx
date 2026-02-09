import React from 'react';
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
    Plus,
    Edit,
    Users,
    Quote,
    Sparkles,
    MessageSquare,
    Star,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { DeleteButton } from '../components/DeleteButton';
import { deleteTestimonial } from '../actions';

async function getTestimonials() {
    return await db.query.testimonials.findMany({
        orderBy: [asc(testimonials.order)]
    });
}

export default async function TestimonialsManagement() {
    const list = await getTestimonials();

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-1000">
            {/* Main Featured Header Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-black/10 group shadow-2xl shadow-black/5">
                {/* Background Texture elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-marble-texture opacity-10 grayscale pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>

                <div className="relative z-10 p-12 space-y-8">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl">
                                <MessageSquare size={28} strokeWidth={1.5} />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-black/5 border border-black/10 flex items-center gap-2">
                                <Sparkles size={12} className="text-black/60" />
                                <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase">Voz del Paciente</span>
                            </div>
                        </div>
                        <Link
                            href="/admin/testimonials/new"
                            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-all shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                        >
                            <Plus size={18} strokeWidth={3} /> Nuevo Testimonio
                        </Link>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl font-light tracking-tight text-black leading-[1.1]">
                            Gestión de <br />
                            <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif text-6xl pr-4">Testimonios Reales</span>
                        </h1>
                        <p className="text-xl text-black/50 leading-relaxed font-medium max-w-2xl">
                            La confianza se construye con palabras. Administre las experiencias compartidas por sus pacientes para fortalecer la credibilidad de su clínica.
                        </p>
                    </div>
                </div>
            </div>

            {/* List Header/Actions */}
            <div className="flex items-baseline justify-between pt-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">Reseñas Registradas</h3>
                    <span className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold text-black/60">{list.length}</span>
                </div>
                <div className="h-px bg-black/5 flex-1 mx-8"></div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {list.map((t) => (
                    <div
                        key={t.id}
                        className="group bg-white border-2 border-black/10 rounded-[2.5rem] p-10 shadow-xl shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.15)] hover:border-black transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                    >
                        {/* Decorative Quote Mark */}
                        <Quote size={120} className="absolute -top-6 -right-6 text-black/[0.03] rotate-12 group-hover:text-black/[0.06] transition-all duration-700" />

                        <div className="relative z-10 space-y-8">
                            {/* Stars / Metadata */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-1 text-black/20 group-hover:text-black/80 transition-colors duration-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill="currentColor" stroke="none" />
                                    ))}
                                </div>
                                <span className="text-[9px] font-bold text-black/20 tracking-widest uppercase italic">Orden {(t.order ?? 0).toString().padStart(2, '0')}</span>
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-2xl font-light italic text-black/70 leading-relaxed font-serif group-hover:text-black transition-colors duration-500 line-clamp-4">
                                &quot;{t.text}&quot;
                            </p>

                            {/* Author & Actions Area */}
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-black/5 pt-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                                            <span className="text-[10px] font-bold">{t.name.split(' ').map(n => n[0]).join('')}</span>
                                        </div>
                                        <h4 className="text-sm font-bold tracking-widest uppercase text-black">{t.name}</h4>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] border border-black/5 w-fit">
                                        <CheckCircle2 size={10} className="text-emerald-600" />
                                        <span className="text-[9px] text-black/40 font-bold uppercase tracking-wider">{t.treatment}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/testimonials/${t.id}`}
                                        className="p-4 rounded-2xl bg-black/5 text-black/40 hover:text-white hover:bg-black transition-all shadow-sm border border-black/5"
                                        title="Editar Testimonio"
                                    >
                                        <Edit size={20} strokeWidth={2} />
                                    </Link>
                                    <div className="scale-110">
                                        <DeleteButton
                                            id={t.id}
                                            onDelete={deleteTestimonial}
                                            label="testimonio"
                                            canDelete={list.length > 1}
                                            disabledMessage="Debe haber al menos un testimonio registrado."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {list.length === 0 && (
                <div className="py-24 text-center space-y-8 bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem]">
                    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black/20">
                        <Users size={40} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-light text-black/40 italic">Aún no hay testimonios de pacientes.</p>
                        <p className="text-xs text-black/20 uppercase tracking-widest font-bold">La confianza de sus pacientes es su mejor carta de presentación.</p>
                    </div>
                    <Link
                        href="/admin/testimonials/new"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
                    >
                        <Plus size={18} /> Crear Testimonio
                    </Link>
                </div>
            )}
        </div>
    );
}
