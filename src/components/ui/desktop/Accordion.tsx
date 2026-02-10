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
        <div className={`py-6 border-b border-black/5 last:border-0 ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-left group outline-none focus:outline-none"
                aria-expanded={isOpen}
            >
                <span className={`text-xl xl:text-2xl font-light transition-all duration-500 ${isOpen ? 'text-black translate-x-1' : 'text-black/60 group-hover:text-black'}`}>
                    {question}
                </span>
                <div className={`relative w-10 h-10 flex items-center justify-center rounded-full border border-black/10 transition-all duration-500 ${isOpen ? 'bg-black text-white border-black rotate-180' : 'bg-transparent text-black group-hover:border-black/30 group-hover:scale-110'}`}>
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="minus"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Minus size={16} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plus"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Plus size={16} />
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
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-10 pt-6 text-black/50 font-serif leading-relaxed max-w-4xl text-lg xl:text-xl pl-2 border-l border-black/5 ml-1 mt-2">
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
