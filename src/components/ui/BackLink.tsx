"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface BackLinkProps {
    href?: string;
    className?: string;
}

export const BackLink: React.FC<BackLinkProps> = ({
    href = "/",
    className = ""
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`pointer-events-none ${className}`}>
            <Link
                href={href}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group flex flex-col items-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-95 pointer-events-auto relative"
            >
                <div className="flex items-center gap-1">
                    <motion.div
                        animate={isHovered ? { x: 0, scale: 1.3 } : { x: [0, -8, 0], scale: 1 }}
                        transition={isHovered
                            ? { type: "spring", stiffness: 300, damping: 20 }
                            : { x: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5 } }
                        }
                        className="text-black/15 group-hover:text-black transition-colors duration-700"
                    >
                        <ChevronLeft size={48} strokeWidth={1.2} />
                    </motion.div>

                    <div className="relative">
                        <Image
                            src="/logo.webp"
                            alt="Dr. Jorge Iglesias Márquez"
                            width={240}
                            height={60}
                            className="h-12 lg:h-14 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
                            priority
                        />
                        {/* Texto de Regreso sutil centrado bajo el logo */}
                        <motion.span
                            initial={{ opacity: 0, x: "-50%", y: -5 }}
                            animate={isHovered ? { opacity: 0.4, x: "-50%", y: 0 } : { opacity: 0, x: "-50%", y: -5 }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            className="text-[9px] tracking-[0.8em] uppercase font-bold text-black absolute -bottom-6 left-1/2 whitespace-nowrap"
                        >
                            Regresar
                        </motion.span>
                    </div>
                </div>
            </Link>
        </div>
    );
};
