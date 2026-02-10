"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, Share2 } from 'lucide-react';

interface ContentStoryContentProps {
  content: any;
}
export const ContentStoryContent: React.FC<ContentStoryContentProps> = ({ content }) => {
  const data = content?.data || content;

  const renderContent = () => {
    switch (content?.type || data?.type) {
      case 'map':
        return (
          <div className="w-full h-full flex flex-col space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">Ubicación</p>
              <h3 className="text-2xl font-serif italic text-black leading-tight">{data.title || "Nuestra Clínica"}</h3>
            </div>
            <div className="flex-1 w-full bg-black/5 rounded-[32px] overflow-hidden border border-white/40 shadow-inner relative min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.4739412158856!2d-74.06432902502075!3d4.687393095287561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f84fa7a54449f%3A0xcc058c51fe2786f8!2sJorge%20Iglesias%20M%C3%A1rquez%20Dermatolog%C3%ADa%20y%20Medicina%20Est%C3%A9tica!5e0!3m2!1ses-419!2sco!4v1770142016380!5m2!1ses-419!2sco"
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        );

      case 'clinic':
        return (
          <div className="w-full h-full flex flex-col bg-black/5 rounded-[32px] overflow-hidden border border-white/40 shadow-inner group">
            {/* Imagen de la Clínica */}
            <div className="relative w-full flex-1 overflow-hidden">
              <img
                src={data.clinicImage || '/clinica.webp'}
                alt="Clínica Jorge Iglesias"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Sede Principal</p>
                <h3 className="text-xl font-serif italic text-white leading-tight">{data.title || "Calle 99 # 49-56, Bogotá"}</h3>
              </div>
            </div>

            {/* Detalle inferior */}
            <div className="p-6 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin size={14} className="text-black/20" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">Bogotá D.C.</span>
              </div>
              <div className="w-8 h-[1px] bg-black/10" />
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">{data.category || "Atención Directa"}</p>
                <h3 className="text-3xl font-serif italic text-black leading-tight">{data.title || "Contacto"}</h3>
              </div>

              <div className="space-y-6">
                {data.address && (
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-black/40" />
                    </div>
                    <p className="text-sm text-black/60 font-light leading-relaxed tracking-wide pt-1">{data.address}</p>
                  </div>
                )}
                {data.phone && (
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-black/40" />
                    </div>
                    <p className="text-sm text-black/60 font-light leading-relaxed tracking-wide pt-1">{data.phone}</p>
                  </div>
                )}
                {data.email && (
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-black/40" />
                    </div>
                    <p className="text-sm text-black/60 font-light leading-relaxed tracking-wide pt-1">{data.email}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-black/5">
              <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-black/20 italic">Disponible 24/7 vía WhatsApp</p>
            </div>
          </div>
        );

      case 'social':
        const socialList = data.socials || [];
        return (
          <div className="w-full h-full flex flex-col justify-center space-y-12 py-8">
            <div className="text-center space-y-4">
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-black/30">Atención Personalizada</p>
              <h3 className="text-3xl font-serif italic text-black">Canales Digitales</h3>
              <div className="w-12 h-[1px] bg-black/10 mx-auto" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {socialList.map((social: any) => {
                const isInstagram = social.name?.toLowerCase().includes('instagram');
                const isFacebook = social.name?.toLowerCase().includes('facebook');
                const isTikTok = social.name?.toLowerCase().includes('tiktok');

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-6 bg-black/5 rounded-[32px] space-y-3 transition-colors active:bg-black/10 border border-white/40"
                  >
                    {isInstagram && <Instagram size={24} strokeWidth={1} className="text-black/60" />}
                    {isFacebook && <Facebook size={24} strokeWidth={1} className="text-black/60" />}
                    {isTikTok && <Share2 size={24} strokeWidth={1} className="text-black/60" />}
                    {!isInstagram && !isFacebook && !isTikTok && <Share2 size={24} strokeWidth={1} className="text-black/60" />}
                    <span className="text-[8px] font-bold uppercase tracking-widest text-black/40 italic">{social.name}</span>
                  </a>
                );
              })}

              {/* WhatsApp siempre como canal principal si existe en CONTACT_INFO */}
              <a
                href="https://wa.me/573125452046"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center p-6 bg-black/5 rounded-[32px] space-x-4 transition-colors active:bg-black/10 border border-white/40 px-12"
              >
                <MessageCircle size={24} strokeWidth={1} className="text-black/60" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/60 italic">WhatsApp Agenda</span>
              </a>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              {data.category && (
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">{data.category}</p>
              )}
              <h3 className="text-3xl font-serif italic text-black leading-tight max-w-[280px]">
                {data.title || data.heading}
              </h3>
              <div className="w-12 h-[1px] bg-black/10" />
            </div>

            <div className="text-sm text-black/60 font-light leading-relaxed tracking-wide max-w-[320px] transition-all duration-700">
              {data.description ? (
                <p>{data.description}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: content?.content || content }} />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center"
    >
      <div className="w-full h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 lg:p-10 shadow-2xl overflow-hidden">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default ContentStoryContent;
