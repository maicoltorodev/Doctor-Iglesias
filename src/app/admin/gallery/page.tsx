import React from 'react';
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
    Plus,
    GripVertical,
    ImageIcon,
    Sparkles,
    ArrowRight,
    Camera,
    Hash
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteButton } from '../components/DeleteButton';
import { deleteGalleryItem } from '../actions';

async function getGallery() {
    return await db.query.galleryItems.findMany({
        orderBy: [asc(galleryItems.order)]
    });
}

export default async function GalleryManagement() {
    const list = await getGallery();

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
                                <Camera size={28} strokeWidth={1.5} />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-black/5 border border-black/10 flex items-center gap-2">
                                <Sparkles size={12} className="text-black/60" />
                                <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase">Galería de Obra</span>
                            </div>
                        </div>
                        <Link
                            href="/admin/gallery/new"
                            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-all shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                        >
                            <Plus size={18} strokeWidth={3} /> Añadir Imagen
                        </Link>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl font-light tracking-tight text-black leading-[1.1]">
                            Gestión de <br />
                            <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif text-6xl pr-4">Galería Visual</span>
                        </h1>
                        <p className="text-xl text-black/50 leading-relaxed font-medium max-w-2xl">
                            Curación del portafolio clínico. Cada imagen es un testimonio visual de la precisión quirúrgica y los resultados transformadores.
                        </p>
                    </div>
                </div>
            </div>

            {/* List Header/Actions */}
            <div className="flex items-baseline justify-between pt-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase">Archivos Registrados</h3>
                    <span className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold text-black/60">{list.length}</span>
                </div>
                <div className="h-px bg-black/5 flex-1 mx-8"></div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {list.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-white border-2 border-black/10 rounded-[2.5rem] p-4 shadow-xl shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.2)] hover:border-black transition-all duration-500 hover:-translate-y-4 relative overflow-hidden"
                    >
                        {/* Image Container */}
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-inner bg-black/5 border border-black/5 overflow-hidden">
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />

                            {/* Hover Actions Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                <div className="scale-125 transform transition-transform duration-500 group-hover:scale-100">
                                    <DeleteButton
                                        id={item.id}
                                        onDelete={deleteGalleryItem}
                                        label="imagen"
                                        canDelete={list.length > 1}
                                        disabledMessage="La galería debe tener al menos una imagen."
                                    />
                                </div>
                            </div>

                            {/* Category Badge overlay */}
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <span className="text-[8px] font-bold text-black uppercase tracking-widest">{item.category}</span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between border-b border-black/5 pb-2">
                                <div className="flex items-center gap-2">
                                    <Hash size={12} className="text-black/20" />
                                    <span className="text-[9px] font-bold text-black/40 uppercase tracking-widest">
                                        Orden {(item.order ?? 0).toString().padStart(2, '0')}
                                    </span>
                                </div>
                                <GripVertical size={16} className="text-black/10 group-hover:text-black/40 transition-colors cursor-grab" />
                            </div>
                            <h4 className="text-lg font-light tracking-tight text-black line-clamp-1 group-hover:font-medium transition-all">
                                {item.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {list.length === 0 && (
                <div className="py-24 text-center space-y-8 bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem]">
                    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black/20">
                        <ImageIcon size={40} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-light text-black/40 italic">La galería visual está vacía.</p>
                        <p className="text-xs text-black/20 uppercase tracking-widest font-bold">Comience cargando su primera obra maestra.</p>
                    </div>
                    <Link
                        href="/admin/gallery/new"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl"
                    >
                        <Plus size={18} /> Añadir Imagen
                    </Link>
                </div>
            )}
        </div>
    );
}
