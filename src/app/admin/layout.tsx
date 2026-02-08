"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
    ChevronRight,
    Sparkles
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
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative group ${isActive
                ? 'text-white bg-white/10 shadow-lg shadow-white/5'
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
        >
            {isActive && (
                <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                />
            )}
            <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-white/80'} />
            <span className="text-sm font-medium tracking-wide">{label}</span>
            {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
        </motion.div>
    </Link>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const cursorState = useCustomCursor();

    const navLinks = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/content', icon: FileText, label: 'Contenido Editorial' },
        { href: '/admin/services', icon: Briefcase, label: 'Servicios' },
        { href: '/admin/gallery', icon: ImageIcon, label: 'Galería' },
        { href: '/admin/results', icon: CheckSquare, label: 'Resultados' },
        { href: '/admin/testimonials', icon: Users, label: 'Testimonios' },
        { href: '/admin/settings', icon: Settings, label: 'Configuración' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex selection:bg-white/20">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-72' : 'w-20'
                    } fixed h-screen bg-[#0a0a0b] border-r border-white/5 transition-all duration-500 z-50 flex flex-col`}
            >
                {/* Logo & Toggle */}
                <div className="p-8 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <Sparkles size={18} className="text-black" />
                            </div>
                            <span className="font-bold tracking-tighter text-xl">DR. IGLESIAS</span>
                        </motion.div>
                    ) : (
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto">
                            <Sparkles size={18} className="text-black" />
                        </div>
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
                <div className="p-6 border-t border-white/5">
                    <button
                        className="flex items-center gap-4 px-6 py-4 w-full rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300"
                        onClick={() => {/* Logout logic */ }}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${isSidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-500 p-8 lg:p-12 h-screen overflow-y-auto`}>
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em]">
                                Panel de Administración
                            </h1>
                            <p className="text-3xl font-light">
                                {navLinks.find(l => l.href === pathname)?.label || 'Gestión'}
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">Dr. Jorge Iglesias</span>
                                <span className="text-[10px] text-white/30 tracking-widest uppercase">Especialista</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 p-1">
                                <div className="w-full h-full rounded-full bg-gradient-to-tr from-white/10 to-white/5 flex items-center justify-center overflow-hidden">
                                    <Users size={24} className="text-white/40" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Slot */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </main>

            <Toaster />

            {/* Background Grain/Noise */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 contrast-150 brightness-50"></div>
            </div>
            <div className="fixed inset-0 pointer-events-none z-[-2] bg-gradient-to-tr from-black via-[#050505] to-[#0a0a0b]"></div>

            {/* Custom Cursor */}
            <CustomCursor cursorState={cursorState} />
        </div>
    );
}
