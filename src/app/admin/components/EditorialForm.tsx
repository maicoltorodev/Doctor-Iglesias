"use client";

import React, { useState } from 'react';
import { updateSiteContent } from '../actions';
import {
    Save,
    ChevronLeft,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Type,
    AlignLeft,
    Layers,
    Info,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/useToast';

interface EditorialFormProps {
    section: string;
    initialData: any;
}

export default function EditorialForm({ section, initialData }: EditorialFormProps) {
    const [data, setData] = useState(initialData);
    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const { addToast } = useToast();

    const handleChange = (path: string[], value: string) => {
        const newData = JSON.parse(JSON.stringify(data)); // Deep clone to avoid mutation
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        setData(newData);
    };

    const handleSave = async () => {
        setStatus('saving');
        const result = await updateSiteContent(section, data);
        if (result.success) {
            setStatus('success');
            addToast('Contenido editorial actualizado con éxito', 'success');
            setTimeout(() => setStatus('idle'), 3000);
        } else {
            setStatus('error');
            addToast('Error al actualizar el contenido', 'error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    // Renderizador recursivo de campos estilizado
    const renderFields = (obj: any, path: string[] = []) => {
        return Object.entries(obj).map(([key, value]) => {
            const currentPath = [...path, key];
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            // Agrupador de campos (Objetos)
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return (
                    <div key={currentPath.join('.')} className="space-y-8 pt-8 first:pt-0">
                        <div className="flex items-center gap-4 border-b-2 border-black/5 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/40">
                                <Layers size={16} />
                            </div>
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-black/40">
                                {label}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pl-8 border-l-2 border-black/5 ml-4">
                            {renderFields(value, currentPath)}
                        </div>
                    </div>
                );
            }

            // Listas (Arrays)
            if (Array.isArray(value)) {
                return (
                    <div key={currentPath.join('.')} className="col-span-full space-y-6 bg-black/[0.02] p-8 rounded-[2rem] border-2 border-black/5 shadow-inner">
                        <div className="flex items-center gap-3">
                            <AlignLeft size={14} className="text-black/40" />
                            <label className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">{label} (Colección)</label>
                        </div>
                        <div className="space-y-4">
                            {value.map((item, idx) => (
                                <div key={idx} className="relative group">
                                    <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-[10px] font-serif italic text-black/20 group-hover:text-black/60 transition-colors">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </span>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const newList = [...value];
                                            newList[idx] = e.target.value;
                                            handleChange(currentPath, newList as any);
                                        }}
                                        className="w-full bg-white border-2 border-black/10 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-black transition-all shadow-sm group-hover:shadow-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            // Campos de Texto Simples
            return (
                <div key={currentPath.join('.')} className="space-y-3 group/field">
                    <div className="flex items-center gap-2">
                        <Type size={12} className="text-black/20 group-hover/field:text-black/60 transition-colors" />
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 group-hover/field:text-black transition-colors">{label}</label>
                    </div>
                    {value && value.toString().length > 100 ? (
                        <textarea
                            value={value as string}
                            onChange={(e) => handleChange(currentPath, e.target.value)}
                            rows={6}
                            className="w-full bg-white border-2 border-black/10 rounded-[2rem] px-8 py-6 text-base font-light leading-relaxed text-black focus:outline-none focus:border-black transition-all resize-none shadow-sm hover:shadow-lg hover:shadow-black/5"
                        />
                    ) : (
                        <input
                            type="text"
                            value={value as string}
                            onChange={(e) => handleChange(currentPath, e.target.value)}
                            className="w-full bg-white border-2 border-black/10 rounded-2xl px-8 py-5 text-base font-light text-black focus:outline-none focus:border-black transition-all shadow-sm hover:shadow-lg hover:shadow-black/5"
                        />
                    )}
                </div>
            );
        });
    };

    return (
        <div className="space-y-12 pb-32">
            {/* Sticky Action Bar Master */}
            <div className="sticky top-4 z-40 bg-white/90 backdrop-blur-2xl border-2 border-black/10 rounded-[2.5rem] px-10 py-5 flex items-center justify-between shadow-2xl shadow-black/10 animate-in slide-in-from-top-4 duration-700">
                <div className="flex items-center gap-8">
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                        <span className="text-[10px] font-bold tracking-widest text-black/40 uppercase">Modo Edición</span>
                    </div>
                    {status === 'success' && (
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest animate-in fade-in zoom-in">
                            <CheckCircle2 size={14} /> Contenido Sincronizado
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 font-bold text-[10px] uppercase tracking-widest">
                            <AlertCircle size={14} /> Error en Sincronización
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={status === 'saving'}
                        className="flex items-center gap-4 px-10 py-4 bg-black text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/90 active:scale-95 disabled:opacity-50 transition-all shadow-xl hover:shadow-black/20"
                    >
                        {status === 'saving' ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {status === 'saving' ? 'Sincronizando...' : 'Sincronizar Cambios'}
                    </button>
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white border-2 border-black/10 rounded-[3rem] p-12 lg:p-16 shadow-2xl shadow-black/[0.02] space-y-16">
                <div className="space-y-16">
                    {renderFields(data)}
                </div>
            </div>

            {/* Information Card */}
            <div className="bg-marble-texture border-2 border-black/10 rounded-[2.5rem] p-4 shadow-xl overflow-hidden relative">
                <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2rem] flex flex-col md:flex-row items-start gap-8 relative z-10">
                    <div className="p-4 bg-black rounded-2xl text-white shadow-lg shrink-0">
                        <Info size={24} />
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-2xl font-light text-black">Anotaciones del Sistema</h4>
                        <p className="text-lg text-black/50 leading-relaxed font-medium italic">
                            Los cambios se aplican directamente al núcleo de contenido del sitio. Al sincronizar, el motor de revalidación distribuirá las actualizaciones a nivel global de forma inmediata. Sea meticuloso con la ortografía y el tono editorial de su marca.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
