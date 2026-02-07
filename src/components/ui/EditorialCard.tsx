"use client";

import React from "react";
import { motion } from "framer-motion";

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`editorial-card transition-all duration-700 ease-in-out ${extraClasses}`}
        >
            <div className="editorial-card-inner">
                <div className="w-auto min-w-[450px] space-y-20">
                    <div className="space-y-8">
                        {/* Subtitle */}
                        <motion.div variants={fadeUp} className="flex items-center space-x-6">
                            <span className="h-[1px] w-12 bg-black/10"></span>
                            <p className="text-[10px] tracking-[0.6em] uppercase font-bold text-black/30 italic font-serif">
                                {subtitle}
                            </p>
                        </motion.div>

                        {/* Título Principal */}
                        <motion.h3
                            variants={fadeUp}
                            className="text-[90px] font-extralight tracking-tighter leading-none text-black whitespace-nowrap"
                        >
                            {titleLight} <br />
                            <span className="font-serif italic text-black/40 tracking-widest uppercase text-[54px]">
                                {titleBold}
                            </span>
                        </motion.h3>
                    </div>

                    <div className="space-y-12 max-w-lg">
                        {/* Descripción / Cita */}
                        <motion.p
                            variants={fadeUp}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-serif italic text-black/60 leading-tight"
                        >
                            &quot;{description}&quot;
                        </motion.p>

                        {/* Footer Tag */}
                        <motion.div
                            variants={fadeUp}
                            transition={{ delay: 0.3 }}
                            className="flex items-center space-x-6 pt-4"
                        >
                            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/20">
                                {footerTag}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
