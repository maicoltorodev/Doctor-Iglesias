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
                className="w-full flex items-center justify-between text-left active:bg-black/5 rounded-lg transition-colors duration-200"
                aria-expanded={isOpen}
            >
                <span className={`text-base font-medium transition-colors duration-300 pr-4 ${isOpen ? 'text-black' : 'text-black/60'}`}>
                    {question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-black text-white' : 'bg-transparent text-black/30 border border-black/10'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pt-3 text-black/50 font-serif leading-relaxed text-sm">
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
        <div className="w-full space-y-1">
            {items.map((item, i) => (
                <AccordionItem key={i} question={item.question} answer={item.answer} />
            ))}
        </div>
    );
};
