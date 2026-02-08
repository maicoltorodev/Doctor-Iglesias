"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const MobileServiceHeader = () => {
    const router = useRouter();

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-center justify-between">
            <button
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center text-black active:scale-95 transition-transform"
                aria-label="Regresar"
            >
                <ChevronLeft size={20} />
            </button>
            <div className="h-6 w-auto opacity-40">
                <Image src="/logo.webp" alt="Logo" width={80} height={20} className="object-contain" priority />
            </div>
            <div className="w-10" /> {/* Spacer */}
        </div>
    );
};
