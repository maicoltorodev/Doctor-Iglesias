"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface EditorialCardProps {
    subtitle: string;
    titleLight: string;
    titleBold: string;
    description: string;
    footerTag: string;
    extraClasses?: string;
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
    subtitle,
    titleLight,
    titleBold,
    description,
    footerTag,
    extraClasses = "",
}) => {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`space-y-6 ${extraClasses}`}
        >
            {/* Subtitle */}
            <motion.div variants={fadeUp} className="flex items-center space-x-6">
                <span className="h-[1px] w-12 bg-black/20"></span>
                <p className="text-[10px] tracking-[0.6em] uppercase font-bold text-black/40 italic font-serif">
                    {subtitle}
                </p>
            </motion.div>

            {/* Título Principal - Optimizado para Móvil */}
            <motion.h2
                variants={fadeUp}
                className="text-4xl font-extralight tracking-tighter leading-[0.8] text-black"
            >
                {titleLight} <br />
                <span className="font-serif italic text-black/40 tracking-widest uppercase text-2xl">
                    {titleBold}
                </span>
            </motion.h2>

            <div className="space-y-8 max-w-lg mt-8">
                {/* Descripción / Cita */}
                <motion.p
                    variants={fadeUp}
                    transition={{ delay: 0.15 }}
                    className="text-xl font-serif italic text-black/70 leading-[1.1]"
                >
                    &quot;{description}&quot;
                </motion.p>

                {/* Divider */}
                <div className="h-[1px] w-full bg-gradient-to-r from-black/10 via-black/5 to-transparent"></div>

                {/* Footer Tag */}
                <motion.div
                    variants={fadeUp}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-black/20">
                        {footerTag}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};
