import React from 'react';
import Image from 'next/image';
import { EditorialCard } from '@/components/ui/EditorialCard';

export const ContactMapFrame = ({ info }: { info: any }) => (
    <div className="absolute inset-0 bg-gray-200 z-0">
        <iframe
            src={info.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="google-maps transition-all duration-700"
        ></iframe>
    </div>
);

export const ContactClinicImage = ({ info }: { info: any }) => (
    <>
        <Image
            src="/clinica.webp"
            alt="Nuestra Clínica"
            fill
            className="object-cover transition-transform duration-[1.5s] saturate-[0.8] brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
    </>
);

export const ContactSocialsGrid = ({ info }: { info: any }) => {
    const socials = [
        {
            name: "Instagram",
            url: info.socials.find((s: any) => s.name === "Instagram")?.url || "#",
            color: "hover:bg-[#E1306C]",
            textColor: "hover:text-white",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            )
        },
        {
            name: "Facebook",
            url: info.socials.find((s: any) => s.name === "Facebook")?.url || "#",
            color: "hover:bg-[#1877F2]",
            textColor: "hover:text-white",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            )
        },
        {
            name: "TikTok",
            url: info.socials.find((s: any) => s.name === "TikTok")?.url || "#",
            color: "hover:bg-black",
            textColor: "hover:text-white",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            )
        },
        {
            name: "WhatsApp",
            url: info.whatsappUrl,
            color: "hover:bg-[#25D366]",
            textColor: "hover:text-white",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3.5Z"></path></svg>
            )
        }
    ];

    return (
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
            {socials.map((social, i) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex flex-col items-center justify-center transition-all duration-[400ms] border-black/5 ${social.color} ${social.textColor} ${i === 0 ? 'border-r border-b' : i === 1 ? 'border-b' : i === 2 ? 'border-r' : ''}`}
                >
                    <div className="transform transition-transform duration-500 hover:scale-125">
                        {social.icon}
                    </div>
                </a>
            ))}
        </div>
    );
};

export const ContactEditorialContent = ({ content }: { content: any }) => (
    <>
        <EditorialCard
            subtitle={content.editorial.subtitle}
            titleLight={content.editorial.titleLight}
            titleBold={content.editorial.titleBold}
            description={content.editorial.description}
            footerTag={content.editorial.footerTag}
        />
        <div className="flex items-center mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="animate-guide-left transform">
                <svg width="100" height="80" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/50 overflow-visible">
                    <path d="M48 20L2 20M2 20L20 4M2 20L20 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    </>
);
