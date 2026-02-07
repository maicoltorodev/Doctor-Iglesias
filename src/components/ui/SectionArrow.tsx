"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionArrowProps {
    direction?: 'left' | 'right';
    className?: string;
    color?: string;
}

export const SectionArrow: React.FC<SectionArrowProps> = ({
    direction = 'right',
    className = "",
    color = "text-black/20"
}) => {
    const isRight = direction === 'right';

    return (
        <div className={`flex items-center ${className}`}>
            <motion.div
                animate={{ x: isRight ? [0, 15, 0] : [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={color}
            >
                <svg
                    width="160"
                    height="120"
                    viewBox="0 0 50 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`overflow-visible ${!isRight ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M2 20L48 20M48 20L30 4M48 20L30 36"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </div>
    );
};
