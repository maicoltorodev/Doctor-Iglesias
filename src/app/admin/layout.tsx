"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Image as ImageIcon,
    CheckSquare,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { Toaster } from './components/Toaster';
import CustomCursor from '@/components/ui/CustomCursor';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import './admin.css';

interface SidebarItemProps {
    href: string;
    icon: any;
    label: string;
    isActive: boolean;
}

const SidebarItem = ({ href, icon: Icon, label, isActive }: SidebarItemProps) => (
    <Link href={href}>
        <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 relative group ${isActive
                ? 'bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border-2 border-black/5'
                : 'hover:bg-white/60 text-black/40 hover:text-black border-2 border-transparent'
                }`}
        >
            {/* Indicador de Activación Escultural */}
            {isActive && (
                <motion.div
                    layoutId="active-sidebar-pill"
                    className="absolute left-0 w-1.5 h-6 bg-black rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}

            <div className={`transition-all duration-500 ${isActive ? 'text-black' : 'text-black/30 group-hover:text-black'
                }`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>

            <span className={`text-sm tracking-wide transition-all duration-500 ${isActive ? 'font-bold text-black' : 'font-medium'
                }`}>
                {label}
            </span>

            {/* Micro-flecha de profundidad */}
            <div className={`ml-auto transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                <ChevronRight size={14} className="text-black/20" />
            </div>

            {/* Efecto de Brillo Sutil al Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
        </motion.div>
    </Link>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const cursorState = useCustomCursor();
    const isLoginPage = pathname === '/admin/login';

    const navLinks = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/content', icon: FileText, label: 'Contenido' },
        { href: '/admin/services', icon: Briefcase, label: 'Servicios' },
        { href: '/admin/gallery', icon: ImageIcon, label: 'Galería' },
        { href: '/admin/results', icon: CheckSquare, label: 'Resultados' },
        { href: '/admin/testimonials', icon: Users, label: 'Testimonios' },
        { href: '/admin/settings', icon: Settings, label: 'Configuración' },
    ];

    return (
        <div className="min-h-screen bg-[#f2f0f4] text-black flex selection:bg-black/10">
            {/* Sidebar - Solo si no es login */}
            {!isLoginPage && (
                <aside
                    className={`${isSidebarOpen ? 'w-72' : 'w-20'
                        } fixed h-screen bg-marble-texture border-r border-black/20 transition-all duration-500 z-50 flex flex-col shadow-2xl`}
                >
                    {/* Logo */}
                    <div className="p-8 flex items-center justify-center">
                        {isSidebarOpen ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center gap-3"
                            >
                                <Image
                                    src="/logo.webp"
                                    alt="Dr. Jorge Iglesias"
                                    width={60}
                                    height={60}
                                    className="w-16 h-auto"
                                    priority
                                />
                                <span className="text-xl font-bold tracking-[0.3em] text-black">ADMIN</span>
                            </motion.div>
                        ) : (
                            <Image
                                src="/logo.webp"
                                alt="Dr. Jorge Iglesias"
                                width={40}
                                height={40}
                                className="w-10 h-auto"
                                priority
                            />
                        )}
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-8 space-y-2">
                        {navLinks.map((link) => (
                            <SidebarItem
                                key={link.href}
                                {...link}
                                isActive={pathname === link.href}
                            />
                        ))}
                    </nav>

                    {/* Bottom Profile/Actions */}
                    <div className="p-4 border-t border-black/5 mt-auto">
                        <button
                            className={`group/logout relative flex items-center transition-all duration-700 rounded-2xl border border-black/[0.03] bg-white/40 hover:bg-red-50/50 hover:border-red-200 hover:shadow-[0_15px_30px_-10px_rgba(220,38,38,0.1)] ${isSidebarOpen ? 'px-6 py-4 w-full' : 'p-3 w-full justify-center'
                                }`}
                            onClick={() => {
                                // Limpiar la sesión
                                document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                                // Redirigir al login
                                window.location.href = '/admin/login';
                            }}
                        >
                            {/* Icon Container */}
                            <div className={`rounded-xl flex items-center justify-center transition-all duration-700 ${isSidebarOpen ? 'w-10 h-10 bg-black/5 group-hover/logout:bg-red-100' : 'w-10 h-10 bg-black/5 group-hover/logout:bg-red-100'
                                }`}>
                                <LogOut size={18} strokeWidth={2} className="text-black/40 group-hover/logout:text-red-600 group-hover/logout:-translate-x-1 transition-all duration-700" />
                            </div>

                            {/* Text Area */}
                            {isSidebarOpen && (
                                <div className="flex flex-col items-start text-left ml-4">
                                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/20 group-hover/logout:text-red-600/40 transition-colors duration-700">
                                        Seguridad
                                    </span>
                                    <span className="text-sm font-bold text-black/60 group-hover/logout:text-red-700 transition-colors duration-700">
                                        Cerrar Sesión
                                    </span>
                                </div>
                            )}
                        </button>
                    </div>
                </aside>
            )}

            {/* Main Content con el sistema de scroll del admin */}
            <main className={`flex-1 transition-all duration-500 h-screen overflow-y-auto ${!isLoginPage ? (isSidebarOpen ? 'ml-72 p-8 lg:p-12' : 'ml-20 p-8 lg:p-12') : 'w-full'}`}>
                <div className={`${!isLoginPage ? 'max-w-7xl mx-auto space-y-12' : 'h-full flex items-center justify-center'}`}>
                    {/* Header - Solo si no es login */}
                    {!isLoginPage && (
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h1 className="text-sm font-medium text-black/40 uppercase tracking-[0.3em]">
                                    Panel de Administración
                                </h1>
                                <p className="text-3xl font-light text-black">
                                    {navLinks.find(l => l.href === pathname)?.label || 'Gestión'}
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-medium text-black">Jorge Iglesias Márquez</span>
                                    <span className="text-[10px] text-black/30 tracking-widest uppercase">Especialista</span>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-black/5 border border-black/10 p-1">
                                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-black/10 to-black/5 flex items-center justify-center overflow-hidden">
                                        <Users size={24} className="text-black/40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Slot */}
                    <div className={`${!isLoginPage ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : 'w-full'}`}>
                        {children}
                    </div>
                </div>
            </main>

            <Toaster />

            {/* Background Grain/Noise */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.15]">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
            </div>
            <div className="fixed inset-0 pointer-events-none z-[-2] bg-[#f2f0f4]"></div>

            {/* Custom Cursor */}
            <CustomCursor cursorState={cursorState} />
        </div>
    );
}
