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
    ExternalLink,
    Clock
} from 'lucide-react';
import Link from 'next/link';

async function getStats() {
    const [servicesCount, galleryCount, testimonialsCount, resultsCount] = await Promise.all([
        db.select({ value: count() }).from(services),
        db.select({ value: count() }).from(galleryItems),
        db.select({ value: count() }).from(testimonials),
        db.select({ value: count() }).from(results),
    ]);

    return [
        { label: 'Servicios Activos', value: servicesCount[0].value, icon: Briefcase, color: 'text-blue-400', href: '/admin/services' },
        { label: 'Ítems en Galería', value: galleryCount[0].value, icon: ImageIcon, color: 'text-purple-400', href: '/admin/gallery' },
        { label: 'Casos de Éxito', value: resultsCount[0].value, icon: CheckSquare, color: 'text-emerald-400', href: '/admin/results' },
        { label: 'Testimonios', value: testimonialsCount[0].value, icon: Users, color: 'text-amber-400', href: '/admin/testimonials' },
    ];
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-10 pb-20">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Link key={i} href={stat.href}>
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/10 transition-all duration-500 group">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-white/20 group-hover:text-white/40 transition-colors">
                                    <ExternalLink size={18} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-4xl font-light tracking-tight">{stat.value}</p>
                                <p className="text-sm font-medium text-white/40 tracking-wide uppercase">{stat.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Recent Activity or welcome message */}
                <div className="lg:col-span-8 bg-white/5 border border-white/5 rounded-[40px] p-10 relative overflow-hidden group">
                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-widest uppercase">
                            <TrendingUp size={12} />
                            Sistema Online
                        </div>
                        <h2 className="text-4xl font-light leading-tight">
                            Bienvenido de nuevo, <br />
                            <span className="font-serif italic text-white/40">Dr. Iglesias Márquez</span>
                        </h2>
                        <p className="text-white/40 max-w-lg leading-relaxed">
                            Desde este panel puede gestionar todo el contenido visual y clínico de su sitio web.
                            Los cambios realizados se reflejarán instantáneamente después de revalidar el caché.
                        </p>
                        <div className="pt-6">
                            <Link
                                href="/admin/content"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform"
                            >
                                Gestionar Contenido Principal
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000"></div>
                </div>

                {/* Quick Info / Tips */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white/5 border border-white/5 rounded-[40px] p-8 space-y-6">
                        <div className="flex items-center gap-4 text-white/40">
                            <Clock size={20} />
                            <span className="text-[10px] font-bold tracking-widest uppercase">Próximos Pasos</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                "Actualizar precios de servicios",
                                "Subir nuevos resultados de rinoplastia",
                                "Revisar testimonios recientes",
                                "Verificar info de contacto"
                            ].map((tip, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 group-hover:bg-white transition-colors"></div>
                                    <p className="text-sm text-white/60 leading-tight group-hover:text-white transition-colors">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[40px] p-8 text-center space-y-4">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Soporte Técnico</p>
                        <p className="text-sm text-white/60">¿Necesita ayuda con el panel?</p>
                        <button className="w-full py-3 border border-white/20 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                            Contactar Desarrollador
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
