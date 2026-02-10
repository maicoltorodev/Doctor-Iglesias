"use client";

import React, { useState, useEffect } from 'react';

export const MarbleBackground = () => {
    const [isLeftHovered, setIsLeftHovered] = useState(false);
    const [isRightHovered, setIsRightHovered] = useState(false);
    const [showMarbles, setShowMarbles] = useState(false);

    useEffect(() => {
        // Disparamos la animación de entrada coordinada con el resto de la página
        const timer = setTimeout(() => {
            setShowMarbles(true);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    // Lógica de transformación combinada (Entrada + Hover)
    const leftTransform = !showMarbles || isLeftHovered ? '-translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100';
    const rightTransform = !showMarbles || isRightHovered ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100';

    return (
        <div className="fixed inset-0 z-[70] pointer-events-none">
            {/* SENSORS */}
            <div
                onMouseEnter={() => setIsLeftHovered(true)}
                onMouseLeave={() => setIsLeftHovered(false)}
                className="absolute top-0 left-0 w-[500px] h-[180px] pointer-events-auto cursor-none z-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
            <div
                onMouseEnter={() => setIsRightHovered(true)}
                onMouseLeave={() => setIsRightHovered(false)}
                className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-auto cursor-none clip-triangle-right z-10"
            />

            {/* Esquina Superior Izquierda */}
            <div className="absolute top-0 left-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${leftTransform}`}>
                    <div
                        className="absolute inset-0 bg-marble-texture border-b border-r border-white/20"
                        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                    >
                        <div className="absolute bottom-0 left-0 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transform -rotate-[19.8deg] origin-bottom-left"></div>
                    </div>
                </div>
            </div>

            {/* Esquina Inferior Derecha */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${rightTransform}`}>
                    <div className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
