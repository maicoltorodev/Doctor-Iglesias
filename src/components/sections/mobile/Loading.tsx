"use client";

import Image from 'next/image';

export default function MobileLoading() {
    return (
        <div className="flex items-center justify-center min-h-[100dvh] bg-[#f2f0f4] overflow-hidden">
            <div className="relative flex flex-col items-center justify-center">
                {/* Logo Central optimizado para carga rápida */}
                <div className="relative z-10 w-24 h-24 animate-pulse">
                    <Image
                        src="/logo.webp"
                        alt="Cargando..."
                        fill
                        className="object-contain p-4"
                        priority
                    />
                </div>

                {/* Spinner minimalista */}
                <div className="absolute inset-0 -m-2">
                    <svg className="w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '0.8s' }}>
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke="black"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeDasharray="60 180"
                            className="origin-center opacity-40"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
