import React from 'react';
import { db } from "@/db";
import { services } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
    Plus,
    Edit,
    GripVertical,
    Eye,
    Briefcase,
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    Search,
    Filter
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteButton } from '../components/DeleteButton';
import { deleteService } from '../actions';

async function getServices() {
    return await db.query.services.findMany({
        orderBy: [asc(services.order)]
    });
}

export default async function ServicesManagement() {
    const list = await getServices();

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
                                <Briefcase size={28} strokeWidth={1.5} />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-black/5 border border-black/10 flex items-center gap-2">
                                <Sparkles size={12} className="text-black/60" />
                                <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase">Especialidades</span>
                            </div>
                        </div>
                        <Link
                            href="/admin/services/new"
                            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-all shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                        >
                            <Plus size={18} strokeWidth={3} /> Nuevo Servicio
                        </Link>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl font-light tracking-tight text-black leading-[1.1]">
                            Gestión de <br />
                            <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif text-6xl pr-4">Servicios Médicos</span>
                        </h1>
                        <p className="text-xl text-black/50 leading-relaxed font-medium max-w-2xl">
                            Añada o edite los tratamientos. El orden definido aquí dicta la experiencia del paciente en la galería horizontal del sitio principal.
                        </p>
                    </div>
                </div>
            </div>

            {/* List Header/Actions */}
            <div className="flex items-baseline justify-between pt-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">Listado de Servicios</h3>
                    <span className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold text-black/60">{list.length}</span>
                </div>
                <div className="h-px bg-black/5 flex-1 mx-8"></div>
            </div>

            {/* Services Grid/List */}
            <div className="grid grid-cols-1 gap-4">
                {list.map((service) => (
                    <div
                        key={service.id}
                        className="group bg-white rounded-[2rem] p-6 border-2 border-black/10 shadow-lg shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.12)] hover:border-black transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                    >
                        {/* Order Badge */}
                        <div className="flex items-center gap-3 md:w-20 shrink-0">
                            <GripVertical size={20} className="text-black/10 group-hover:text-black/40 transition-colors cursor-grab" />
                            <span className="text-2xl font-serif italic text-black/20 group-hover:text-black transition-colors">
                                {(service.order ?? 0).toString().padStart(2, '0')}
                            </span>
                        </div>

                        {/* Image Preview */}
                        <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-inner bg-black/5 border border-black/5">
                            <Image
                                src={service.image}
                                alt={service.label}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="200px"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2 text-center md:text-left">
                            <h3 className="text-2xl font-light tracking-tight text-black group-hover:font-medium transition-all">
                                {service.label}
                            </h3>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <code className="text-[10px] text-black/40 bg-black/5 px-3 py-1 rounded-full font-bold tracking-wider">
                                    /{service.slug}
                                </code>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span className="text-[9px] font-bold text-black/40 uppercase tracking-widest">Visible en la web</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-black/5 md:pl-8 w-full md:w-auto justify-center">
                            <Link
                                href={`/servicio/${service.slug}`}
                                target="_blank"
                                className="p-4 rounded-2xl bg-black/5 text-black/40 hover:text-white hover:bg-black transition-all shadow-sm"
                                title="Ver en la web"
                            >
                                <Eye size={20} strokeWidth={2} />
                            </Link>
                            <Link
                                href={`/admin/services/${service.id}`}
                                className="p-4 rounded-2xl bg-black/5 text-black/40 hover:text-white hover:bg-black transition-all shadow-sm"
                                title="Editar"
                            >
                                <Edit size={20} strokeWidth={2} />
                            </Link>
                            <div className="scale-110">
                                <DeleteButton
                                    id={service.id}
                                    onDelete={deleteService}
                                    label="servicio"
                                    canDelete={list.length > 1}
                                    disabledMessage="Debe haber al menos un servicio para no romper la sección."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {list.length === 0 && (
                <div className="py-24 text-center space-y-8 bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem]">
                    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black/20">
                        <Briefcase size={40} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-light text-black/40 italic">Aún no hay servicios registrados en su clínica.</p>
                        <p className="text-xs text-black/20 uppercase tracking-widest font-bold">Comience añadiendo su primera especialidad médica.</p>
                    </div>
                    <Link
                        href="/admin/services/new"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
                    >
                        <Plus size={18} /> Crear el primero
                    </Link>
                </div>
            )}
        </div>
    );
}
