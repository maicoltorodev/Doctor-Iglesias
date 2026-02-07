import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ObraProps {
    // Media
    src?: string;
    alt?: string;
    priority?: boolean;

    // Footer Info
    category?: string;
    title?: string;

    // Overlay Info
    overlayTitle?: string;
    overlayDescription?: string;
    overlayTag?: string;

    // Link
    href?: string;

    // Styling overrides
    className?: string;
    style?: React.CSSProperties;

    // Custom Content (For Testimonials or non-image cards)
    children?: React.ReactNode;

    // Display options
    hideInfo?: boolean;
    transparent?: boolean;
}

export const Obra: React.FC<ObraProps> = ({
    src,
    alt = "",
    priority = false,
    category,
    title,
    overlayTitle,
    overlayDescription,
    overlayTag = "Ver Detalles",
    href,
    className = "",
    style,
    children,
    transparent = false,
    hideInfo = false
}) => {

    // FIXED DIMENSIONS: w-[400px] h-[600px]
    const fixedSizeClasses = "w-[400px] h-[600px]";

    const innerContent = (
        <div className="relative group">
            {/* Contenedor de Sombra y Movimiento (Sin overflow-hidden para que la sombra se vea) */}
            <div
                className={`relative ${fixedSizeClasses} ${transparent ? '' : 'bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.35)] group-hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.45)]'} transition-transform duration-700 ease-in-out group-hover:-translate-y-6 rounded-[40px] lg:rounded-[80px] z-10 transform-gpu`}
                style={{ isolation: 'isolate' }}
            >
                {/* Contenedor de Recorte (Con overflow-hidden para la imagen) */}
                <div className="w-full h-full overflow-hidden rounded-[40px] lg:rounded-[80px] relative backface-hidden" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                    {src ? (
                        <>
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-cover transition-all duration-[2s] group-hover:scale-110"
                                    priority={priority}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                                <div className="absolute -inset-[2px] bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            {(overlayTitle || overlayDescription) && (
                                <div className="absolute inset-0 p-8 lg:p-16 z-10 flex flex-col justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/40 backdrop-blur-[2px]">
                                    <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                        {overlayTitle && (
                                            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/80">{overlayTitle}</p>
                                        )}
                                        {overlayDescription && (
                                            <p className="text-xs lg:text-sm text-white font-light leading-relaxed">{overlayDescription}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={`absolute inset-0 ${transparent ? '' : 'bg-white/50 backdrop-blur-md border border-black/5'} p-8 lg:p-12`}>
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const footer = (
        <div className="absolute top-[calc(100%+1.5rem)] left-0 right-0 space-y-2 lg:space-y-3 text-center transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-[9px] lg:text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">
                {category || "Galería"}
            </p>
            <p className="text-lg lg:text-2xl font-light text-black/80 leading-tight">
                {title || "Dr. Jorge Iglesias Márquez"}
            </p>
        </div>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={`flex-shrink-0 group relative block w-[400px] ${className}`}
                style={style}
            >
                {innerContent}
                {!hideInfo && footer}
            </Link>
        );
    }

    return (
        <div
            className={`flex-shrink-0 group relative block w-[400px] ${className}`}
            style={style}
        >
            {innerContent}
            {!hideInfo && footer}
        </div>
    );
};
