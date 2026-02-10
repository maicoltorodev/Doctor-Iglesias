"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DesktopLoadingMotion() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-[#f2f0f4] overflow-hidden">

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

      <div className="relative flex items-center justify-center">

        {/* Anillo Exterior (Rápido) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <svg width="240" height="240" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="48"
              fill="none" stroke="black" strokeWidth="1"
              strokeDasharray="120 200"
              className="opacity-40"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Anillo Medio (Inverso) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <svg width="190" height="190" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="48"
              fill="none" stroke="black" strokeWidth="1.2"
              strokeDasharray="80 250"
              className="opacity-20"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Anillo Interior (Suave) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <svg width="150" height="150" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="48"
              fill="none" stroke="black" strokeWidth="0.8"
              strokeDasharray="180 100"
              className="opacity-10"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-center"
        >
          <Image
            src="/logo.webp"
            alt="Logo"
            width={130}
            height={130}
            className="object-contain"
            priority
          />
        </motion.div>

      </div>
    </div>
  );
}