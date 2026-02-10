"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ResultStoryContentProps {
    content: {
        title: string;
        id: string;
        before: string;
        after: string;
        comparison?: {
            before: string;
            after: string;
            tag: string;
        };
    };
}

/**
 * RESULT STORY CONTENT - Comparativa Antes/Después Premium
 */
export const ResultStoryContent: React.FC<ResultStoryContentProps> = ({ content }) => {
    const comparison = content.comparison || { before: 'Antes', after: 'Después', tag: 'Resultados' };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full flex flex-col space-y-4"
        >
            <div className="flex-1 grid grid-rows-2 gap-3 w-full h-full">
                {/* BEFORE CARD */}
                <div className="relative w-full h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] overflow-hidden group shadow-xl">
                    <Image
                        src={content.before}
                        alt={`${content.title} - ${comparison.before}`}
                        fill
                        className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                        sizes="(max-width: 768px) 90vw, 400px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-12">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-1">{content.title}</p>
                        <h3 className="text-xl font-serif italic text-white">{comparison.before}</h3>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                        <span className="text-[8px] uppercase tracking-widest font-black text-white/60">Stage 01</span>
                    </div>
                </div>

                {/* AFTER CARD */}
                <div className="relative w-full h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] overflow-hidden group shadow-xl">
                    <Image
                        src={content.after}
                        alt={`${content.title} - ${comparison.after}`}
                        fill
                        className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                        sizes="(max-width: 768px) 90vw, 400px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-12">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-1">{comparison.tag} {content.id}</p>
                        <h3 className="text-xl font-serif italic text-white font-bold">{comparison.after}</h3>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-[8px] uppercase tracking-widest font-black text-white/90 underline decoration-white/40">Success</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultStoryContent;
