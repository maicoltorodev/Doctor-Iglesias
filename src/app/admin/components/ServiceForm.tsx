"use client";

import React, { useState, useRef } from 'react';
import { updateService } from '../actions';
import {
    Save,
    ChevronLeft,
    Loader2,
    Plus,
    Trash2,
    Upload,
    CheckCircle2,
    AlertCircle,
    Activity,
    Clock,
    Calendar,
    Sparkles,
    HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceFormProps {
    initialData?: any;
    isNew?: boolean;
}

import { useToast } from '@/hooks/useToast';
import { createService } from '../actions';

export default function ServiceForm({ initialData, isNew = false }: ServiceFormProps) {
    const [data, setData] = useState(initialData || {
        label: '',
        slug: '',
        description: '',
        image: '',
        order: 0,
        specs: {
            duration: { value: '', sub: '' },
            recovery: { value: '', sub: '' },
            frequency: { value: '', sub: '' },
            result: { value: '', sub: '' }
        },
        benefits: [''],
        faqs: [{ question: '', answer: '' }]
    });

    const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToast } = useToast();

    const handleSave = async () => {
        setStatus('saving');

        try {
            const result = isNew
                ? await createService(data)
                : await updateService(data.id, data);

            if (result.success) {
                setStatus('success');
                addToast(isNew ? 'Servicio creado correctamente' : 'Servicio actualizado correctamente', 'success');
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            setStatus('error');
            addToast('Error al procesar la solicitud', 'error');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const response = await fetch(`/api/upload?filename=${file.name}`, {
                method: 'POST',
                body: file,
            });
            const blob = await response.json();
            setData({ ...data, image: blob.url });
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-12 pb-32">
            {/* Action Bar */}
            <div className="sticky top-0 z-20 -mx-8 px-8 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <Link
                    href="/admin/services"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium"
                >
                    <ChevronLeft size={18} /> Volver a lista
                </Link>

                <div className="flex items-center gap-4">
                    {status === 'success' && (
                        <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold animate-in fade-in zoom-in slide-in-from-right-2">
                            <CheckCircle2 size={16} /> Guardado con éxito
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={status === 'saving'}
                        className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    >
                        {status === 'saving' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isNew ? 'Crear Servicio' : 'Actualizar Servicio'}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Columna Principal: Información General */}
                <div className="lg:col-span-8 space-y-12">
                    <section className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-10">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                            <div className="p-3 rounded-xl bg-white/5 text-white/40"><p className="text-xs uppercase font-bold tracking-widest">General</p></div>
                            <h3 className="text-xl font-light">Información Básica</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-white/20">Nombre del Servicio</label>
                                <input
                                    type="text"
                                    value={data.label}
                                    onChange={e => setData({ ...data, label: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-white/20">Slug (URL)</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData({ ...data, slug: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-all"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-white/20">Descripción</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData({ ...data, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-all min-h-[120px]"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Especificaciones Clínicas */}
                    <section className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-10">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                            <div className="p-3 rounded-xl bg-white/5 text-white/40"><Activity size={18} /></div>
                            <h3 className="text-xl font-light">Especificaciones Clínicas</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { key: 'duration', label: 'Duración', icon: Clock },
                                { key: 'recovery', label: 'Recuperación', icon: Activity },
                                { key: 'frequency', label: 'Frecuencia', icon: Calendar },
                                { key: 'result', label: 'Resultado', icon: Sparkles }
                            ].map((spec) => (
                                <div key={spec.key} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                                    <div className="flex items-center gap-3 text-white/40">
                                        <spec.icon size={16} />
                                        <span className="text-[10px] font-bold tracking-widest uppercase">{spec.label}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <input
                                            placeholder="Valor (ej: 60 min)"
                                            value={data.specs[spec.key].value}
                                            onChange={e => setData({
                                                ...data,
                                                specs: {
                                                    ...data.specs,
                                                    [spec.key]: { ...data.specs[spec.key], value: e.target.value }
                                                }
                                            })}
                                            className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20"
                                        />
                                        <input
                                            placeholder="Sub-texto (ej: aprox)"
                                            value={data.specs[spec.key].sub}
                                            onChange={e => setData({
                                                ...data,
                                                specs: {
                                                    ...data.specs,
                                                    [spec.key]: { ...data.specs[spec.key], sub: e.target.value }
                                                }
                                            })}
                                            className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white/40 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Columna Lateral: Multimedia y Extras */}
                <div className="lg:col-span-4 space-y-12">
                    {/* Media */}
                    <section className="bg-white/5 border border-white/5 rounded-[40px] p-8 space-y-6">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-white/20">Imagen Principal</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-[4/5] rounded-[30px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all relative overflow-hidden group"
                        >
                            {data.image ? (
                                <>
                                    <Image src={data.image} alt="Preview" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Upload size={24} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="p-4 rounded-full bg-white/5 text-white/20"><Upload size={24} /></div>
                                    <p className="text-xs text-white/40">Subir imagen</p>
                                </>
                            )}
                            {isUploading && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                    <Loader2 size={32} className="animate-spin" />
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </section>

                    {/* Orden */}
                    <section className="bg-white/5 border border-white/5 rounded-[40px] p-8 space-y-4">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-white/20">Orden de Visualización</label>
                        <input
                            type="number"
                            value={data.order}
                            onChange={e => setData({ ...data, order: parseInt(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-light text-center focus:outline-none focus:border-white/30"
                        />
                        <p className="text-[9px] text-center text-white/20 uppercase tracking-widest">Índice en el scroll horizontal</p>
                    </section>
                </div>
            </div>

            {/* Beneficios & FAQs - Sección completa inferior */}
            <div className="grid md:grid-cols-2 gap-12 pt-12">
                <section className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/5 text-white/40"><HelpCircle size={18} /></div>
                            <h3 className="text-xl font-light">Preguntas Frecuentes</h3>
                        </div>
                        <button
                            onClick={() => setData({ ...data, faqs: [...data.faqs, { question: '', answer: '' }] })}
                            className="p-2 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="space-y-6">
                        {data.faqs.map((faq: any, i: number) => (
                            <div key={i} className="space-y-4 p-6 bg-black/20 rounded-3xl relative group">
                                <button
                                    onClick={() => setData({ ...data, faqs: data.faqs.filter((_: any, idx: number) => idx !== i) })}
                                    className="absolute -top-2 -right-2 p-2 rounded-full bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 size={12} />
                                </button>
                                <input
                                    placeholder="Pregunta"
                                    value={faq.question}
                                    onChange={e => {
                                        const newFaqs = [...data.faqs];
                                        newFaqs[i].question = e.target.value;
                                        setData({ ...data, faqs: newFaqs });
                                    }}
                                    className="w-full bg-transparent border-b border-white/10 pb-2 text-sm focus:outline-none focus:border-white/30"
                                />
                                <textarea
                                    placeholder="Respuesta"
                                    value={faq.answer}
                                    onChange={e => {
                                        const newFaqs = [...data.faqs];
                                        newFaqs[i].answer = e.target.value;
                                        setData({ ...data, faqs: newFaqs });
                                    }}
                                    className="w-full bg-transparent text-sm text-white/40 focus:outline-none min-h-[80px]"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/5 text-white/40"><Sparkles size={18} /></div>
                            <h3 className="text-xl font-light">Beneficios Clave</h3>
                        </div>
                        <button
                            onClick={() => setData({ ...data, benefits: [...data.benefits, ''] })}
                            className="p-2 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {data.benefits.map((benefit: string, i: number) => (
                            <div key={i} className="flex gap-4">
                                <input
                                    value={benefit}
                                    onChange={e => {
                                        const newBenefits = [...data.benefits];
                                        newBenefits[i] = e.target.value;
                                        setData({ ...data, benefits: newBenefits });
                                    }}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/30"
                                />
                                <button
                                    onClick={() => setData({ ...data, benefits: data.benefits.filter((_: any, idx: number) => idx !== i) })}
                                    className="p-4 rounded-2xl bg-red-500/5 text-red-500/40 hover:text-red-500 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
