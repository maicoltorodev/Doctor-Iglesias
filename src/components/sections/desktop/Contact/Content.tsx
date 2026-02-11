'use client';

import { useState } from 'react';
import { Obra } from '@/components/ui/desktop/Obra';
import { EditorialCard } from '@/components/ui/desktop/EditorialCard';

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

import Image from 'next/image';

export const ContactSocialsCard = ({ editorial, info }: { editorial: any; info: any }) => {
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    const socials = [
        {
            name: "Instagram",
            url: info.socials.find((s: any) => s.name === "Instagram")?.url || "#",
            hexColor: "#E1306C",
            iconPath: "/social-icons/instagram.webp",
            gridClass: "col-start-1 row-start-1"
        },
        {
            name: "Facebook",
            url: info.socials.find((s: any) => s.name === "Facebook")?.url || "#",
            hexColor: "#1877F2",
            iconPath: "/social-icons/facebook.webp",
            gridClass: "col-start-3 row-start-1"
        },
        {
            name: "Waze",
            url: "https://ul.waze.com/ul?place=ChIJJ2hWZsKaP44RU0Qn4tNzEPA&ll=4.68739310%2C-74.06175410&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
            hexColor: "#33CCFF",
            iconPath: "/social-icons/waze.webp",
            gridClass: "col-start-2 row-start-2"
        },
        {
            name: "TikTok",
            url: info.socials.find((s: any) => s.name === "TikTok")?.url || "#",
            hexColor: "#000000",
            iconPath: "/social-icons/tiktok.webp",
            gridClass: "col-start-1 row-start-3"
        },
        {
            name: "WhatsApp",
            url: info.whatsappUrl,
            hexColor: "#25D366",
            iconPath: "/social-icons/whatsapp.webp",
            gridClass: "col-start-3 row-start-3"
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

            <div className="grid grid-cols-3 grid-rows-3 h-full w-full absolute inset-0 z-10 p-12">
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
                            ${social.gridClass}
                        `}
                    >
                        <div
                            className={`
                                relative w-28 h-28 flex items-center justify-center transform transition-all duration-500 rounded-full
                                ${hoveredColor === social.hexColor ? 'border-[4px] border-white scale-110' : 'border-[4px] border-transparent'}
                                ${hoveredColor && hoveredColor !== social.hexColor ? 'opacity-40 scale-75' : 'opacity-100'}
                            `}
                        >
                            <div className="relative w-20 h-20">
                                <Image
                                    src={social.iconPath}
                                    alt={social.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </Obra>
    );
};


export const ContactEditorialBlock = ({ content }: { content: any }) => {
    const data = content?.editorial || content || {};
    return (
        <EditorialCard
            subtitle={data.subtitle}
            titleLight={data.titleLight}
            titleBold={data.titleBold}
            description={data.description}
            footerTag={data.footerTag}
        />
    );
};
