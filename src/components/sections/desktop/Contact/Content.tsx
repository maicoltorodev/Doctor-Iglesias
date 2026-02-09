'use client';

import { useState } from 'react';
import { Obra } from '@/components/ui/Obra';
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

export const ContactMapCard = ({ editorial, info }: { editorial: any; info: any }) => (
    <Obra
        category={editorial?.cards?.map?.category}
        title={editorial?.cards?.map?.title}
    >
        <ContactMapFrame info={info} />
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-8 text-center transition-opacity duration-700 opacity-0 hover:opacity-100 pointer-events-none`}>
            <p className="text-white text-sm font-light">{editorial?.cards?.map?.overlay}</p>
        </div>
    </Obra>
);

export const ContactClinicCard = ({ editorial, info }: { editorial: any; info: any }) => (
    <Obra
        src="/clinica.webp"
        alt="Nuestra Clínica"
        category={editorial?.cards?.clinic?.category}
        title={editorial?.cards?.clinic?.title}
        overlayTitle={editorial?.cards?.clinic?.overlayTitle}
        overlayDescription={`${info?.address}\n${info?.city}`}
    />
);

export const ContactSocialsCard = ({ editorial, info }: { editorial: any; info: any }) => {
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    const socials = [
        {
            name: "Instagram",
            url: info.socials.find((s: any) => s.name === "Instagram")?.url || "#",
            hexColor: "#E1306C",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            )
        },
        {
            name: "Facebook",
            url: info.socials.find((s: any) => s.name === "Facebook")?.url || "#",
            hexColor: "#1877F2",
            icon: (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>)
        },
        {
            name: "TikTok",
            url: info.socials.find((s: any) => s.name === "TikTok")?.url || "#",
            hexColor: "#000000",
            icon: (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>)
        },
        {
            name: "WhatsApp",
            url: info.whatsappUrl,
            hexColor: "#25D366",
            icon: (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3.5Z"></path></svg>)
        }
    ];

    return (
        <Obra
            category={editorial?.cards?.socials?.category}
            title={editorial?.cards?.socials?.title}
            transparent
        >
            <div
                className="absolute inset-0 bg-white transition-colors duration-500 ease-out z-0"
                style={{ backgroundColor: hoveredColor || '' }}
            />

            <div className="grid grid-cols-2 grid-rows-2 h-full w-full absolute inset-0 z-10">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredColor(social.hexColor)}
                        onMouseLeave={() => setHoveredColor(null)}
                        className={`
                            group relative flex flex-col items-center justify-center transition-all duration-[400ms]
                            ${hoveredColor ? 'text-white' : 'text-zinc-800'}
                        `}
                    >
                        <div
                            className={`transform transition-all duration-500 group-hover:scale-110 ${hoveredColor && hoveredColor !== social.hexColor ? 'opacity-40 scale-90' : 'opacity-100'}`}
                        >
                            {social.icon}
                        </div>
                    </a>
                ))}
            </div>
        </Obra>
    );
};

export const ContactEditorialBlock = ({ content }: { content: any }) => (
    <EditorialCard
        subtitle={content?.subtitle}
        titleLight={content?.titleLight}
        titleBold={content?.titleBold}
        description={content?.description}
        footerTag={content?.footerTag}
    />
);
