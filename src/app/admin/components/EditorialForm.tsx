"use client";

import React, { useState } from 'react';
import { updateSiteContent } from '../actions';
import { Save, ChevronLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface EditorialFormProps {
    section: string;
    initialData: any;
}

import { useToast } from '@/hooks/useToast';

export default function EditorialForm({ section, initialData }: EditorialFormProps) {
    const [data, setData] = useState(initialData);
    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const { addToast } = useToast();

    const handleChange = (path: string[], value: string) => {
        const newData = { ...data };
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
        }
    };

    // Renderizador recursivo de campos
    const renderFields = (obj: any, path: string[] = []) => {
        return Object.entries(obj).map(([key, value]) => {
            const currentPath = [...path, key];
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return (
                    <div key={currentPath.join('.')} className="space-y-6 pt-6 first:pt-0">
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/20 border-b border-white/5 pb-2">
                            {label}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-4 border-l border-white/5">
                            {renderFields(value, currentPath)}
                        </div>
                    </div>
                );
            }

            if (Array.isArray(value)) {
                return (
                    <div key={currentPath.join('.')} className="col-span-full space-y-4">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-white/40">{label} (Lista)</label>
                        <div className="space-y-4">
                            {value.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const newList = [...value];
                                            newList[idx] = e.target.value;
                                            handleChange(currentPath, newList as any);
                                        }}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            return (
                <div key={currentPath.join('.')} className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-white/40">{label}</label>
                    {value && value.toString().length > 100 ? (
                        <textarea
                            value={value as string}
                            onChange={(e) => handleChange(currentPath, e.target.value)}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-light leading-relaxed focus:outline-none focus:border-white/30 transition-all resize-none"
                        />
                    ) : (
                        <input
                            type="text"
                            value={value as string}
                            onChange={(e) => handleChange(currentPath, e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-light focus:outline-none focus:border-white/30 transition-all"
                        />
                    )}
                </div>
            );
        });
    };

    return (
        <div className="space-y-12 pb-32">
            {/* Action Bar */}
            <div className="sticky top-0 z-20 -mx-8 px-8 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <Link
                    href="/admin/content"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium"
                >
                    <ChevronLeft size={18} /> Volver
                </Link>

                <div className="flex items-center gap-4">
                    {status === 'success' && (
                        <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold animate-in fade-in zoom-in slide-in-from-right-2">
                            <CheckCircle2 size={16} /> Guardado con éxito
                        </span>
                    )}
                    {status === 'error' && (
                        <span className="flex items-center gap-2 text-red-400 text-xs font-bold">
                            <AlertCircle size={16} /> Error al guardar
                        </span>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={status === 'saving'}
                        className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300"
                    >
                        {status === 'saving' ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {status === 'saving' ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white/5 border border-white/5 rounded-[40px] p-12 space-y-12">
                <div className="space-y-10">
                    {renderFields(data)}
                </div>
            </div>

            {/* Hint */}
            <div className="p-8 border border-dashed border-white/10 rounded-3xl flex items-start gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-white/40">
                    <AlertCircle size={20} />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium">Información sobre la edición</p>
                    <p className="text-xs text-white/30 leading-relaxed">
                        Los cambios se guardan directamente en la base de datos de producción.
                        El sistema revalida automáticamente el contenido para que se vea reflejado en la web inmediatamente.
                        Tenga cuidado con el formato de los textos largos.
                    </p>
                </div>
            </div>
        </div>
    );
}
