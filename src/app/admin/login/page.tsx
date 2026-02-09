"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, ArrowRight, Loader2, AlertCircle, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BackLink } from '@/components/ui/BackLink';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setStatus('loading');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    router.push('/admin');
                    router.refresh();
                }, 800);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 2000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1] as any
            }
        },
        tap: { scale: 0.96 }
    };

    const shimmerVariants = {
        initial: { x: "-100%", skewX: -45 },
        hover: {
            x: "150%",
            transition: {
                duration: 1.2,
                ease: "easeInOut" as any,
                repeat: Infinity,
                repeatDelay: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f0f4] text-black flex items-center justify-center p-6 selection:bg-black/10 relative overflow-hidden font-sans">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[480px] relative z-10"
            >


                {/* Main Card */}
                <div className="bg-white border-2 border-black/10 rounded-[3.5rem] p-12 lg:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden group">
                    <div className="text-center space-y-8 relative z-10">
                        {/* Navegación y Logo de Identidad */}
                        <div className="flex justify-center pb-4">
                            <BackLink href="/" />
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl font-light tracking-tight text-black leading-tight">
                                Acceso al <br />
                                <span className="italic font-serif bg-gradient-to-r from-black via-black/60 to-black/40 bg-clip-text text-transparent pr-2">Panel Administrativo</span>
                            </h1>
                            <div className="flex items-center justify-center gap-2 pt-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-black/20"></span>
                                <p className="text-[10px] font-bold text-black/40 tracking-[0.3em] uppercase">
                                    Jorge Iglesias Márquez
                                </p>
                                <span className="w-1.5 h-1.5 rounded-full bg-black/20"></span>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8 pt-6">
                            <div className="space-y-4">
                                <div className="relative group/input">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="CONTRASEÑA"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={status === 'loading' || status === 'success'}
                                        className={`w-full bg-black/[0.02] border-2 ${status === 'error' ? 'border-red-500/50' :
                                            status === 'success' ? 'border-emerald-500/50' :
                                                'border-black/5 group-hover/input:border-black/20'
                                            } rounded-3xl px-8 py-6 text-center text-sm font-medium focus:outline-none focus:border-black transition-all placeholder:text-black/20 tracking-[0.5em] focus:bg-white focus:shadow-xl shadow-inner`}
                                        autoFocus
                                    />
                                    {password && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    )}
                                </div>

                                <AnimatePresence mode="wait">
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex items-center justify-center gap-2 text-red-500"
                                        >
                                            <AlertCircle size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                                Credenciales no válidas
                                            </span>
                                        </motion.div>
                                    )}
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex items-center justify-center gap-2 text-emerald-600"
                                        >
                                            <ShieldCheck size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                                Acceso concedido
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success' || !password}
                                className="w-full py-6 rounded-full bg-black text-white font-extrabold text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed relative flex items-center justify-center shadow-lg group"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-4">
                                    <AnimatePresence mode="wait">
                                        {status === 'loading' ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center"
                                            >
                                                PROCESANDO
                                                <span className="inline-flex w-4">
                                                    <motion.span
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
                                                    >.</motion.span>
                                                    <motion.span
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                                                    >.</motion.span>
                                                    <motion.span
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
                                                    >.</motion.span>
                                                </span>
                                            </motion.div>
                                        ) : status === 'success' ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center"
                                            >
                                                ENTRANDO
                                                <span className="inline-flex w-4">
                                                    <motion.span
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
                                                    >.</motion.span>
                                                    <motion.span
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.2 }}
                                                    >.</motion.span>
                                                    <motion.span
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], delay: 0.4 }}
                                                    >.</motion.span>
                                                </span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center gap-4 group-hover:tracking-[0.5em] transition-all duration-500"
                                            >
                                                AUTENTICAR <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
