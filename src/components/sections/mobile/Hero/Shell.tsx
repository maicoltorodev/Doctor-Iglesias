import React from 'react';

interface HeroShellProps {
    background: React.ReactNode;
    logo: React.ReactNode;
    text: React.ReactNode;
    cta: React.ReactNode;
}

const HeroShell: React.FC<HeroShellProps> = ({ background, logo, text, cta }) => {
    return (
        <section id="hero" className="w-screen h-full flex-shrink-0 relative overflow-hidden bg-[#e6e3e8] section-contain snap-center">
            {background}

            {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (TRIÁNGULOS) */}
            <div className="absolute inset-0 z-50 pointer-events-none">
                {/* Esquina Inferior Izquierda */}
                <div className="absolute bottom-0 left-0 w-[160px] h-[65px] pointer-events-none">
                    <div className="absolute inset-0 shadow-architectural-poly opacity-100 translate-x-0 z-10">
                        <div className="absolute inset-0 clip-triangle-left bg-marble-texture"></div>
                    </div>
                </div>

                {/* Esquina Inferior Derecha */}
                <div className="absolute bottom-0 right-0 w-[160px] h-[65px] pointer-events-none">
                    <div className="absolute inset-0 shadow-architectural-poly [transition-delay:100ms] opacity-100 translate-x-0 z-10">
                        <div className="absolute inset-0 clip-triangle-right bg-marble-texture"></div>
                    </div>
                </div>
            </div>

            {/* CONTENIDO UNIFICADO Y SIMPLIFICADO */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 pointer-events-none text-black">
                <div className="flex flex-col items-center justify-center pointer-events-auto w-full space-y-8 translate-y-[4vh]">

                    {/* LOGO WRAPPER */}
                    <div className="relative w-full max-w-[280px] h-24 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-2xl"></div>
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {logo}
                        </div>
                    </div>

                    {/* TEXTO Y CTA */}
                    <div className="flex flex-col items-center space-y-16">
                        {text}
                        {cta}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroShell;
