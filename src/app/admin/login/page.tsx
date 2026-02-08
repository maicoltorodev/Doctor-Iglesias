"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simple login logic via API or Server Action
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (res.ok) {
            router.push('/admin');
            router.refresh();
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 selection:bg-white/20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-md space-y-12 relative z-10"
            >
                <div className="text-center space-y-4">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-black mb-8 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                    >
                        <Lock size={32} />
                    </motion.div>
                    <h1 className="text-4xl font-light tracking-tighter">
                        Acceso Restringido
                    </h1>
                    <p className="text-white/30 text-sm font-medium tracking-[0.2em] uppercase">
                        Gestión de Clínica Dr. Iglesias
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="password"
                            placeholder="Contraseña Maestra"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-white/5 border ${status === 'error' ? 'border-red-500/50' : 'border-white/10'} rounded-3xl px-8 py-6 text-center text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 tracking-[0.5em]`}
                            autoFocus
                        />
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-8 left-0 right-0 text-center"
                            >
                                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                    <AlertCircle size={12} /> Contraseña Incorrecta
                                </span>
                            </motion.div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-6 bg-white text-black rounded-3xl font-bold text-[10px] tracking-[0.4em] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
                    >
                        {status === 'loading' ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                Entrar al Panel <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-12">
                    <p className="text-[10px] text-white/10 font-bold tracking-[0.5em] uppercase">
                        Dr. Jorge Iglesias © 2026
                    </p>
                </div>
            </motion.div>

            {/* Grain/Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 bg-[url('/noise.png')] contrast-200"></div>
        </div>
    );
}
