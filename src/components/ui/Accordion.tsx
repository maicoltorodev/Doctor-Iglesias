"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
    question: string;
    answer: string;
    className?: string;
}

export const AccordionItem = ({ question, answer, className = "" }: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`py-5 border-b border-black/5 last:border-0 ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left group"
                aria-expanded={isOpen}
            >
                <span className={`text-base lg:text-xl font-light transition-colors duration-300 ${isOpen ? 'text-black' : 'text-black/60 group-hover:text-black'}`}>
                    {question}
                </span>
                <div className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-black/10 transition-all duration-300 ${isOpen ? 'bg-black text-white border-black' : 'bg-transparent text-black group-hover:border-black/30'}`}>
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="minus"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Minus size={14} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plus"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Plus size={14} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 pt-4 text-black/50 font-serif leading-relaxed max-w-2xl text-base lg:text-lg">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Accordion = ({ items }: { items: { question: string, answer: string }[] }) => {
    return (
        <div className="w-full">
            {items.map((item, i) => (
                <AccordionItem key={i} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};
