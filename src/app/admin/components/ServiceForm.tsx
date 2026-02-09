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
    HelpCircle,
    Image as ImageIcon,
    X,
    Info
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
    const [isDragging, setIsDragging] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
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
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleImageUpload = async (file: File) => {
        if (!file) return;

        setIsUploading(true);
        try {
            const response = await fetch(`/api/upload?filename=${file.name}`, {
                method: 'POST',
                body: file,
            });
            const blob = await response.json();
            setData({ ...data, image: blob.url });
            addToast('Imagen cargada correctamente', 'success');
        } catch (error) {
            console.error('Error uploading image:', error);
            addToast('Error al cargar la imagen', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    };

    const generateSlug = (label: string) => {
        return label
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    return (
        <div className="space-y-12 pb-32">
            {/* Action Bar */}
            <div className="sticky top-0 z-20 -mx-8 px-8 py-4 bg-gradient-to-b from-[#f2f0f4] via-[#f2f0f4]/98 to-[#f2f0f4]/95 backdrop-blur-2xl border-b border-black/10 flex items-center justify-between shadow-xl shadow-black/5">
                <Link
                    href="/admin/services"
                    className="group flex items-center gap-2 text-black/40 hover:text-black transition-all duration-300 text-sm font-medium px-4 py-2 rounded-xl hover:bg-black/5"
                >
                    <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    Volver a lista
                </Link>

                <div className="flex items-center gap-4">
                    {status === 'success' && (
                        <span className="flex items-center gap-2 text-emerald-600 text-xs font-bold animate-in fade-in zoom-in slide-in-from-right-2 duration-500">
                            <CheckCircle2 size={16} className="animate-pulse" /> Guardado con éxito
                        </span>
                    )}
                    {status === 'error' && (
                        <span className="flex items-center gap-2 text-red-600 text-xs font-bold animate-in fade-in zoom-in slide-in-from-right-2 duration-500">
                            <AlertCircle size={16} className="animate-pulse" /> Error al guardar
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={status === 'saving'}
                        className="group relative flex items-center gap-3 px-8 py-3 bg-black text-white rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500 disabled:opacity-50 disabled:hover:scale-100 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <span className="relative z-10 flex items-center gap-3">
                            {status === 'saving' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {isNew ? 'Crear Servicio' : 'Actualizar Servicio'}
                        </span>
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Columna Principal */}
                <div className="lg:col-span-8 space-y-12">
                    {/* Información Básica */}
                    <section className="group bg-white border-2 border-black/10 rounded-[40px] p-10 space-y-10 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700">
                        <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                            <div className="p-3 rounded-xl bg-black/5 text-black/60 group-hover:text-black transition-colors">
                                <p className="text-xs uppercase font-bold tracking-widest">General</p>
                            </div>
                            <h3 className="text-xl font-light flex-1 text-black">Información Básica</h3>
                            <div className="group/info relative">
                                <Info size={16} className="text-black/30 hover:text-black/60 transition-colors cursor-help" />
                                <div className="absolute right-0 top-8 w-64 p-4 bg-white border-2 border-black/10 rounded-2xl text-xs text-black/70 opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-300 z-10 shadow-2xl">
                                    Información principal que se mostrará en la tarjeta del servicio
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3 group/field">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-black/40 group-hover/field:text-black/60 transition-colors">
                                    Nombre del Servicio
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.label}
                                        onChange={e => {
                                            setData({ ...data, label: e.target.value });
                                            if (!data.slug || data.slug === generateSlug(data.label)) {
                                                setData({ ...data, label: e.target.value, slug: generateSlug(e.target.value) });
                                            }
                                        }}
                                        onFocus={() => setFocusedField('label')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="ej: Láser CO2 Fraccionado"
                                        className={`w-full bg-black/[0.02] border-2 ${focusedField === 'label' ? 'border-black/30 shadow-lg shadow-black/10 bg-black/[0.04]' : 'border-black/10'} rounded-2xl px-6 py-4 text-sm text-black focus:outline-none transition-all duration-300 placeholder:text-black/30`}
                                    />
                                    {data.label && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-black/30">
                                            {data.label.length} caracteres
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 group/field">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-black/40 group-hover/field:text-black/60 transition-colors">
                                    Slug (URL)
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData({ ...data, slug: e.target.value })}
                                        onFocus={() => setFocusedField('slug')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="laser-co2-fraccionado"
                                        className={`w-full bg-black/[0.02] border-2 ${focusedField === 'slug' ? 'border-black/30 shadow-lg shadow-black/10 bg-black/[0.04]' : 'border-black/10'} rounded-2xl px-6 py-4 text-sm font-mono text-black focus:outline-none transition-all duration-300 placeholder:text-black/30`}
                                    />
                                    {data.slug && (
                                        <div className="mt-2 text-[10px] text-black/40">
                                            URL: <span className="text-black/60 font-mono">/servicio/{data.slug}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-3 group/field">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-black/40 group-hover/field:text-black/60 transition-colors">
                                    Descripción
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData({ ...data, description: e.target.value })}
                                        onFocus={() => setFocusedField('description')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Descripción detallada del servicio que se mostrará en la página..."
                                        maxLength={500}
                                        className={`w-full bg-black/[0.02] border-2 ${focusedField === 'description' ? 'border-black/30 shadow-lg shadow-black/10 bg-black/[0.04]' : 'border-black/10'} rounded-2xl px-6 py-4 text-sm text-black focus:outline-none transition-all duration-300 min-h-[140px] resize-none placeholder:text-black/30`}
                                    />
                                    <div className="absolute bottom-4 right-4 text-[10px] text-black/30">
                                        {data.description.length}/500
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Especificaciones Clínicas */}
                    <section className="group bg-white border-2 border-black/10 rounded-[40px] p-10 space-y-10 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700">
                        <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600">
                                <Activity size={18} />
                            </div>
                            <h3 className="text-xl font-light text-black">Especificaciones Clínicas</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { key: 'duration', label: 'Duración', icon: Clock, color: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-600' },
                                { key: 'recovery', label: 'Recuperación', icon: Activity, color: 'bg-green-50 border-green-100', iconColor: 'text-green-600' },
                                { key: 'frequency', label: 'Frecuencia', icon: Calendar, color: 'bg-purple-50 border-purple-100', iconColor: 'text-purple-600' },
                                { key: 'result', label: 'Resultado', icon: Sparkles, color: 'bg-amber-50 border-amber-100', iconColor: 'text-amber-600' }
                            ].map((spec) => (
                                <div key={spec.key} className={`group/spec p-6 ${spec.color} border-2 rounded-3xl space-y-6 hover:scale-105 hover:shadow-xl hover:shadow-black/5 transition-all duration-500`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-white/60 ${spec.iconColor} group-hover/spec:scale-110 transition-transform`}>
                                            <spec.icon size={16} />
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-black/60">{spec.label}</span>
                                    </div>
                                    <div className="space-y-3">
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
                                            className="w-full bg-white/60 border-2 border-black/10 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black/20 focus:bg-white transition-all placeholder:text-black/30"
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
                                            className="w-full bg-white/40 border border-black/5 rounded-xl px-4 py-2.5 text-xs text-black/60 focus:outline-none focus:border-black/10 transition-all placeholder:text-black/30"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Columna Lateral */}
                <div className="lg:col-span-4 space-y-12">
                    {/* Media */}
                    <section className="group bg-white border-2 border-black/10 rounded-[40px] p-8 space-y-6 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-black/40 group-hover:text-black/60 transition-colors">
                                Imagen Principal
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            {data.image && (
                                <button
                                    onClick={() => setData({ ...data, image: '' })}
                                    className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div
                            onClick={() => !data.image && fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            className={`aspect-[4/5] rounded-[30px] border-2 border-dashed ${isDragging ? 'border-black/40 bg-black/5 scale-105' : 'border-black/20'
                                } flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-black/40 hover:bg-black/[0.02] transition-all duration-300 relative overflow-hidden group/upload`}
                        >
                            {data.image ? (
                                <>
                                    <Image
                                        src={data.image}
                                        alt="Preview"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover/upload:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-all duration-300">
                                        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm mb-2">
                                            <Upload size={24} className="text-white" />
                                        </div>
                                        <p className="text-xs font-medium text-white">Cambiar imagen</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="p-5 rounded-full bg-black/5 text-black/30 group-hover/upload:scale-110 group-hover/upload:text-black/50 transition-all duration-300">
                                        <ImageIcon size={28} />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="text-sm font-medium text-black/60">
                                            {isDragging ? 'Suelta la imagen aquí' : 'Subir imagen'}
                                        </p>
                                        <p className="text-xs text-black/40">
                                            o arrastra y suelta
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-black/30 uppercase tracking-wider">JPG, PNG, WEBP (máx 5MB)</p>
                                </>
                            )}
                            {isUploading && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center gap-4">
                                    <Loader2 size={40} className="animate-spin text-black/60" />
                                    <p className="text-sm text-black/60">Subiendo imagen...</p>
                                </div>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file);
                            }}
                        />
                    </section>

                    {/* Orden */}
                    <section className="group bg-white border-2 border-black/10 rounded-[40px] p-8 space-y-6 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700">
                        <label className="text-[10px] font-bold tracking-widest uppercase text-black/40 group-hover:text-black/60 transition-colors flex items-center gap-2">
                            Orden de Visualización
                            <div className="group/info relative">
                                <Info size={12} className="text-black/30 hover:text-black/60 transition-colors cursor-help" />
                                <div className="absolute left-0 top-6 w-48 p-3 bg-white border-2 border-black/10 rounded-xl text-[10px] text-black/60 opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-300 z-10 shadow-2xl">
                                    Índice en el scroll horizontal de la galería
                                </div>
                            </div>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={data.order}
                                onChange={e => setData({ ...data, order: parseInt(e.target.value) || 0 })}
                                className="w-full bg-gradient-to-br from-black/[0.03] to-black/[0.01] border-2 border-black/10 rounded-3xl px-6 py-6 text-3xl font-light text-center text-black focus:outline-none focus:border-black/30 focus:shadow-2xl focus:shadow-black/10 transition-all duration-300 tabular-nums"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setData({ ...data, order: Math.max(0, data.order - 1) })}
                                className="p-2 rounded-xl bg-black/5 hover:bg-black/10 border-2 border-black/10 hover:border-black/20 transition-all"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-[9px] text-black/40 uppercase tracking-widest">Ajustar posición</span>
                            <button
                                onClick={() => setData({ ...data, order: data.order + 1 })}
                                className="p-2 rounded-xl bg-black/5 hover:bg-black/10 border-2 border-black/10 hover:border-black/20 transition-all"
                            >
                                <ChevronLeft size={16} className="rotate-180" />
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            {/* Beneficios & FAQs */}
            <div className="grid md:grid-cols-2 gap-12 pt-12">
                {/* FAQs */}
                <section className="group bg-white border-2 border-black/10 rounded-[40px] p-10 space-y-8 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700">
                    <div className="flex items-center justify-between border-b border-black/5 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600">
                                <HelpCircle size={18} />
                            </div>
                            <h3 className="text-xl font-light text-black">Preguntas Frecuentes</h3>
                        </div>
                        <button
                            onClick={() => setData({ ...data, faqs: [...data.faqs, { question: '', answer: '' }] })}
                            className="group/btn p-2.5 rounded-full border-2 border-black/10 text-black/40 hover:text-black hover:border-black/30 hover:bg-black/5 hover:scale-110 transition-all duration-300"
                        >
                            <Plus size={18} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {data.faqs.length === 0 ? (
                        <div className="py-16 text-center space-y-4">
                            <div className="p-4 rounded-full bg-black/5 text-black/30 w-fit mx-auto">
                                <HelpCircle size={32} />
                            </div>
                            <p className="text-sm text-black/50">No hay preguntas frecuentes</p>
                            <button
                                onClick={() => setData({ ...data, faqs: [{ question: '', answer: '' }] })}
                                className="text-xs text-black/60 hover:text-black underline transition-colors"
                            >
                                Agregar la primera
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {data.faqs.map((faq: any, i: number) => (
                                <div key={i} className="group/faq space-y-4 p-6 bg-black/[0.02] rounded-3xl relative border-2 border-black/5 hover:border-black/10 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                                    <button
                                        onClick={() => setData({ ...data, faqs: data.faqs.filter((_: any, idx: number) => idx !== i) })}
                                        className="absolute -top-3 -right-3 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover/faq:opacity-100 hover:scale-110 transition-all duration-300 shadow-lg"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                    <div className="absolute top-6 left-6 text-[10px] font-bold text-black/30">#{i + 1}</div>
                                    <input
                                        placeholder="¿Cuál es tu pregunta?"
                                        value={faq.question}
                                        onChange={e => {
                                            const newFaqs = [...data.faqs];
                                            newFaqs[i].question = e.target.value;
                                            setData({ ...data, faqs: newFaqs });
                                        }}
                                        className="w-full bg-transparent border-b-2 border-black/10 pb-3 pt-6 text-sm font-medium text-black focus:outline-none focus:border-black/30 placeholder:text-black/30 transition-all"
                                    />
                                    <textarea
                                        placeholder="Escribe la respuesta aquí..."
                                        value={faq.answer}
                                        onChange={e => {
                                            const newFaqs = [...data.faqs];
                                            newFaqs[i].answer = e.target.value;
                                            setData({ ...data, faqs: newFaqs });
                                        }}
                                        className="w-full bg-transparent text-sm text-black/70 focus:outline-none focus:text-black min-h-[100px] resize-none placeholder:text-black/30 transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Beneficios */}
                <section className="group bg-white border-2 border-black/10 rounded-[40px] p-10 space-y-8 hover:border-black/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700">
                    <div className="flex items-center justify-between border-b border-black/5 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600">
                                <Sparkles size={18} />
                            </div>
                            <h3 className="text-xl font-light text-black">Beneficios Clave</h3>
                        </div>
                        <button
                            onClick={() => setData({ ...data, benefits: [...data.benefits, ''] })}
                            className="group/btn p-2.5 rounded-full border-2 border-black/10 text-black/40 hover:text-black hover:border-black/30 hover:bg-black/5 hover:scale-110 transition-all duration-300"
                        >
                            <Plus size={18} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {data.benefits.length === 0 || (data.benefits.length === 1 && !data.benefits[0]) ? (
                        <div className="py-16 text-center space-y-4">
                            <div className="p-4 rounded-full bg-black/5 text-black/30 w-fit mx-auto">
                                <Sparkles size={32} />
                            </div>
                            <p className="text-sm text-black/50">No hay beneficios agregados</p>
                            <button
                                onClick={() => setData({ ...data, benefits: [''] })}
                                className="text-xs text-black/60 hover:text-black underline transition-colors"
                            >
                                Agregar el primero
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.benefits.map((benefit: string, i: number) => (
                                <div key={i} className="group/benefit flex gap-4 items-center">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-200 flex items-center justify-center text-xs font-bold text-amber-700">
                                        {i + 1}
                                    </div>
                                    <input
                                        value={benefit}
                                        onChange={e => {
                                            const newBenefits = [...data.benefits];
                                            newBenefits[i] = e.target.value;
                                            setData({ ...data, benefits: newBenefits });
                                        }}
                                        placeholder="Descripción del beneficio..."
                                        className="flex-1 bg-black/[0.02] border-2 border-black/10 rounded-2xl px-6 py-4 text-sm text-black focus:outline-none focus:border-black/20 focus:bg-black/[0.03] transition-all placeholder:text-black/30"
                                    />
                                    <button
                                        onClick={() => setData({ ...data, benefits: data.benefits.filter((_: any, idx: number) => idx !== i) })}
                                        className="flex-shrink-0 p-3 rounded-2xl bg-red-50 text-red-500 hover:text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-300 opacity-0 group-hover/benefit:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
