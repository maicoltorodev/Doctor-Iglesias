"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceStoryContentProps {
  content: any;
}
export const ServiceStoryContent: React.FC<ServiceStoryContentProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex flex-col items-center justify-center font-sans"
    >
      <div className="relative w-full h-full flex flex-col bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-3 shadow-2xl overflow-hidden group">

        {/* MEDIA CONTAINER */}
        <div className="relative w-full flex-1 rounded-[32px] overflow-hidden">
          <Image
            src={content?.image || '/placeholder-service.jpg'}
            alt={content?.title || 'Servicio'}
            fill
            className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            sizes="(max-width: 768px) 90vw, 500px"
            priority={true}
          />

          {/* GRADIENT OVERLAY (Fijado abajo para que los textos siempre se vean) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              {/* TÍTULO */}
              <h3 className="text-2xl font-serif italic text-white leading-tight">
                {content?.title}
              </h3>

              {/* ACTION TAG (FUNCIONAL) */}
              <div className="pt-4">
                <Link
                  href={`/servicio/${content.slug}`}
                  className="inline-block px-7 py-3 bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md border border-white/20 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold pointer-events-auto shadow-lg"
                >
                  {content?.overlayTag || "Ver Detalles"}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="h-10 flex items-center justify-center">
          <span className="text-[8px] uppercase tracking-[0.5em] font-black text-black/10 italic">
            {content?.category || "Dr. Jorge Iglesias"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceStoryContent;
