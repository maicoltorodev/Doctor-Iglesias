import React from 'react';
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Plus, GripVertical, ImageIcon } from 'lucide-react';
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
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between">
                <p className="text-white/40 max-w-lg leading-relaxed">
                    Gestione las imágenes de la galería principal.
                    Se requiere al menos una imagen para mantener la estética de la sección Obra.
                </p>
                <Link
                    href="/admin/gallery/new"
                    className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform"
                >
                    <Plus size={18} /> Añadir Imagen
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {list.map((item) => (
                    <div key={item.id} className="group bg-white/5 border border-white/5 rounded-[40px] p-6 space-y-6 hover:bg-white/[0.08] transition-all">
                        <div className="aspect-square rounded-[30px] overflow-hidden relative ring-1 ring-white/10 shadow-2xl">
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <DeleteButton
                                    id={item.id}
                                    onDelete={deleteGalleryItem}
                                    label="imagen"
                                    canDelete={list.length > 1}
                                    disabledMessage="La galería debe tener al menos una imagen."
                                />
                            </div>
                        </div>
                        <div className="space-y-2 px-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-white/20">{item.category}</span>
                                <GripVertical size={14} className="text-white/10" />
                            </div>
                            <h4 className="text-sm font-medium leading-tight">{item.title}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {list.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                    <ImageIcon size={48} className="mx-auto text-white/5 mb-4" />
                    <p className="text-white/20">La galería está vacía.</p>
                </div>
            )}
        </div>
    );
}
