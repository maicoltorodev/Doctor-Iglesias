"use client";

import React, { useState } from 'react';
import {
    Save,
    RefreshCw,
    Database,
    Palette,
    Globe,
    Shield,
    Bell,
    Settings,
    Sparkles,
    CheckCircle2,
    Cpu,
    ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';

export default function SettingsPage() {
    const { addToast } = useToast();
    const [isRevalidating, setIsRevalidating] = useState(false);

    const handleRevalidateCache = async () => {
        setIsRevalidating(true);
        try {
            const response = await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || 'dr-iglesias-2026-secret'
                })
            });

            if (response.ok) {
                addToast('Caché invalidada correctamente. Los cambios se verán reflejados.', 'success');
            } else {
                addToast('Error al invalidar la caché', 'error');
            }
        } catch (error) {
            addToast('Error de red al invalidar la caché', 'error');
        } finally {
            setIsRevalidating(false);
        }
    };

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
                                <Settings size={28} strokeWidth={1.5} />
                            </div>
                            <div className="px-4 py-2 rounded-full bg-black/5 border border-black/10 flex items-center gap-2">
                                <Cpu size={12} className="text-black/60" />
                                <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase">Infraestructura</span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        <h1 className="text-5xl font-light tracking-tight text-black leading-[1.1]">
                            Control del <br />
                            <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif text-6xl pr-4">Sistema</span>
                        </h1>
                        <p className="text-xl text-black/50 leading-relaxed font-medium max-w-2xl">
                            Ajuste la arquitectura digital que soporta su clínica. Gestione el caché, la seguridad y el rendimiento con precisión milimétrica.
                        </p>
                    </div>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Cache Management */}
                <div className="bg-white border-2 border-black/10 rounded-[2.5rem] p-10 space-y-8 shadow-xl shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.15)] hover:border-black transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group">
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="p-5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                            <Database size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-light text-black">Gestión de Caché</h3>
                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Control de Regeneración Estática</p>
                        </div>
                    </div>

                    <p className="text-lg text-black/50 leading-relaxed font-medium relative z-10 italic">
                        Invalide la caché para forzar la actualización inmediata de todas las secciones del sitio web principal.
                    </p>

                    <button
                        onClick={handleRevalidateCache}
                        disabled={isRevalidating}
                        className="relative z-10 w-full flex items-center justify-center gap-4 px-8 py-5 bg-black text-white rounded-2xl font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-all shadow-xl hover:shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                    >
                        {isRevalidating ? (
                            <>
                                <RefreshCw size={20} className="animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                                Invalidar Cache
                            </>
                        )}
                    </button>

                    {/* Decorative element */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/[0.03] rounded-full blur-[50px] pointer-events-none group-hover:bg-blue-500/[0.08] transition-all duration-700"></div>
                </div>

                {/* Site Information */}
                <div className="bg-white border-2 border-black/10 rounded-[2.5rem] p-10 space-y-8 shadow-xl shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.15)] hover:border-black transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group">
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="p-5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
                            <Globe size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-light text-black">Información Técnica</h3>
                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Arquitectura Digital</p>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10 pt-4">
                        {[
                            { label: "Versión de Software", value: "1.0.0 Estable" },
                            { label: "Núcleo de Sistema", value: "Next.js 16 (Enterprise)" },
                            { label: "Motor de Datos", value: "SQLite / Drizzle" },
                            { label: "Servicios Cloud", value: "Vercel Empresarial" }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-4 border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors px-2 rounded-lg">
                                <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{item.label}</span>
                                <span className="text-sm font-serif italic text-black">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white border-2 border-black/10 rounded-[2.5rem] p-10 space-y-8 shadow-xl shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.15)] hover:border-black transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group">
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="p-5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <Shield size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-light text-black">Seguridad</h3>
                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Protocolos de Acceso</p>
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="p-6 rounded-[1.5rem] bg-emerald-500/[0.03] border border-emerald-500/10 flex items-start gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-emerald-800 uppercase tracking-tight">Encriptación Activa</p>
                                <p className="text-xs text-black/40 leading-relaxed font-medium">El panel de administración está operando bajo el estándar de encriptación AES-256 de alta seguridad.</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-[1.5rem] bg-black/[0.02] border border-black/5 space-y-4">
                            <p className="text-xs text-black/40 leading-relaxed italic">
                                Para modificaciones en el núcleo de acceso crítico (<span className="text-black font-bold not-italic">ADMIN_PASSWORD</span>), proceda a través de la consola de configuración de Vercel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Performance Section */}
                <div className="bg-white border-2 border-black/10 rounded-[2.5rem] p-10 space-y-8 shadow-xl shadow-black/[0.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.15)] hover:border-black transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group">
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="p-5 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100">
                            <Palette size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-light text-black">Rendimiento</h3>
                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Eficiencia Operativa</p>
                        </div>
                    </div>

                    <div className="space-y-3 relative z-10">
                        {[
                            { label: "Generación Estática (SSG)", active: true },
                            { label: "Caché de Capa Maestra", active: true },
                            { label: "Optimización de imagen en tiempo real", active: true },
                            { label: "Intermediario de sistema inteligente", active: true }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/[0.01] border border-black/[0.03] hover:bg-white transition-all shadow-sm">
                                <span className="text-xs font-bold text-black/60 tracking-tight">{item.label}</span>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-emerald-500" />
                                    <span className="text-[9px] font-bold text-black/30 uppercase tracking-[0.2em]">Optimizado</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Info Footer */}
            <div className="relative overflow-hidden p-8 rounded-[2.5rem] bg-marble-texture border-2 border-black/10 shadow-xl">
                <div className="bg-white/90 backdrop-blur-sm p-10 rounded-[2rem] relative z-10 flex flex-col md:flex-row items-start gap-8">
                    <div className="p-4 bg-black rounded-2xl text-white shadow-lg">
                        <Bell size={24} />
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-2xl font-light text-black">Protocolo de Sincronización</h4>
                        <p className="text-lg text-black/50 leading-relaxed font-medium italic">
                            Los cambios realizados en el contenido se sincronizan automáticamente. El sistema de arquitectura estática garantiza que su clínica digital cargue a la velocidad del rayo mientras mantiene la frescura de los datos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
