"use client";

import React, { useState } from 'react';
import { Save, RefreshCw, Database, Palette, Globe, Shield, Bell } from 'lucide-react';
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
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="space-y-3">
                <h1 className="text-4xl font-light tracking-tight text-black">Configuración</h1>
                <p className="text-black/50 max-w-2xl leading-relaxed">
                    Gestione la configuración general del sitio web y las opciones del panel de administración.
                </p>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Cache Management */}
                <div className="admin-card rounded-[40px] p-10 space-y-6 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600">
                            <Database size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-black">Gestión de Caché</h3>
                            <p className="text-sm text-black/50">Control del sistema de caché estático</p>
                        </div>
                    </div>

                    <p className="text-sm text-black/60 leading-relaxed">
                        Invalide la caché para forzar la regeneración de las páginas estáticas.
                        Útil después de realizar cambios importantes en el contenido.
                    </p>

                    <button
                        onClick={handleRevalidateCache}
                        disabled={isRevalidating}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRevalidating ? (
                            <>
                                <RefreshCw size={18} className="animate-spin" />
                                Invalidando caché...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={18} />
                                Invalidar Caché
                            </>
                        )}
                    </button>
                </div>

                {/* Site Information */}
                <div className="admin-card rounded-[40px] p-10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-600">
                            <Globe size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-black">Información del Sitio</h3>
                            <p className="text-sm text-black/50">Detalles generales</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between py-3 border-b border-white/5">
                            <span className="text-white/40">Versión</span>
                            <span className="font-medium">1.0.0</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-white/5">
                            <span className="text-white/40">Framework</span>
                            <span className="font-medium">Next.js 16</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-white/5">
                            <span className="text-white/40">Base de Datos</span>
                            <span className="font-medium">Neon PostgreSQL</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-white/40">Almacenamiento</span>
                            <span className="font-medium">Vercel Blob</span>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-green-500/10 text-green-400">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Seguridad</h3>
                            <p className="text-sm text-white/40">Configuración de acceso</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-sm font-medium text-green-400">Panel Protegido</span>
                            </div>
                            <p className="text-xs text-white/40">
                                El acceso al panel está protegido por contraseña y sesión.
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5">
                            <p className="text-xs text-white/40">
                                <strong className="text-white/60">Nota:</strong> Para cambiar la contraseña del admin,
                                modifique la variable de entorno <code className="px-2 py-1 bg-white/10 rounded">ADMIN_PASSWORD</code> en Vercel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Performance */}
                <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-400">
                            <Palette size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Rendimiento</h3>
                            <p className="text-sm text-white/40">Optimizaciones activas</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-white/60">Generación Estática</span>
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Activo</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-white/60">Caché de Contenido</span>
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Activo</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-white/60">Optimización de Imágenes</span>
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Activo</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-white/60">Middleware de Detección</span>
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Activo</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Info Footer */}
            <div className="mt-12 p-8 rounded-[40px] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5">
                <div className="flex items-start gap-4">
                    <Bell size={20} className="text-white/40 mt-1" />
                    <div className="space-y-2">
                        <h4 className="font-medium">Información Importante</h4>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Este panel utiliza una arquitectura estática para máximo rendimiento.
                            Los cambios realizados en el contenido se reflejarán automáticamente en la web
                            gracias al sistema de revalidación bajo demanda. Si los cambios no aparecen,
                            use el botón "Invalidar Caché" arriba.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
