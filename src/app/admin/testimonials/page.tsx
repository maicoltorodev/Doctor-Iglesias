import React from 'react';
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Plus, Edit, Users, Quote } from 'lucide-react';
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
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between">
                <p className="text-white/40 max-w-lg leading-relaxed">
                    Visualice y gestione los testimonios de sus pacientes.
                    Se requiere al menos un testimonio para mantener la sección.
                </p>
                <Link
                    href="/admin/testimonials/new"
                    className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform"
                >
                    <Plus size={18} /> Nuevo Testimonio
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {list.map((t) => (
                    <div key={t.id} className="group bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8 hover:bg-white/[0.08] transition-all relative overflow-hidden">
                        <Quote size={80} className="absolute -top-4 -right-4 text-white/[0.02] rotate-12" />

                        <div className="relative z-10 space-y-6">
                            <p className="text-xl font-light italic text-white/60 leading-relaxed font-serif">
                                &quot;{t.text}&quot;
                            </p>

                            <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold tracking-widest uppercase">{t.name}</h4>
                                    <span className="text-[10px] text-white/20 uppercase tracking-widest">{t.treatment}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/testimonials/${t.id}`} className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                                        <Edit size={16} />
                                    </Link>
                                    <DeleteButton
                                        id={t.id}
                                        onDelete={deleteTestimonial}
                                        label="testimonio"
                                        canDelete={list.length > 1}
                                        disabledMessage="Debe haber al menos un testimonio."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {list.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                    <Users size={48} className="mx-auto text-white/5 mb-4" />
                    <p className="text-white/20">Aún no hay testimonios registrados.</p>
                </div>
            )}
        </div>
    );
}
