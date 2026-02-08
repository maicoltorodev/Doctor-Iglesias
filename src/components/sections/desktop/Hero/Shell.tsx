import React from 'react';
import { HeroInteractiveContent } from './InteractiveContent';
import { HeroMarbles } from './Marbles';

interface HeroShellProps {
    background: React.ReactNode;
    logo: React.ReactNode;
    text: React.ReactNode;
    cta: React.ReactNode;
}

const HeroShell: React.FC<HeroShellProps> = ({ background, logo, text, cta }) => {
    return (
        <section id="hero" className="min-w-screen h-full flex-shrink-0 relative overflow-hidden bg-[#e6e3e8] section-contain">
            {background}

            <HeroMarbles />

            {/* CONTENIDO ORQUESTRADO (Client Island) */}
            <HeroInteractiveContent
                logo={logo}
                text={text}
                cta={cta}
            />
        </section >
    );
};

export default HeroShell;
