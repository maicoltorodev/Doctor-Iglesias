import React from 'react';

interface MobileTestimonialsProps {
    content: any;
    items: any[];
}

const MobileTestimonials = ({ content, items }: MobileTestimonialsProps) => {
    return (
        <section id="testimonios" className="w-screen h-full flex-shrink-0 relative overflow-hidden bg-white/30 snap-center flex flex-col items-center justify-center p-8">
            <div className="space-y-4 text-center">
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/30">{content?.editorial?.subtitle || "Testimonios"}</span>
                <h2 className="text-4xl font-light text-black">
                    {content?.editorial?.titleLight} <span className="font-serif italic text-black/40">{content?.editorial?.titleBold}</span>
                </h2>
            </div>

            <div className="flex flex-col gap-4 w-full mt-12 overflow-y-auto max-h-[50vh] scrollbar-hide">
                {items.map((item, i) => (
                    <div key={i} className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-2xl space-y-3">
                        <p className="text-sm italic text-black/70 italic">&quot;{item.text}&quot;</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black/5 overflow-hidden">
                                {item.avatar && <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">{item.author}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MobileTestimonials;
