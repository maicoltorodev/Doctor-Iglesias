import React from 'react';

interface MobileGalleryProps {
    content: any;
    items: any[];
}

const MobileGallery = ({ content, items }: MobileGalleryProps) => {
    return (
        <section id="galeria" className="w-screen h-full flex-shrink-0 relative overflow-hidden bg-white/50 snap-center flex flex-col items-center justify-center p-8">
            <div className="space-y-4 text-center">
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/30">{content?.editorial?.subtitle || "Galería"}</span>
                <h2 className="text-4xl font-light text-black">
                    {content?.editorial?.titleLight} <span className="font-serif italic text-black/40">{content?.editorial?.titleBold}</span>
                </h2>
                <p className="text-sm text-black/60 max-w-xs">{content?.editorial?.description}</p>
            </div>

            {/* Simple Horizontal Scroll for Mobile Gallery */}
            <div className="flex gap-4 overflow-x-auto w-full mt-12 pb-4 px-4 scrollbar-hide">
                {items.map((item, i) => (
                    <div key={i} className="flex-shrink-0 w-64 aspect-square relative rounded-2xl overflow-hidden shadow-lg">
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MobileGallery;
