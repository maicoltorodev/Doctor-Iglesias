import React from 'react';
import { db } from "@/db";
import { services, galleryItems, testimonials, results } from "@/db/schema";
import { count } from "drizzle-orm";
import {
    Briefcase,
    Image as ImageIcon,
    Users,
    CheckSquare,
    TrendingUp,
    ArrowUpRight,
    Clock,
    Sparkles,
    Calendar,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

async function getStats() {
    try {
        const [servicesCount, galleryCount, testimonialsCount, resultsCount] = await Promise.all([
            db.select({ value: count() }).from(services),
            db.select({ value: count() }).from(galleryItems),
            db.select({ value: count() }).from(testimonials),
            db.select({ value: count() }).from(results),
        ]);

        return [
            { label: 'Servicios', value: servicesCount[0].value, icon: Briefcase, color: '#2563eb', href: '/admin/services', description: 'Tratamientos activos' },
            { label: 'Galería', value: galleryCount[0].value, icon: ImageIcon, color: '#9333ea', href: '/admin/gallery', description: 'Contenido visual' },
            { label: 'Resultados', value: resultsCount[0].value, icon: CheckSquare, color: '#059669', href: '/admin/results', description: 'Casos clínicos' },
            { label: 'Testimonios', value: testimonialsCount[0].value, icon: Users, color: '#d97706', href: '/admin/testimonials', description: 'Pacientes satisfechos' },
        ];
    } catch (error) {
        console.error("Error fetching stats:", error);
        return [];
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-1000">
            {/* Metrics Section - At the very top */}
            <div className="space-y-6">
                <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase whitespace-nowrap">
                        <Calendar size={12} className="text-black/60" />
                        {today}
                    </div>
                    <div className="h-px bg-black/5 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <Link key={i} href={stat.href} className="group">
                            <div className="bg-white rounded-[2rem] p-8 border-2 border-black/10 shadow-lg shadow-black/[0.02] hover:shadow-[0px_20px_40px_rgba(0,0,0,0.2)] hover:border-black transition-all duration-500 hover:-translate-y-4 relative overflow-hidden h-full">
                                {/* Hover color accent */}
                                <div
                                    className="absolute bottom-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                                    style={{ backgroundColor: stat.color }}
                                ></div>

                                <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                                    <div className="flex items-start justify-between">
                                        <div className="p-4 rounded-2xl bg-black/[0.02] group-hover:bg-black group-hover:text-white transition-all duration-500">
                                            <stat.icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <ArrowUpRight size={18} className="text-black/20 group-hover:text-black/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-4xl font-light tracking-tight text-black">{stat.value}</p>
                                        <div>
                                            <p className="text-[10px] font-bold text-black/80 tracking-widest uppercase">{stat.label}</p>
                                            <p className="text-[8px] font-bold text-black/30 tracking-widest uppercase mt-0.5">{stat.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Featured Section */}
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Hero Action Card - Now contains the welcome message */}
                <div className="lg:col-span-8 relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-black/10 group shadow-2xl shadow-black/[0.05] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.15)] hover:border-black transition-all duration-500">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-marble-texture opacity-10 grayscale pointer-events-none"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>

                    <div className="relative z-10 p-12 space-y-8 h-full flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl">
                                    <Sparkles size={24} />
                                </div>
                                <div className="px-4 py-2 rounded-full bg-black/5 border border-black/10 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold tracking-widest text-black/60 uppercase">Sistema Operativo</span>
                                </div>
                            </div>
                            <div className="max-w-xl space-y-4">
                                <h2 className="text-5xl font-light leading-[1.1] text-black">
                                    Bienvenido, <br />
                                    <span className="bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent italic font-serif pr-4">Jorge Iglesias Márquez</span>
                                </h2>
                                <p className="text-lg text-black/50 leading-relaxed font-medium">
                                    Su clínica digital está lista. Gestione su prestigio y presencia con la sobriedad y precisión que su marca merece.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="/admin/content"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-all shadow-lg hover:shadow-black/20 hover:-translate-y-1"
                            >
                                Editar Editorial
                                <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/admin/settings"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-black/10 text-black rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black/5 transition-all hover:-translate-y-1"
                            >
                                Ver Configuración
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Secondary Info Card */}
                <div className="lg:col-span-4 bg-black rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-2xl hover:shadow-black/30 transition-all duration-500 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent opacity-50"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="p-3 rounded-xl bg-white/10 text-white/80 backdrop-blur-sm">
                                <Clock size={20} />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Resumen</span>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-light leading-tight">Estado del portal administrativo</h3>
                            <ul className="space-y-4">
                                {[
                                    { text: "Base de datos sincronizada", active: true },
                                    { text: "Caché optimizado", active: true },
                                    { text: "Conexión Vercel estable", active: true }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-emerald-400' : 'bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative z-10 pt-8 border-t border-white/10 mt-8">
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            "La excelencia es un hábito, no un acto."
                            Actualizaciones periódicas mantienen el sitio en la cima.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Tip */}
            <div className="bg-marble-texture border border-black/10 rounded-[2.5rem] p-4 shadow-xl overflow-hidden relative">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-black rounded-xl text-white">
                            <TrendingUp size={16} />
                        </div>
                        <p className="text-sm text-black/70 font-medium italic">
                            <strong className="text-black font-bold not-italic">Consejo de optimización:</strong> Recuerde revalidar el caché después de cada sesión de edición para servir el contenido más reciente.
                        </p>
                    </div>
                    <Link
                        href="/admin/settings"
                        className="px-6 py-2 bg-black/5 hover:bg-black hover:text-white transition-all rounded-full text-[10px] font-bold tracking-widest uppercase text-black"
                    >
                        Configuraciones →
                    </Link>
                </div>
            </div>
        </div>
    );
}
