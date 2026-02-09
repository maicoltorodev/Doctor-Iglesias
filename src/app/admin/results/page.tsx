import React from 'react';
import { db } from "@/db";
import { results } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
    Plus,
    Edit,
    Activity,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteButton } from '../components/DeleteButton';
import { deleteResult } from '../actions';

async function getResults() {
    return await db.query.results.findMany({
        orderBy: [asc(results.order)]
    });
}

export default async function ResultsManagement() {
    const list = await getResults();

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-1000">
            {/* Main Featured Header Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-black/5 group shadow-2xl shadow-black/5">
                {/* Background Texture elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-marble-texture opacity-10 grayscale pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>

                <div className="relative z-10 p-12 space-y-8">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl">
                                <CheckCircle2 size={28} strokeWidth={1.5} />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-black/5 border border-black/10 flex items-center gap-2">
                                <Sparkles size={12} className="text-black/60" />
                                <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase">Casos Clínicos</span>
                            </div>
                        </div>
                        <Link
                            href="/admin/results/new"
                            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-all shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                        >
                            <Plus size={18} strokeWidth={3} /> Nuevo Caso
                        </Link>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl font-light tracking-tight text-black leading-[1.1]">
                            Gestión de <br />
                            <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif text-6xl pr-4">Casos de Éxito</span>
                        </h1>
                        <p className="text-xl text-black/50 leading-relaxed font-medium max-w-2xl">
                            Documentación de la transformación. Muestre el impacto real de su excelencia médica a través de comparativas visuales de alta precisión.
                        </p>
                    </div>
                </div>
            </div>

            {/* List Header/Actions */}
            <div className="flex items-baseline justify-between pt-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">Casos Registrados</h3>
                    <span className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold text-black/60">{list.length}</span>
                </div>
                <div className="h-px bg-black/5 flex-1 mx-8"></div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {list.map((result) => (
                    <div
                        key={result.id}
                        className="group bg-white border-2 border-black/10 rounded-[2.5rem] p-8 shadow-xl shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.15)] hover:border-black transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                    >
                        {/* Header Info */}
                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-black rounded-lg text-[10px] font-bold text-white tracking-widest uppercase">
                                        Caso {(result.order ?? 0).toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-black/30 uppercase">
                                        ID: {result.caseId}
                                    </span>
                                </div>
                                <h4 className="text-3xl font-light tracking-tight text-black group-hover:italic transition-all duration-500 line-clamp-1">{result.title}</h4>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/results/${result.id}`}
                                    className="p-4 rounded-2xl bg-black/5 text-black/40 hover:text-white hover:bg-black transition-all shadow-sm border border-black/5"
                                    title="Editar Caso"
                                >
                                    <Edit size={20} strokeWidth={2} />
                                </Link>
                                <div className="scale-110">
                                    <DeleteButton
                                        id={result.id}
                                        onDelete={deleteResult}
                                        label="caso"
                                        canDelete={list.length > 1}
                                        disabledMessage="Debe haber al menos un caso de éxito."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Comparison */}
                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            {/* Before Image */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/60">Antes</p>
                                    <ArrowRight size={12} className="text-black/20 group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-inner bg-black/5 border border-black/5 group-hover:shadow-xl transition-all duration-700">
                                    <Image
                                        src={result.beforeImage}
                                        alt="Antes"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                        sizes="(max-width: 1280px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            </div>

                            {/* After Image */}
                            <div className="space-y-4 pt-8">
                                <div className="flex items-center justify-between px-2">
                                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-emerald-600">Después</p>
                                    <Sparkles size={12} className="text-emerald-500/40 group-hover:scale-125 transition-all" />
                                </div>
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-xl shadow-emerald-500/5 ring-4 ring-emerald-500/0 group-hover:ring-emerald-500/10 bg-black/5 border border-black/5 transition-all duration-700">
                                    <Image
                                        src={result.afterImage}
                                        alt="Después"
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 1280px) 50vw, 25vw"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/5 transition-all duration-700"></div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {list.length === 0 && (
                <div className="py-24 text-center space-y-8 bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem]">
                    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black/20">
                        <Activity size={40} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-light text-black/40 italic">No hay casos de éxito registrados.</p>
                        <p className="text-xs text-black/20 uppercase tracking-widest font-bold">Documente su primera transformación quirúrgica.</p>
                    </div>
                    <Link
                        href="/admin/results/new"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
                    >
                        <Plus size={18} /> Añadir Caso
                    </Link>
                </div>
            )}
        </div>
    );
}
