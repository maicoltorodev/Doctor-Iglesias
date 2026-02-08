"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast, ToastType } from '@/hooks/useToast';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const iconMap: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
};

const bgMap: Record<ToastType, string> = {
    success: 'bg-emerald-500/10 border-emerald-500/20',
    error: 'bg-rose-500/10 border-rose-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
};

export const Toaster = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[300px] max-w-md ${bgMap[toast.type]}`}
                    >
                        <div className="flex-shrink-0">
                            {iconMap[toast.type]}
                        </div>

                        <p className="flex-grow text-sm font-light text-white/90">
                            {toast.message}
                        </p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/40" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
