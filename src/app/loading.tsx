import Image from 'next/image';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f2f0f4] overflow-hidden">
            <div className="relative flex flex-col items-center justify-center">
                {/* Logo Central (Ligeramente más pequeño para agilidad) */}
                <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 animate-pulse" style={{ animationDuration: '0.6s' }}>
                    <Image
                        src="/logo.webp"
                        alt="Cargando Dr. Jorge Iglesias"
                        fill
                        className="object-contain p-4"
                        priority
                    />
                </div>

                {/* Anillo de Carga Rápida (Estilo Cometa) */}
                <div className="absolute inset-0 -m-1">
                    <svg className="w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '0.6s' }}>
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="90 150"
                            className="origin-center opacity-60"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
